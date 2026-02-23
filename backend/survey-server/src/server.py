import os
import json
import tempfile
import hashlib
import random
from datetime import datetime

from flask import Flask, request
from flask_cors import CORS
from http import HTTPStatus


class StorageError(Exception):
    """Raised when persisting survey responses fails."""


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


responses_file = os.environ.get('RESPONSE_STORAGE_FILE', '/storage-bucket/responses.json')
triple_queue_file = os.environ.get('TRIPLE_QUEUE_FILE', '/storage-bucket/triple_queue.json')
triple_queue_cycles_per_refill = int(os.environ.get('TRIPLE_QUEUE_REFILL_CYCLES', '1'))

PREFIX_QUESTIONS = [
    'intro',
    'demographic',
    'perpetual-demo',
    'knowledge-check',
    'overview',
    'instance-constant-approval-none',
]
POSTFIX_QUESTIONS = [
    'feedback',
    'thank-you'
]

VOTING_INSTANCE_IDS = [
    'simple',
    'complicated',
    'few_rounds'
]

RULE_IDS = [
    'approval',
    'unit_cost',
    'equal_shares',
    'phragmen'
]

EXPLANATION_IDS = [
    'none',
    'mechanical',
    'instance_based'
]

INSTANCE_VARIANT_COUNT = len(VOTING_INSTANCE_IDS)
RULE_VARIANT_COUNT = len(RULE_IDS)
EXPLANATION_VARIANT_COUNT = len(EXPLANATION_IDS)

if INSTANCE_VARIANT_COUNT == 0 or RULE_VARIANT_COUNT == 0 or EXPLANATION_VARIANT_COUNT == 0:
    raise ValueError('Instance, rule, and explanation identifiers must be configured.')

TRIPLE_BLOCK_SIZE = max(INSTANCE_VARIANT_COUNT, RULE_VARIANT_COUNT, EXPLANATION_VARIANT_COUNT)
TRIPLE_CYCLE_SIZE = INSTANCE_VARIANT_COUNT * RULE_VARIANT_COUNT * EXPLANATION_VARIANT_COUNT
QUESTIONS_PER_REQUEST = TRIPLE_BLOCK_SIZE


def hash_ip_address(address: str | None) -> str | None:
    """Returns a SHA-256 hash of the provided IP address string."""
    if not address:
        return None

    normalized = address.strip()
    if not normalized:
        return None

    digest = hashlib.sha256(normalized.encode('utf-8', errors='ignore'))
    return digest.hexdigest()


def extract_client_ip() -> str | None:
    """Best-effort extraction of the originating client IP."""
    forwarded_for = request.headers.get('X-Forwarded-For')
    if forwarded_for:
        return forwarded_for.split(',')[0].strip()
    return request.remote_addr


def ensure_storage_file() -> None:
    """Creates the storage file if it does not exist."""
    storage_dir = os.path.dirname(responses_file) or '.'
    os.makedirs(storage_dir, exist_ok=True)
    if not os.path.exists(responses_file):
        with open(responses_file, 'w', encoding='utf-8') as file:
            json.dump([], file, ensure_ascii=False)


def load_responses() -> list:
    try:
        with open(responses_file, 'r', encoding='utf-8') as file:
            data = json.load(file)
    except FileNotFoundError:
        return []
    except json.JSONDecodeError as error:
        raise StorageError('Unable to parse response storage file.') from error
    except OSError as error:
        raise StorageError('Unable to read response storage file.') from error

    if not isinstance(data, list):
        raise StorageError('Response storage file must contain a JSON array.')

    return data


def save_response(response, hashed_ip: str | None = None):
    ensure_storage_file()
    try:
        data = load_responses()
    except StorageError:
        raise
    submission_time = datetime.now().astimezone().isoformat()
    stored_response = {
        'survey-response': response,
        'submission-time': submission_time,
    }
    if hashed_ip:
        stored_response['hashed-ip'] = hashed_ip

    data.append(stored_response)

    temp_dir = os.path.dirname(responses_file) or '.'
    try:
        with tempfile.NamedTemporaryFile('w', encoding='utf-8', delete=False, dir=temp_dir) as tmp_file:
            json.dump(data, tmp_file, ensure_ascii=False, indent=2)
            tmp_path = tmp_file.name
        os.replace(tmp_path, responses_file)
    except OSError as error:
        if 'tmp_path' in locals() and os.path.exists(tmp_path):
            os.remove(tmp_path)
        raise StorageError('Unable to write response storage file.') from error


ensure_storage_file()


def _is_valid_triple_entry(entry: dict[str, str]) -> bool:
    if not isinstance(entry, dict):
        return False

    instance = entry.get('instanceId')
    rule = entry.get('ruleId')
    explanation = entry.get('explanationId')

    return (
        isinstance(instance, str)
        and instance in VOTING_INSTANCE_IDS
        and isinstance(rule, str)
        and rule in RULE_IDS
        and isinstance(explanation, str)
        and explanation in EXPLANATION_IDS
    )


def count_responses_per_question() -> dict[str, int]:
    """Count how many responses exist for each question type (instance-rule-explanation)."""
    response_counts: dict[str, int] = {}
    try:
        responses = load_responses()
        print(f"Loaded {len(responses)} total responses")
        for response_data in responses:
            survey_response = response_data.get('survey-response', {})
            # The actual question responses are nested under 'responses' key
            responses_dict = survey_response.get('responses', {})
            # Count responses for each question key that matches the instance-* pattern
            for key in responses_dict.keys():
                if key.startswith('instance-'):
                    response_counts[key] = response_counts.get(key, 0) + 1
        print(f"Found {len(response_counts)} unique question types with responses")
    except Exception as e:
        # If anything goes wrong reading responses, log and return empty dict (no preference)
        app.logger.error(f"Error counting responses: {e}")
        print(f"Error counting responses: {e}")
    return response_counts


def select_balanced_triple_block(response_counts: dict[str, int]) -> list[dict[str, str]]:
    """
    Select 4 triples (one per rule) prioritizing questions with fewer responses,
    while ensuring all constraints are met:
    - Each rule appears exactly once
    - Each instance appears 1-2 times (at most one instance appears twice)
    - Each explanation appears 1-2 times (at most one explanation appears twice)
    
    Algorithm: Iterate all possible triples sorted by response count (ascending).
    For each triple, if adding it doesn't violate constraints, add it. Continue
    until we have 4 triples, then shuffle the order.
    
    Fallback: If the greedy algorithm fails to find 4 triples, use random selection
    that respects constraints but ignores response counts.
    """
    print(response_counts)

    selected = []
    used_rules: set[str] = set()
    instance_counts: dict[str, int] = {}
    explanation_counts: dict[str, int] = {}
    
    # Generate all possible triples sorted by response count (ascending)
    all_triples: list[tuple[int, str, str, str]] = []
    for rule in RULE_IDS:
        for instance in VOTING_INSTANCE_IDS:
            for explanation in EXPLANATION_IDS:
                q_id = f"instance-{instance}-{rule}-{explanation}"
                count = response_counts.get(q_id, 0)
                all_triples.append((count, rule, instance, explanation))
    
    # Sort by response count (ascending) - least answered first
    all_triples.sort(key=lambda x: x[0])
    
    # Greedily select triples
    for count, rule, instance, explanation in all_triples:
        # If we already have 4 triples, we're done
        if len(selected) == 4:
            break
        
        # Skip if rule already used (each rule must appear exactly once)
        if rule in used_rules:
            continue
        
        # Check instance constraint
        current_instance_count = instance_counts.get(instance, 0)
        instances_with_two = [i for i, c in instance_counts.items() if c == 2]
        
        # Can't add if this instance already has 2 appearances
        if current_instance_count >= 2:
            continue
        
        # If another instance already has 2, we can't increase a different instance to 2
        # But we CAN add instances that haven't been selected (current_count == 0)
        if instances_with_two and current_instance_count == 1 and instance not in instances_with_two:
            continue
        
        # Check explanation constraint (same logic)
        current_explanation_count = explanation_counts.get(explanation, 0)
        explanations_with_two = [e for e, c in explanation_counts.items() if c == 2]
        
        # Can't add if this explanation already has 2 appearances
        if current_explanation_count >= 2:
            continue
        
        # If another explanation already has 2, we can't increase a different explanation to 2
        if explanations_with_two and current_explanation_count == 1 and explanation not in explanations_with_two:
            continue
        
        # All constraints satisfied, add this triple
        selected.append({
            'instanceId': instance,
            'ruleId': rule,
            'explanationId': explanation
        })
        used_rules.add(rule)
        instance_counts[instance] = instance_counts.get(instance, 0) + 1
        explanation_counts[explanation] = explanation_counts.get(explanation, 0) + 1
    
    # Fallback: if greedy selection failed, use random selection with constraints
    if len(selected) < 4:
        app.logger.warning(f"Greedy selection only found {len(selected)} triples, using fallback random selection")
        return _fallback_random_triple_block()
    
    # Log the selection with response counts for transparency
    selection_summary = []
    for triple in selected:
        q_id = f"instance-{triple['instanceId']}-{triple['ruleId']}-{triple['explanationId']}"
        count = response_counts.get(q_id, 0)
        selection_summary.append(f"{triple['ruleId']} ({count} responses)")
    print(f"Selected questions: {', '.join(selection_summary)} - prioritizing low-response items for balanced coverage")
    
    # Randomize the order of presentation
    random.shuffle(selected)
    return selected


def _fallback_random_triple_block() -> list[dict[str, str]]:
    """
    Fallback method: randomly select 4 valid triples that satisfy all constraints,
    without regard to response counts.
    """
    selected = []
    used_rules: set[str] = set()
    instance_counts: dict[str, int] = {}
    explanation_counts: dict[str, int] = {}
    
    # Generate all possible triples
    all_triples: list[tuple[str, str, str]] = []
    for rule in RULE_IDS:
        for instance in VOTING_INSTANCE_IDS:
            for explanation in EXPLANATION_IDS:
                all_triples.append((rule, instance, explanation))
    
    # Shuffle to randomize order
    random.shuffle(all_triples)
    
    # Select triples randomly while respecting constraints
    for rule, instance, explanation in all_triples:
        # If we already have 4 triples, we're done
        if len(selected) == 4:
            break
        
        # Skip if rule already used
        if rule in used_rules:
            continue
        
        # Check instance constraint
        current_instance_count = instance_counts.get(instance, 0)
        instances_with_two = [i for i, c in instance_counts.items() if c == 2]
        
        # Can't add if this instance already has 2 appearances
        if current_instance_count >= 2:
            continue
        
        # If another instance already has 2, we can't increase a different instance to 2
        if instances_with_two and current_instance_count == 1 and instance not in instances_with_two:
            continue
        
        # Check explanation constraint
        current_explanation_count = explanation_counts.get(explanation, 0)
        explanations_with_two = [e for e, c in explanation_counts.items() if c == 2]
        
        # Can't add if this explanation already has 2 appearances
        if current_explanation_count >= 2:
            continue
        
        # If another explanation already has 2, we can't increase a different explanation to 2
        if explanations_with_two and current_explanation_count == 1 and explanation not in explanations_with_two:
            continue
        
        # All constraints satisfied, add this triple
        selected.append({
            'instanceId': instance,
            'ruleId': rule,
            'explanationId': explanation
        })
        used_rules.add(rule)
        instance_counts[instance] = instance_counts.get(instance, 0) + 1
        explanation_counts[explanation] = explanation_counts.get(explanation, 0) + 1
    
    # Should have exactly 4 triples
    if len(selected) != 4:
        # This should not happen, but if it does, log and return what we have
        app.logger.error(f"Fallback selection failed: only got {len(selected)} triples instead of 4")
        # As a last resort, fill remaining slots with any valid random triple
        while len(selected) < 4:
            remaining_rules = [r for r in RULE_IDS if r not in used_rules] if used_rules else RULE_IDS
            if not remaining_rules:
                break
            rule = random.choice(remaining_rules)
            instance = random.choice(VOTING_INSTANCE_IDS)
            explanation = random.choice(EXPLANATION_IDS)
            selected.append({
                'instanceId': instance,
                'ruleId': rule,
                'explanationId': explanation
            })
            used_rules.add(rule)
    
    random.shuffle(selected)
    return selected



def generate_question_triples(count: int = QUESTIONS_PER_REQUEST) -> list[dict[str, str]]:
    """
    Generate question triples for a participant, prioritizing questions with
    fewer existing responses while ensuring coverage of all instances, rules, and explanations.
    """
    if count % TRIPLE_BLOCK_SIZE != 0:
        raise ValueError(
            f'generate_question_triples count must be a multiple of {TRIPLE_BLOCK_SIZE} to preserve coverage guarantees.',
        )

    response_counts = count_responses_per_question()
    triples = []
    
    blocks_needed = count // TRIPLE_BLOCK_SIZE
    for _ in range(blocks_needed):
        block = select_balanced_triple_block(response_counts)
        triples.extend(block)
        # Update response counts for subsequent blocks in this batch
        for triple in block:
            q_id = f"instance-{triple['instanceId']}-{triple['ruleId']}-{triple['explanationId']}"
            response_counts[q_id] = response_counts.get(q_id, 0) + 1

    return triples


def build_submission_response(result_code: str, status: HTTPStatus, message: str | None = None):
    payload: dict[str, str] = {
        'resultCode': result_code,
    }
    if message:
        payload['message'] = message
    return payload, status


@app.route("/submit-response", methods = ['POST'])
def receive_response():
    """User posts a survey response to be saved."""
    survey_response = request.get_json(silent=True)
    print("Received survey response: " + str(survey_response))
    if survey_response is None:
        return build_submission_response('invalid_payload', HTTPStatus.BAD_REQUEST, 'Request body must contain JSON.')

    client_ip = extract_client_ip()
    hashed_ip = hash_ip_address(client_ip)

    try:
        save_response(survey_response, hashed_ip=hashed_ip)
    except StorageError as error:
        app.logger.error("Failed to save survey response.", exc_info=error)
        return build_submission_response('storage_error', HTTPStatus.INTERNAL_SERVER_ERROR, 'Failed to persist survey response.')

    return build_submission_response('success', HTTPStatus.OK)

@app.route('/get-questions', methods=['GET'])
def get_questions():
    triples = generate_question_triples()
    randomized_questions = [
        f"instance-{triple['instanceId']}-{triple['ruleId']}-{triple['explanationId']}"
        for triple in triples
    ]
    questions = PREFIX_QUESTIONS + randomized_questions + POSTFIX_QUESTIONS
    print(f"Sending requested questions: {questions}")
    return { 'pageIds': questions }, HTTPStatus.OK


# @app.route('/get-questions', methods=['GET'])
# def get_questions():
#   return { 'pageIds': PREFIX_QUESTIONS + ['perpetual-demo'] + POSTFIX_QUESTIONS}, HTTPStatus.OK

@app.route("/")
def hello_world():
    """Example Hello World route."""
    name = os.environ.get("NAME", "World")
    return f"Hello {name}!"

if __name__ == "__main__":
    print("Starting server...")
    ensure_storage_file()
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
