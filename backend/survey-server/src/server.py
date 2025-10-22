import os
import json

from flask import Flask, request
from flask_cors import CORS
from http import HTTPStatus

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


storage_file = '/storage-bucket/responses.json'

def save_response(response):
    with open(storage_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    data.append(response)

    with open(storage_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=2)


@app.route("/submit-response", methods = ['POST'])
def receive_response():
    """User posts a survey response to be saved.."""
    survey_response = request.get_json()
    print("Received survey response: " + str(survey_response))
    save_response(survey_response)
    return "Submit successful!", HTTPStatus.OK


@app.route("/")
def hello_world():
    """Example Hello World route."""
    name = os.environ.get("NAME", "World")
    return f"Hello {name}!"

if __name__ == "__main__":
    print("Starting server...")
    if not os.path.isfile(storage_file):
        with open(storage_file, 'w') as file:
            file.write("[]")
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
