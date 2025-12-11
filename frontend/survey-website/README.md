# Survey Website Frontend Documentation

This document provides a complete overview of the frontend implementation for the perpetual voting explainability prototype. It is meant as the entry point for new contributors and as a reference for the existing team.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Runtime Flow](#runtime-flow)
3. [Configuration System](#configuration-system)
4. [Pagination Framework](#pagination-framework)
5. [Page Implementations](#page-implementations)
6. [State Persistence](#state-persistence)
7. [API Integration](#api-integration)
8. [Styling Conventions](#styling-conventions)
9. [Testing Strategy](#testing-strategy)
10. [Environment Variables](#environment-variables)
11. [Development Tasks](#development-tasks)

## Architecture Overview

The frontend is a TypeScript single-page application built with Vite. It renders a scripted survey experience inside the `#app` container and interacts with the backend survey API for configuration and submission.

The codebase is organized into the following top-level concerns:

- `src/config` — loads and normalizes survey configuration, including fallback defaults.
- `src/pagination` — implements the survey paginator, user controls, and flow orchestration.
- `src/pages` — contains individual page components (text, text input, questionnaire) that render content and validate user responses.
- `src/pagination/survey-shell.ts` — UI shell that hosts the current page, navigation buttons, and progress display.
- `src/style.css` — global styles and layout definitions for the survey UI.
- `docs/` — in-depth technical documentation (this README and supporting guides).

Supporting utilities are deliberately kept close to their usage sites to make tree-shaking simple and maintain the project’s small footprint.

## Runtime Flow

1. `src/main.ts` bootstraps the application by resolving configuration overrides, loading remote or fallback survey definitions, and updating document metadata (title, language, direction).
2. A `Paginator` instance is created with the loaded page descriptors and a registry of page factories.
3. The `Paginator` instantiates the first page, mounts it within the `SurveyShell`, and listens for navigation events.
4. Each page validates its inputs before allowing progression. When the final page completes, a submission payload is emitted and posted to the backend.

### Error Handling

- Configuration load failures fall back to an embedded config and surface a console warning.
- Runtime errors during validation or submission display user-friendly messages inside the shell and log details to the console.

## Configuration System

Configuration files describe survey pages, settings, and remote assets.

- `loadSurveyConfig` accepts optional overrides for config URL and language. It fetches JSON, merges with fallback defaults, resolves backend-provided page order, and normalizes descriptors.
- Supported settings include progress visibility, text direction, local storage keys, autosave management, and language.
- Questionnaire pages embed questions inline; only the ordering comes from the backend.
- Page ordering is dynamically overridden via backend-provided `pageIds` lists served from `/get-questions`.

See [`docs/configuration.md`](docs/configuration.md) for a full schema reference, including environment overrides handled by `src/config/api-endpoints.ts`.

## Pagination Framework

The pagination layer is responsible for flow control, navigation, and persistence.

- `Paginator` receives a list of normalized `PageDescriptor` objects and a registry mapping page types to factory functions.
- It manages navigation state (`currentIndex`, `progress`, etc.), keeps track of visited pages, and stores per-page timing metrics.
- The shell (`SurveyShell`) renders navigation buttons, progress display, error messaging, and a reset action.
- Flow control methods exposed to pages (`next`, `back`, `jumpTo`, `complete`, `reset`) are proxied through a `FlowControls` object, encouraging pages to use the shared navigation contract.

### Completion Payload

On completion, the paginator emits a `PaginationCompletePayload` containing:

- A snapshot of the descriptors used during the session.
- User-provided data indexed by page ID.
- Page duration measurements in milliseconds.

## Page Implementations

Each page type extends `BasePage` and follows a common lifecycle:

1. `render()` — build DOM content and register event listeners.
2. `onEnter(savedData)` — called when the page becomes active; should restore previous state when available.
3. `validate()` — return `{ valid, message?, data? }`; this governs navigation.
4. `onLeave()` — optional cleanup when the page is exited due to navigation.

Page modules:

- `text-page.ts` — renders informational content with title/body/footnote sections.
- `text-input-page.ts` — collects open-ended responses with autosave support and character counters.
- `questionnaire/questionnaire-page.ts` — renders structured questions (single select, numeric input, etc.) using descriptors defined in configuration.
	- Supports per-question `correctAnswer` metadata so designers can gate progress on knowledge checks without revealing the correct value.
	- An optional `attemptTracking` config records `incorrectAttempts` in the submission payload for downstream scoring and can optionally surface (or hide) a localized inline counter; if no questions define `correctAnswer`, both the counter and field are omitted automatically.

Shared interactions, such as enabling the next button only after validation prerequisites are met, are implemented in page-specific logic but conform to the flow API.

## State Persistence

Two persistence mechanisms coexist:

- **Paginator state** — optional persistence of flow progress and validation data via `storageKey` and `storageVersion`. Saving is opportunistic and cleared upon completion or reset.
- **Autosave entries** — per-page storage for long-form inputs (e.g., open text responses) keyed via page-specific `autosaveKey`s. These are cleared when the flow is reset.

Persistence prioritizes user experience (resume capability) while avoiding data leaks by respecting the configured keys.

## API Integration

Backend contact points are limited and centrally defined in `src/config/api-endpoints.ts`:

1. During configuration load, `pageSequenceSource` points to `/get-questions`, allowing the backend to dictate page ordering for experiments.
2. When `onComplete` fires, `main.ts` builds a submission payload with responses and durations.
3. `resolveSubmitEndpoint` computes the submission URL using Vite environment variables (falling back to `http://localhost:8080/submit-response`).
4. `fetch` is used to POST the submission. Failures display an error message and log details for troubleshooting.

Thanks to explicit helpers, both endpoints can be reconfigured per environment without touching the app logic, keeping the rest of the UI stateless.

## Styling Conventions

- `src/style.css` defines CSS variables for colors, fonts, spacing, and responsive behavior.
- Layout uses flexbox with logical properties to support both LTR and RTL text directions.
- Components add BEM-like class names prefixed with the module (`survey-shell__`, `text-input-page__`, etc.).
- When practical, prefer CSS over DOM manipulations for direction or alignment changes.

## Testing Strategy

Unit tests live alongside source files and are written with Vitest and `@vitest-environment jsdom`.

- Configuration loader tests cover remote fetching, fallbacks, parameterization, and error handling.
- Paginator tests mock page factories to assert flow transitions, persistence, and completion payloads.
- Page component tests verify validation rules and control interactions.

Execute tests with `npm test` (watch mode) or `npm test -- --run` for a single-pass run.

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_SURVEY_API_BASE_URL` | Complete base URL for submission endpoint | — |
| `VITE_SURVEY_API_PROTOCOL` | Protocol override (e.g., `https`) | Derived from window location |
| `VITE_SURVEY_API_HOST` | Hostname override | Derived from window location |
| `VITE_SURVEY_API_PORT` | Port override | Derived from window location |
| `VITE_SURVEY_API_PATH` | Submission path | `/submit-response` |
| `VITE_SURVEY_API_QUESTION_PATH` | Ordering endpoint path | `/get-questions` |

Only set the host/port variables when deploying to environments where the frontend and backend live on different origins.

## Development Tasks

- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Run tests: `npm test`
- Build production bundle: `npm run build`

### Recommended Workflow

1. Update configuration first to define content structure.
2. Extend or create page components as needed.
3. Wire new pages into the paginator registry in `main.ts`.
4. Verify rendering and validation manually, then add or update unit tests.
5. Run the full test suite before committing changes.

For deeper technical breakdowns, consult the companion documents under `docs/`.
