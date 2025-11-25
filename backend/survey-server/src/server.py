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

PREFIX_QUESTIONS = [
    'intro',
    'demographic',
    'overview',
    'perpetual-demo'
]
POSTFIX_QUESTIONS = [
    'feedback',
    'thank-you'
]

VOTING_INSTANCE_IDS = [
    'simple',
    'complicated',
    'few_rounds',
    'few_voters'
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
    'instance_based',
    'llm_generated'
]

QUESTIONS_PER_REQUEST = 4


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


def shuffled_sequence(options: list[str], count: int) -> list[str]:
    if not options:
        return []

    pool = list(options)
    result: list[str] = []

    while len(result) < count:
        random.shuffle(pool)
        result.extend(pool)

    return result[:count]


def generate_question_triples(count: int = QUESTIONS_PER_REQUEST) -> list[dict[str, str]]:
    instances = shuffled_sequence(VOTING_INSTANCE_IDS, count)
    rules = shuffled_sequence(RULE_IDS, count)
    explanations = shuffled_sequence(EXPLANATION_IDS, count)

    triples: list[dict[str, str]] = []
    for index in range(count):
        triples.append(
            {
                'instanceId': instances[index],
                'ruleId': rules[index],
                'explanationId': explanations[index],
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

@app.route('/get-questions', methods=['GET'])
def get_questions():
    triples = generate_question_triples()
    randomized_questions = [
        f"instance-{triple['instanceId']}-{triple['ruleId']}-{triple['explanationId']}"
        for triple in triples
    ]
    questions = PREFIX_QUESTIONS + randomized_questions + POSTFIX_QUESTIONS
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
