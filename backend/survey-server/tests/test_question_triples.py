import importlib
import os
import sys
from itertools import product
from pathlib import Path

import pytest

SRC_DIR = Path(__file__).resolve().parents[1] / 'src'


def load_server_module(tmp_path, monkeypatch):
    queue_file = tmp_path / 'triple_queue.json'
    responses_file = tmp_path / 'responses.json'

    monkeypatch.setenv('TRIPLE_QUEUE_FILE', str(queue_file))
    monkeypatch.setenv('TRIPLE_QUEUE_REFILL_CYCLES', '1')
    monkeypatch.setenv('RESPONSE_STORAGE_FILE', str(responses_file))

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


def assert_block_coverage(block, instances, rules, explanations):
    assert len(block) == 4
    assert {triple['instanceId'] for triple in block} == instances
    assert {triple['ruleId'] for triple in block} == rules
    assert {triple['explanationId'] for triple in block} == explanations


def test_sequential_blocks_cover_each_set(server_module):
    instances = set(server_module.VOTING_INSTANCE_IDS)
    rules = set(server_module.RULE_IDS)
    explanations = set(server_module.EXPLANATION_IDS)

    for _ in range(4):
        block = server_module.generate_question_triples(4)
        assert_block_coverage(block, instances, rules, explanations)


def test_full_cycle_contains_every_possible_triple(server_module, tmp_path, monkeypatch):
    # Reload server module to ensure a fresh queue so we consume an entire cycle in one call.
    sys.modules.pop('server', None)
    module = load_server_module(tmp_path, monkeypatch)

    triples = module.generate_question_triples(64)

    instances = module.VOTING_INSTANCE_IDS
    rules = module.RULE_IDS
    explanations = module.EXPLANATION_IDS

    expected = {
        (instance, rule, explanation)
        for instance, rule, explanation in product(instances, rules, explanations)
    }
    observed = {
        (triple['instanceId'], triple['ruleId'], triple['explanationId'])
        for triple in triples
    }

    assert len(triples) == 64
    assert observed == expected

    # Verify every contiguous block of four inside the 64-triple sequence covers each set once.
    instances_set = set(instances)
    rules_set = set(rules)
    explanations_set = set(explanations)
    for index in range(0, len(triples), 4):
        block = triples[index:index + 4]
        assert_block_coverage(block, instances_set, rules_set, explanations_set)
