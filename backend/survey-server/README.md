# Survey Server

This Flask application accepts survey responses from the frontend and persists them to a JSON file. It is intended for local development and lightweight deployments where a full database is unnecessary.

## Features

- Receives `POST /submit-response` payloads and appends them to a JSON array.
- Serves `GET /get-questions` so the frontend can pull the canonical fallback ordering.
- Stores metadata such as submission timestamp alongside the raw response.
- Uses `SURVEY_STORAGE_FILE` environment variable to determine where responses are persisted (defaults to `/storage-bucket/responses.json`).
- CORS-enabled to allow frontend integration during development.

## Requirements

- Docker (recommended for development)
- Python 3.11+ (optional if running without Docker)

## Development Workflow with Docker

### 1. Build the Image

Run the following command from the repository root to build the survey server image:

```powershell
docker build -t survey-server backend/survey-server
```

### 2. Prepare Storage Directory

Ensure the `backend/storage-bucket` directory exists. The Flask app writes responses to this folder when mounted into the container.

### 3. Run the Container

Launch the container, mapping the host storage bucket into the container path expected by the server:

```powershell
docker run --rm \ 
  -p 8080:8080 \ 
  -v "${PWD}\backend\storage-bucket:/storage-bucket" \ 
  survey-server
```

This command:

- Publishes the Flask server on `http://localhost:8080`.
- Mounts the host `backend/storage-bucket` directory into the container at `/storage-bucket` so responses persist across runs.
- Removes the container automatically when stopped.

### Optional: Override Storage Location

To use a different storage path inside the container, supply `SURVEY_STORAGE_FILE`:

```powershell
docker run --rm \ 
  -p 8080:8080 \ 
  -v "${PWD}\backend\storage-bucket:/storage-bucket" \ 
  -e SURVEY_STORAGE_FILE=/storage-bucket/custom-responses.json \ 
  survey-server
```

## Running Without Docker (Optional)

If you prefer to run the app directly:

1. Create and activate a virtual environment.
2. Install dependencies:

   ```powershell
   pip install -r backend/survey-server/requirements.txt
   ```

3. Set the storage location if desired:

   ```powershell
   set SURVEY_STORAGE_FILE=backend/storage-bucket/responses.json
   ```

4. Start the server from `backend/survey-server`:

   ```powershell
   flask --app src/server.py run --host 0.0.0.0 --port 8080
   ```

## API Endpoints

- `POST /submit-response` — Accepts JSON payloads from the frontend; returns status messages on success or failure.
- `GET /get-questions` — Returns `{ "pageIds": [...] }` matching the fallback survey ordering used by the frontend.
- `GET /` — Simple hello world endpoint for smoke testing.

## Logs & Stored Data

- Survey submissions are appended to the JSON file under `backend/storage-bucket/responses.json` (or the path specified via `SURVEY_STORAGE_FILE`).
- Container logs can be viewed with `docker logs <container-id>` if running in detached mode.
