import os
import json
import tempfile
import hashlib
import random
from datetime import datetime, timezone

from flask import Flask, request
from flask_cors import CORS
from http import HTTPStatus


class StorageError(Exception):
    """Raised when persisting survey responses fails."""


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


responses_file = os.environ.get('RESPONSE_STORAGE_FILE', '/storage-bucket/responses.json')
question_queue_file = os.environ.get('QUESTION_QUEUE_FILE', '/storage-bucket/question_queue.json')

PREFIX_QUESTIONS = [
    'intro',
    'overview',
    'demographic'
]
POSTFIX_QUESTIONS = [
    'feedback',
    'thank-you'
]

VOTING_INSTANCE_IDS = [
    'simple',
    'complicated',
    'few-rounds',
    'few-voters'
]

RULE_IDS = [
    'approval',
    'unit-cost',
    'equal-shares',
    'phragmen'
]

EXPLANATION_IDS = [
    'none',
    'mechanical',
    'instance-based',
    'llm-generated'
]

QUESTION_QUEUE_BATCH_MULTIPLIER = 4
QUESTIONS_PER_REQUEST = 4
QUESTION_QUEUE_KEYS = {
    'instances': VOTING_INSTANCE_IDS,
    'rules': RULE_IDS,
    'explanations': EXPLANATION_IDS,
}


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


def build_shuffled_queue_batch(options: list[str]) -> list[str]:
    batch = list(options) * QUESTION_QUEUE_BATCH_MULTIPLIER
    random.shuffle(batch)
    return batch


def load_question_queues() -> dict[str, list[str]]:
    try:
        with open(question_queue_file, 'r', encoding='utf-8') as file:
            stored = json.load(file)
            if not isinstance(stored, dict):
                raise ValueError('Queue file must contain an object.')
    except (FileNotFoundError, json.JSONDecodeError, ValueError):
        stored = {}

    queues: dict[str, list[str]] = {}
    changed = False

    for key, options in QUESTION_QUEUE_KEYS.items():
        queue = stored.get(key)
        if not isinstance(queue, list):
            queue = build_shuffled_queue_batch(options)
            changed = True
        queues[key] = queue

    if changed:
        persist_question_queues(queues)

    return queues


def persist_question_queues(queues: dict[str, list[str]]) -> None:
    queue_dir = os.path.dirname(question_queue_file) or '.'
    os.makedirs(queue_dir, exist_ok=True)

    temp_dir = queue_dir
    try:
        with tempfile.NamedTemporaryFile('w', encoding='utf-8', delete=False, dir=temp_dir) as tmp_file:
            json.dump(queues, tmp_file, ensure_ascii=False, indent=2)
            tmp_path = tmp_file.name
        os.replace(tmp_path, question_queue_file)
    except OSError as error:
        if 'tmp_path' in locals() and os.path.exists(tmp_path):
            os.remove(tmp_path)
        raise StorageError('Unable to write question queue file.') from error


def ensure_queue_capacity(queues: dict[str, list[str]]) -> bool:
    changed = False
    for key, options in QUESTION_QUEUE_KEYS.items():
        queue = queues[key]
        if len(queue) < QUESTIONS_PER_REQUEST:
            queue.extend(build_shuffled_queue_batch(options))
            changed = True
    return changed


def draw_from_queue(queue: list[str], count: int) -> list[str]:
    selection = queue[:count]
    del queue[:count]
    return selection


def generate_question_triples(count: int = QUESTIONS_PER_REQUEST) -> list[dict[str, str]]:
    queues = load_question_queues()
    mutated = ensure_queue_capacity(queues)

    draws: dict[str, list[str]] = {}
    for key in QUESTION_QUEUE_KEYS.keys():
        draws[key] = draw_from_queue(queues[key], count)
        mutated = True

    if mutated:
        persist_question_queues(queues)

    triples: list[dict[str, str]] = []
    for index in range(count):
        triples.append(
            {
                'instanceId': draws['instances'][index],
                'ruleId': draws['rules'][index],
                'explanationId': draws['explanations'][index],
            },
        )

    return triples


@app.route("/submit-response", methods = ['POST'])
def receive_response():
    """User posts a survey response to be saved.."""
    survey_response = request.get_json()
    print("Received survey response: " + str(survey_response))
    if survey_response is None:
        return "Request body must contain JSON.", HTTPStatus.BAD_REQUEST

    client_ip = extract_client_ip()
    hashed_ip = hash_ip_address(client_ip)

    try:
        save_response(survey_response, hashed_ip=hashed_ip)
    except StorageError as error:
        app.logger.error("Failed to save survey response.", exc_info=error)
        return "Failed to persist survey response.", HTTPStatus.INTERNAL_SERVER_ERROR

    return "Submit successful!", HTTPStatus.OK

# @app.route('/get-questions', methods=['GET'])
# def get_questions():
#     triples = generate_question_triples()
#     randomized_questions = [
#         f"instance-{triple['instanceId']}-{triple['ruleId']}-{triple['explanationId']}"
#         for triple in triples
#     ]
#     questions = PREFIX_QUESTIONS + randomized_questions + POSTFIX_QUESTIONS
#     return { 'pageIds': questions }, HTTPStatus.OK


@app.route('/get-questions', methods=['GET'])
def get_questions():
    return { 'pageIds': ['intro', 'overview', 'perpetual-demo']}, HTTPStatus.OK

@app.route("/")
def hello_world():
    """Example Hello World route."""
    name = os.environ.get("NAME", "World")
    return f"Hello {name}!"

if __name__ == "__main__":
    print("Starting server...")
    ensure_storage_file()
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
