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


def test_sequential_blocks_cover_each_set(server_module):
    instances = set(server_module.VOTING_INSTANCE_IDS)
    rules = set(server_module.RULE_IDS)
    explanations = set(server_module.EXPLANATION_IDS)

    block_size = server_module.QUESTIONS_PER_REQUEST

    for _ in range(4):
        block = server_module.generate_question_triples(block_size)
        assert_block_coverage(block, block_size, instances, rules, explanations)


def test_full_cycle_contains_every_possible_triple(server_module, tmp_path, monkeypatch):
    # Reload server module to ensure a fresh queue so we consume an entire cycle in one call.
    sys.modules.pop('server', None)
    module = load_server_module(tmp_path, monkeypatch)

    block_size = module.QUESTIONS_PER_REQUEST
    cycle_size = module.TRIPLE_CYCLE_SIZE
    request_size = cycle_size
    # if request_size % block_size != 0:
    #     # Align to the next multiple of block size to satisfy generator expectations.
    #     request_size += block_size - (request_size % block_size)

    triples = module.generate_question_triples(request_size)

    instances = module.VOTING_INSTANCE_IDS
    rules = module.RULE_IDS
    explanations = module.EXPLANATION_IDS

    expected = {
        (instance, rule, explanation)
        for instance, rule, explanation in product(instances, rules, explanations)
    }
    observed = {
        (triple['instanceId'], triple['ruleId'], triple['explanationId'])
        for triple in triples[:]
    }

    assert len(triples) == request_size
    assert observed == expected

    # Verify contiguous blocks prioritize unique coverage where possible.
    instances_set = set(instances)
    rules_set = set(rules)
    explanations_set = set(explanations)
    for index in range(0, len(triples), block_size):
        block = triples[index:index + block_size]
        if len(block) < block_size:
            break
        assert len({triple['ruleId'] for triple in block}) >= min(len(rules_set), block_size)
        assert len({triple['instanceId'] for triple in block}) >= min(len(instances_set), block_size)
        assert len({triple['explanationId'] for triple in block}) >= min(len(explanations_set), block_size, len(block))


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


def test_invalid_queue_file_gets_reset(server_module, tmp_path):
    queue_path = tmp_path / 'triple_queue.json'
    with open(queue_path, 'w', encoding='utf-8') as queue_file:
        json.dump(
            [
                {
                    'instanceId': 'simple',
                    'ruleId': 'not-a-rule',
                    'explanationId': 'none',
                },
            ],
            queue_file,
        )

    block = server_module.generate_question_triples(server_module.QUESTIONS_PER_REQUEST)
    assert all(triple['ruleId'] in server_module.RULE_IDS for triple in block)

    with open(queue_path, 'r', encoding='utf-8') as queue_file:
        persisted_queue = json.load(queue_file)

    assert isinstance(persisted_queue, list)
    assert persisted_queue
    for triple in persisted_queue:
        assert triple['instanceId'] in server_module.VOTING_INSTANCE_IDS
        assert triple['ruleId'] in server_module.RULE_IDS
        assert triple['explanationId'] in server_module.EXPLANATION_IDS
