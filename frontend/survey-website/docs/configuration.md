# Configuration System

This guide documents the survey configuration pipeline implemented in `src/config`.

## File Overview

- `loader.ts` — entry point for loading remote or fallback configurations.
- `types.ts` — shared type definitions for survey settings and page descriptors.
- `fallback.ts` — embedded configuration used when remote loading fails.
- `page-templates.ts` — registry of reusable template resolvers for parameterized pages.

## Loading Process

1. **Resolve Source** — `loadSurveyConfig` inspects query parameters and function options to determine which config URL to use. When no remote fetcher is provided or the request fails, the embedded fallback configuration is used.
2. **Fetch and Parse** — JSON payloads are requested with `cache: 'no-store'` to avoid stale data while iterating on survey design.
3. **Normalize Pages** — `resolvePageConfigs` clones each descriptor, loads questionnaire questions when needed, and applies template resolution.
4. **Apply Ordering** — backend-provided ordering from `/get-questions` keeps the UI aligned with server experiments.
5. **Resolve Settings** — direction, language, local storage keys, and progress display options are expanded with defaults.

## Descriptor Fields

| Field | Type | Description |
|-------|------|-------------|
| `type` | `string` | Page factory key used by the paginator registry. |
| `id` | `string?` | Stable identifier for persistence and data collection. |
| `props` | `Record<string, unknown>?` | Explicit page properties supplied directly. |
| `paramKey` | `string?` | Template key used to derive props when parameterization is desired. |
| `parameters` | `Record<string, unknown>?` | Parameter inputs forwarded to the template resolver. |
| `parameterMeta` | `PageParameterMeta?` | Populated by the loader to record the template key, signature, and parameters actually applied. |

> ⚠️ Descriptors cannot provide both `props` and `paramKey`; the loader enforces this to avoid conflicting definitions.

## Template Resolution

Template entries define reusable copy or layout variants.

```ts
registerTemplate<TextPageProps>('text', 'welcome', (parameters) => ({
  title: pickString(parameters, 'title', 'Welcome to the Survey Prototype'),
  body: pickString(parameters, 'body', 'Thanks for helping us evaluate the upcoming study.'),
  footnote: pickString(parameters, 'footnote', 'Click Next to begin.'),
}));
```

During load:

1. The loader looks up `type:paramKey` in the template registry.
2. The resolver receives a defensive copy of descriptor parameters.
3. The resulting props and metadata are attached to the descriptor before pagination begins.

Metadata includes:

- `templateKey` — string identifier registered with the template.
- `parameters` — clone of the sanitized parameter inputs.
- `signature` — stable hash-like string capturing template choice and parameter values for analytics.

## Questionnaire Support

Questionnaire pages embed their `questions` inline using the `QuestionDescriptor` type (`id`, `prompt`, `variant`, etc.) defined in `pages/questionnaire/question-types.ts`.

## Backend Endpoints

The frontend derives backend URLs through `src/config/api-endpoints.ts`, which inspects Vite environment variables for overrides:

- `VITE_SURVEY_API_BASE_URL` — full origin (protocol + host + optional port). When set, other host/port/protocol overrides are ignored.
- `VITE_SURVEY_API_PROTOCOL`, `VITE_SURVEY_API_HOST`, `VITE_SURVEY_API_PORT` — component overrides used when `BASE_URL` is not set.
- `VITE_SURVEY_API_PATH` — submission path (defaults to `/submit-response`).
- `VITE_SURVEY_API_QUESTION_PATH` — ordering endpoint path (defaults to `/get-questions`).

When no overrides exist, the app uses the browser origin for production builds and `http://localhost:8080` during local development. The fallback survey config sets `settings.pageSequenceSource` to the resolved question-order endpoint so that backend ordering is always referenced explicitly.

## Settings Resolution

The settings object controls runtime behaviour. Defaults applied by `resolveSettings` include:

- `showProgress: true`
- `direction: 'ltr'` (or `'rtl'` when using `direction: 'auto'` and the language matches configured RTL locales)
- `autosaveKeysToClear: []`

### Direction Logic

`direction: 'auto'` respects `settings.rtlLocales` (or a default set of Arabic, Persian, Hebrew, Urdu). If the configured or override language matches one of these locales (full tag or primary subtag), the survey renders in RTL.

### Language Overrides

`loadSurveyConfig` accepts a `language` option and inspects the `lang` query parameter. If neither is provided, the language from config settings (or the browser default) is used. The language is applied to `<html lang="…">` to inform screen readers and translation tools.

## Query Parameter Overrides

The loader checks for two optional url parameters:

- `?config=…` — overrides the config URL.
- `?lang=…` — overrides the chosen language.

These allow testers to swap configurations quickly without rebuilding the app.

## Failure Modes

- **Network Errors / Non-200 Responses** — fall back to the embedded configuration and log a warning.
- **Invalid JSON Shape** — fallback configuration and warning.
- **Template Resolution Failures** — throw an error highlighting the missing template key; this prevents silently rendering incomplete pages.

## Extending the System

1. Define new page props within `types.ts` if necessary.
2. Implement a template resolver or inline props for the new page type.
3. Register the page factory in `src/main.ts`.
4. Update questionnaire question types or new page validation logic as needed.
5. Expand tests in `loader.test.ts` to cover the new paths.

By centralizing configuration normalization here, the rest of the app can rely on consistent descriptors regardless of whether data came from remote services or the fallback bundle.
