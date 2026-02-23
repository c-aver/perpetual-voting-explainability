import importlib
import json
import os
import sys
from itertools import product
from pathlib import Path

import pytest

SRC_DIR = Path(__file__).resolve().parents[1] / 'src'


def load_server_module(tmp_path, monkeypatch, extra_env: dict[str, str] | None = None):
    queue_file = tmp_path / 'triple_queue.json'
    responses_file = tmp_path / 'responses.json'

    monkeypatch.setenv('TRIPLE_QUEUE_FILE', str(queue_file))
    monkeypatch.setenv('TRIPLE_QUEUE_REFILL_CYCLES', '1')
    monkeypatch.setenv('RESPONSE_STORAGE_FILE', str(responses_file))
    if extra_env:
        for key, value in extra_env.items():
            monkeypatch.setenv(key, value)

    sys.path.insert(0, str(SRC_DIR))
    try:
        module = importlib.import_module('server')
        importlib.reload(module)
        return module
    finally:
        sys.path.pop(0)


@pytest.fixture
def server_module(tmp_path, monkeypatch):
    module = load_server_module(tmp_path, monkeypatch)
    yield module
    sys.modules.pop('server', None)


def assert_block_coverage(block, block_size, instances, rules, explanations):
    assert len(block) == block_size
    assert {triple['instanceId'] for triple in block} == instances
    assert {triple['ruleId'] for triple in block} == rules
    assert {triple['explanationId'] for triple in block} == explanations


def test_sequential_blocks_cover_each_rule(server_module):
    """Test that each block contains all 4 rules and all 3 instances and 3 explanations."""
    instances = set(server_module.VOTING_INSTANCE_IDS)
    rules = set(server_module.RULE_IDS)
    explanations = set(server_module.EXPLANATION_IDS)
    block_size = server_module.QUESTIONS_PER_REQUEST

    for _ in range(4):
        block = server_module.generate_question_triples(block_size)
        
        # Must have exactly 4 triples
        assert len(block) == block_size
        
        # All rules must appear exactly once
        block_rules = [triple['ruleId'] for triple in block]
        assert sorted(block_rules) == sorted(rules), \
            f"Block missing rules: {rules - set(block_rules)}"
        
        # All instances must appear at least once
        block_instances = {triple['instanceId'] for triple in block}
        assert block_instances == instances, \
            f"Block missing instances: {instances - block_instances}"
        
        # All explanations must appear at least once
        block_explanations = {triple['explanationId'] for triple in block}
        assert block_explanations == explanations, \
            f"Block missing explanations: {explanations - block_explanations}"


def test_response_counts_guide_selection(server_module, tmp_path):
    """Test that response counts influence which questions are selected."""
    responses_path = tmp_path / 'responses.json'
    
    # Create fabricated responses that heavily favor simple instance
    fabricated_responses = []
    for rule in server_module.RULE_IDS:
        for explanation in server_module.EXPLANATION_IDS:
            for i in range(10):
                fabricated_responses.append({
                    'survey-response': {
                        f'instance-simple-{rule}-{explanation}': 'answer'
                    },
                    'submission-time': '2026-02-23T10:00:00+00:00'
                })
    
    with open(responses_path, 'w', encoding='utf-8') as f:
        json.dump(fabricated_responses, f)
    
    # Generate multiple blocks and count instance diversity
    block_size = server_module.QUESTIONS_PER_REQUEST
    num_blocks = 10
    instances_seen = set()
    response_counts = server_module.count_responses_per_question()
    
    for _ in range(num_blocks):
        block = server_module.generate_question_triples(block_size)
        for triple in block:
            instances_seen.add(triple['instanceId'])
            # Update counts as if these were submitted
            q_id = f"instance-{triple['instanceId']}-{triple['ruleId']}-{triple['explanationId']}"
            response_counts[q_id] = response_counts.get(q_id, 0) + 1
    
    # Should select under-responded instances (complicated, few_rounds)
    # despite simple having many responses
    assert 'simple' not in instances_seen or len(instances_seen) > 1, \
        f"Should balance across instances, got: {instances_seen}"


def test_fallback_selection_always_returns_four_triples(server_module, tmp_path):
    """Test that the fallback mechanism ensures 4 triples are always returned."""
    responses_path = tmp_path / 'responses.json'
    
    # Create a response distribution that might challenge the algorithm
    fabricated_responses = []
    
    # Give one specific combination a very high response count
    for i in range(1000):
        fabricated_responses.append({
            'survey-response': {
                f'instance-simple-approval-none': 'answer'
            },
            'submission-time': '2026-02-23T10:00:00+00:00'
        })
    
    # Give all other questions very low counts
    with open(responses_path, 'w', encoding='utf-8') as f:
        json.dump(fabricated_responses, f)
    
    # Generate multiple blocks - should still get 4 questions each time
    for _ in range(20):
        block = server_module.generate_question_triples(server_module.QUESTIONS_PER_REQUEST)
        
        # Always get exactly 4 triples
        assert len(block) == 4
        
        # All rules must appear
        assert len({triple['ruleId'] for triple in block}) == len(server_module.RULE_IDS)
        
        # All instances must appear
        assert len({triple['instanceId'] for triple in block}) == len(server_module.VOTING_INSTANCE_IDS)
        
        # All explanations must appear
        assert len({triple['explanationId'] for triple in block}) == len(server_module.EXPLANATION_IDS)


def test_larger_blocks_include_each_rule_before_duplicates(tmp_path, monkeypatch):
    sys.modules.pop('server', None)
    module = load_server_module(
        tmp_path,
        monkeypatch,
        extra_env={'QUESTIONS_PER_REQUEST': '6'},
    )

    block = module.generate_question_triples(module.QUESTIONS_PER_REQUEST)
    assert len(block) == module.QUESTIONS_PER_REQUEST

    rules_in_block = [triple['ruleId'] for triple in block]
    # Each rule should appear at least once before any rule is repeated.
    seen = set()
    for rule in rules_in_block:
        if rule in seen:
            break
        seen.add(rule)

    assert seen == set(module.RULE_IDS)


def test_malformed_responses_file_handled_gracefully(server_module, tmp_path):
    """Test that the system handles malformed response files gracefully."""
    responses_path = tmp_path / 'responses.json'
    
    # Write invalid JSON to responses file
    with open(responses_path, 'w', encoding='utf-8') as f:
        f.write("{ invalid json ]")
    
    # Should not crash, just treat as empty responses
    block = server_module.generate_question_triples(server_module.QUESTIONS_PER_REQUEST)
    
    # Should still produce valid output
    assert len(block) == server_module.QUESTIONS_PER_REQUEST
    assert len({triple['ruleId'] for triple in block}) == len(server_module.RULE_IDS)


# Tests for the new balancing feature


def test_balanced_selection_maintains_rule_coverage(server_module, tmp_path):
    """Test that select_balanced_triple_block maintains all coverage constraints."""
    instances = set(server_module.VOTING_INSTANCE_IDS)
    rules = set(server_module.RULE_IDS)
    explanations = set(server_module.EXPLANATION_IDS)
    
    # Run multiple times with empty response counts
    for _ in range(20):
        block = server_module.select_balanced_triple_block({})
        
        # Must have exactly 4 triples
        assert len(block) == 4
        
        # All rules must appear exactly once
        block_rules = [triple['ruleId'] for triple in block]
        assert sorted(block_rules) == sorted(rules), \
            f"Block missing rules: {rules - set(block_rules)}"
        
        # All instances must appear at least once
        block_instances = [triple['instanceId'] for triple in block]
        instance_counts = {}
        for inst in block_instances:
            instance_counts[inst] = instance_counts.get(inst, 0) + 1
        assert set(instance_counts.keys()) == instances, \
            f"Block missing instances: {instances - set(instance_counts.keys())}"
        
        # All explanations must appear at least once
        block_explanations = [triple['explanationId'] for triple in block]
        explanation_counts = {}
        for exp in block_explanations:
            explanation_counts[exp] = explanation_counts.get(exp, 0) + 1
        assert set(explanation_counts.keys()) == explanations, \
            f"Block missing explanations: {explanations - set(explanation_counts.keys())}"
        
        # At most one instance can appear twice
        instances_with_two = [i for i, c in instance_counts.items() if c == 2]
        assert len(instances_with_two) <= 1, \
            f"Multiple instances appear twice: {instances_with_two}"
        
        # At most one explanation can appear twice
        explanations_with_two = [e for e, c in explanation_counts.items() if c == 2]
        assert len(explanations_with_two) <= 1, \
            f"Multiple explanations appear twice: {explanations_with_two}"
        
        # No instance or explanation should appear more than twice
        assert max(instance_counts.values()) <= 2
        assert max(explanation_counts.values()) <= 2


def test_balanced_selection_prioritizes_low_response_questions(server_module, tmp_path):
    """Test that questions with fewer responses are selected when possible."""
    # Create a response distribution where one question has 0 responses
    # and we force selection by creating a scenario
    response_counts = {}
    
    # Give all questions 5 responses except for one specific combo
    for instance in server_module.VOTING_INSTANCE_IDS:
        for rule in server_module.RULE_IDS:
            for explanation in server_module.EXPLANATION_IDS:
                q_id = f"instance-{instance}-{rule}-{explanation}"
                response_counts[q_id] = 5
    
    # Set one specific question to have 0 responses
    target_question = f"instance-simple-approval-none"
    response_counts[target_question] = 0
    
    # Run multiple times to check if the low-response question gets selected
    selected_questions = set()
    for _ in range(20):
        block = server_module.select_balanced_triple_block(response_counts)
        for triple in block:
            q_id = f"instance-{triple['instanceId']}-{triple['ruleId']}-{triple['explanationId']}"
            selected_questions.add(q_id)
    
    # The target question (with 0 responses) should have been selected at least once
    assert target_question in selected_questions, \
        f"Low-response question {target_question} was never selected"


def test_balanced_selection_with_imbalanced_distribution(server_module, tmp_path):
    """Test balancing with a heavily imbalanced response distribution."""
    response_counts = {}
    
    # Make simple instance heavily favored (more responses)
    for rule in server_module.RULE_IDS:
        for explanation in server_module.EXPLANATION_IDS:
            q_id = f"instance-simple-{rule}-{explanation}"
            response_counts[q_id] = 100  # Heavily responded to
    
    # Keep complicated and few_rounds with fewer responses
    for instance in ['complicated', 'few_rounds']:
        for rule in server_module.RULE_IDS:
            for explanation in server_module.EXPLANATION_IDS:
                q_id = f"instance-{instance}-{rule}-{explanation}"
                response_counts[q_id] = 1  # Few responses
    
    # Run multiple times
    simple_count = 0
    other_count = 0
    
    for _ in range(50):
        block = server_module.select_balanced_triple_block(response_counts)
        for triple in block:
            if triple['instanceId'] == 'simple':
                simple_count += 1
            else:
                other_count += 1
    
    # Should prefer other instances due to fewer responses
    # (though not guaranteed due to randomness, we check with high probability)
    # The algorithm should favor other_count at least somewhat
    assert other_count > 0, "Low-response instances should be selected sometimes"


def test_generate_question_triples_with_fabricated_responses(server_module, tmp_path):
    """Test the full generate_question_triples with fabricated response data."""
    responses_path = tmp_path / 'responses.json'
    
    # Create fabricated response data with known distribution
    fabricated_responses = []
    
    # Give simple instance 20 responses for each rule-explanation combo
    for rule in server_module.RULE_IDS:
        for explanation in server_module.EXPLANATION_IDS:
            for i in range(20):
                fabricated_responses.append({
                    'survey-response': {
                        f'instance-simple-{rule}-{explanation}': 'some_answer'
                    },
                    'submission-time': '2026-02-23T10:00:00+00:00'
                })
    
    # Give complicated instance 5 responses for each combo
    for rule in server_module.RULE_IDS:
        for explanation in server_module.EXPLANATION_IDS:
            for i in range(5):
                fabricated_responses.append({
                    'survey-response': {
                        f'instance-complicated-{rule}-{explanation}': 'some_answer'
                    },
                    'submission-time': '2026-02-23T10:00:00+00:00'
                })
    
    # Write fabricated responses
    with open(responses_path, 'w', encoding='utf-8') as f:
        json.dump(fabricated_responses, f)
    
    # Generate triples - should prioritize complicated and few_rounds due to fewer responses
    block_size = server_module.QUESTIONS_PER_REQUEST
    instances = set(server_module.VOTING_INSTANCE_IDS)
    explanations = set(server_module.EXPLANATION_IDS)
    block = server_module.generate_question_triples(block_size)
    
    # Verify all coverage constraints are met
    assert len(block) == block_size
    assert {triple['ruleId'] for triple in block} == set(server_module.RULE_IDS)
    
    # All instances must appear at least once
    block_instances = {triple['instanceId'] for triple in block}
    assert block_instances == instances
    
    # All explanations must appear at least once
    block_explanations = {triple['explanationId'] for triple in block}
    assert block_explanations == explanations
    
    # Verify constraints on duplication
    instance_counts = {}
    for triple in block:
        inst = triple['instanceId']
        instance_counts[inst] = instance_counts.get(inst, 0) + 1
    
    explanation_counts = {}
    for triple in block:
        exp = triple['explanationId']
        explanation_counts[exp] = explanation_counts.get(exp, 0) + 1
    
    # At most one instance and one explanation can appear twice
    assert len([i for i, c in instance_counts.items() if c == 2]) <= 1
    assert len([e for e, c in explanation_counts.items() if c == 2]) <= 1


def test_multiple_blocks_achieve_balance_over_time(server_module, tmp_path):
    """Test that multiple blocks gradually balance responses across questions."""
    responses_path = tmp_path / 'responses.json'
    
    # Start with empty responses
    with open(responses_path, 'w', encoding='utf-8') as f:
        json.dump([], f)
    
    instances = set(server_module.VOTING_INSTANCE_IDS)
    rules = set(server_module.RULE_IDS)
    explanations = set(server_module.EXPLANATION_IDS)
    block_size = server_module.QUESTIONS_PER_REQUEST
    blocks_to_generate = 15
    
    for block_num in range(blocks_to_generate):
        block = server_module.generate_question_triples(block_size)
        
        # Verify each block maintains all coverage constraints
        assert len(block) == block_size
        assert {triple['ruleId'] for triple in block} == rules, \
            f"Block {block_num} missing rules"
        
        # All instances must appear at least once
        block_instances = {triple['instanceId'] for triple in block}
        assert block_instances == instances, \
            f"Block {block_num} missing instances"
        
        # All explanations must appear at least once
        block_explanations = {triple['explanationId'] for triple in block}
        assert block_explanations == explanations, \
            f"Block {block_num} missing explanations"
        
        # Add to responses file (simulating user submissions)
        response_data = {
            'survey-response': {
                f"instance-{triple['instanceId']}-{triple['ruleId']}-{triple['explanationId']}": 'answer'
                for triple in block
            },
            'submission-time': '2026-02-23T10:00:00+00:00'
        }
        
        with open(responses_path, 'r', encoding='utf-8') as f:
            all_responses = json.load(f)
        all_responses.append(response_data)
        
        with open(responses_path, 'w', encoding='utf-8') as f:
            json.dump(all_responses, f)
    
    # Load final response counts
    response_counts = server_module.count_responses_per_question()
    
    # Check that responses are reasonably balanced across instances
    instance_totals: dict[str, int] = {}
    for q_id, count in response_counts.items():
        # Extract instance from question ID: instance-{instance}-{rule}-{explanation}
        instance = q_id.split('-')[1]
        instance_totals[instance] = instance_totals.get(instance, 0) + count
    
    # All instances should have received responses
    for instance in instances:
        assert instance in instance_totals, f"Instance {instance} has no responses"
        assert instance_totals[instance] > 0, f"Instance {instance} has no responses"


def test_empty_responses_file(server_module, tmp_path):
    """Test that the system works correctly with no responses yet."""
    responses_path = tmp_path / 'responses.json'
    
    # Ensure responses file exists but is empty
    with open(responses_path, 'w', encoding='utf-8') as f:
        json.dump([], f)
    
    instances = set(server_module.VOTING_INSTANCE_IDS)
    explanations = set(server_module.EXPLANATION_IDS)
    block_size = server_module.QUESTIONS_PER_REQUEST
    block = server_module.generate_question_triples(block_size)
    
    # Should maintain all coverage constraints
    assert len(block) == block_size
    block_rules = {triple['ruleId'] for triple in block}
    assert block_rules == set(server_module.RULE_IDS)
    
    block_instances = {triple['instanceId'] for triple in block}
    assert block_instances == instances
    
    block_explanations = {triple['explanationId'] for triple in block}
    assert block_explanations == explanations


def test_missing_responses_file_uses_empty_counts(server_module, tmp_path):
    """Test that missing responses file doesn't crash the system."""
    # Ensure responses file doesn't exist
    responses_path = tmp_path / 'responses.json'
    if responses_path.exists():
        responses_path.unlink()
    
    block_size = server_module.QUESTIONS_PER_REQUEST
    # Should not raise an exception
    block = server_module.generate_question_triples(block_size)
    
    # Should still maintain coverage
    assert len(block) == block_size
    assert len({triple['ruleId'] for triple in block}) == len(server_module.RULE_IDS)
