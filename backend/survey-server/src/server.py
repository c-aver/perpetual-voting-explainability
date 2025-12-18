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
    # TODO: store IP?
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


def _queue_entries_are_valid(entries):
    if not isinstance(entries, list):
        return False
    return all(_is_valid_triple_entry(entry) for entry in entries)


def load_triple_queue() -> list[dict[str, str]]:
    try:
        with open(triple_queue_file, 'r', encoding='utf-8') as file:
            data = json.load(file)
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        return reset_triple_queue_file()

    if not _queue_entries_are_valid(data):
        return reset_triple_queue_file()
    return data  # type: ignore[return-value]


def persist_triple_queue(queue: list[dict[str, str]]) -> None:
    queue_dir = os.path.dirname(triple_queue_file) or '.'
    os.makedirs(queue_dir, exist_ok=True)
    try:
        with tempfile.NamedTemporaryFile('w', encoding='utf-8', delete=False, dir=queue_dir) as tmp_file:
            json.dump(queue, tmp_file, ensure_ascii=False)
            tmp_path = tmp_file.name
        os.replace(tmp_path, triple_queue_file)
    except OSError as error:
        if 'tmp_path' in locals() and os.path.exists(tmp_path):
            os.remove(tmp_path)
        raise StorageError('Unable to write triple queue file.') from error


def reset_triple_queue_file() -> list[dict[str, str]]:
    fresh_queue = generate_triple_cycle()
    persist_triple_queue(fresh_queue)
    return fresh_queue


def generate_triple_cycle() -> list[dict[str, str]]:
    blocks = [(u, v) for u in range(INSTANCE_VARIANT_COUNT) for v in range(EXPLANATION_VARIANT_COUNT)]
    random.shuffle(blocks)

    instance_perm = random.sample(range(INSTANCE_VARIANT_COUNT), INSTANCE_VARIANT_COUNT)
    rule_perm = random.sample(range(RULE_VARIANT_COUNT), RULE_VARIANT_COUNT)
    explanation_perm = random.sample(range(EXPLANATION_VARIANT_COUNT), EXPLANATION_VARIANT_COUNT)

    cycle: list[dict[str, str]] = []
    for (u, v) in blocks:
        order = list(range(TRIPLE_BLOCK_SIZE))
        random.shuffle(order)
        for i in order:
            a_idx = rule_perm[i]
            b_idx = instance_perm[(i + u) % INSTANCE_VARIANT_COUNT]
            c_idx = explanation_perm[(i + v) % EXPLANATION_VARIANT_COUNT]
            cycle.append(
                {
                    'ruleId': RULE_IDS[a_idx],
                    'instanceId': VOTING_INSTANCE_IDS[b_idx],
                    'explanationId': EXPLANATION_IDS[c_idx],
                },
            )
    return cycle


def refill_triple_queue(queue: list[dict[str, str]], required_blocks: int) -> None:
    total_needed = required_blocks * TRIPLE_BLOCK_SIZE
    if len(queue) >= total_needed:
        return

    cycles_needed = max(
        triple_queue_cycles_per_refill,
        (total_needed - len(queue) + TRIPLE_CYCLE_SIZE - 1) // TRIPLE_CYCLE_SIZE,
    )

    new_triples: list[dict[str, str]] = []
    for _ in range(cycles_needed):
        new_triples.extend(generate_triple_cycle())
    queue.extend(new_triples)


def generate_question_triples(count: int = QUESTIONS_PER_REQUEST) -> list[dict[str, str]]:
    if count % TRIPLE_BLOCK_SIZE != 0:
        raise ValueError(
            f'generate_question_triples count must be a multiple of {TRIPLE_BLOCK_SIZE} to preserve coverage guarantees.',
        )

    queue = load_triple_queue()
    blocks_needed = count // TRIPLE_BLOCK_SIZE
    refill_triple_queue(queue, blocks_needed)

    triples = queue[:count]
    del queue[:count]
    persist_triple_queue(queue)
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
