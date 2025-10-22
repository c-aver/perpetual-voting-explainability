import os
import json
import tempfile

from flask import Flask, request
from flask_cors import CORS
from http import HTTPStatus


class StorageError(Exception):
    """Raised when persisting survey responses fails."""


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


storage_file = os.environ.get('SURVEY_STORAGE_FILE', '/storage-bucket/responses.json')


def ensure_storage_file() -> None:
    """Creates the storage file if it does not exist."""
    storage_dir = os.path.dirname(storage_file) or '.'
    os.makedirs(storage_dir, exist_ok=True)
    if not os.path.exists(storage_file):
        with open(storage_file, 'w', encoding='utf-8') as file:
            json.dump([], file, ensure_ascii=False)


def load_responses() -> list:
    try:
        with open(storage_file, 'r', encoding='utf-8') as file:
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


def save_response(response):
    ensure_storage_file()
    try:
        data = load_responses()
    except StorageError:
        raise

    data.append(response)

    temp_dir = os.path.dirname(storage_file) or '.'
    try:
        with tempfile.NamedTemporaryFile('w', encoding='utf-8', delete=False, dir=temp_dir) as tmp_file:
            json.dump(data, tmp_file, ensure_ascii=False, indent=2)
            tmp_path = tmp_file.name
        os.replace(tmp_path, storage_file)
    except OSError as error:
        if 'tmp_path' in locals() and os.path.exists(tmp_path):
            os.remove(tmp_path)
        raise StorageError('Unable to write response storage file.') from error


ensure_storage_file()


@app.route("/submit-response", methods = ['POST'])
def receive_response():
    """User posts a survey response to be saved.."""
    survey_response = request.get_json()
    print("Received survey response: " + str(survey_response))
    if survey_response is None:
        return "Request body must contain JSON.", HTTPStatus.BAD_REQUEST

    try:
        save_response(survey_response)
    except StorageError as error:
        app.logger.error("Failed to save survey response.", exc_info=error)
        return "Failed to persist survey response.", HTTPStatus.INTERNAL_SERVER_ERROR

    return "Submit successful!", HTTPStatus.OK


@app.route("/")
def hello_world():
    """Example Hello World route."""
    name = os.environ.get("NAME", "World")
    return f"Hello {name}!"

if __name__ == "__main__":
    print("Starting server...")
    ensure_storage_file()
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
