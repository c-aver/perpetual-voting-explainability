# Pagination Framework

This document explains the design of the pagination layer located in `src/pagination`.

## Components

| File | Responsibility |
|------|----------------|
| `paginator.ts` | Core state machine handling navigation, validation, timing, and completion. |
| `types.ts` | Shared interfaces for descriptors, flow control, and completion payloads. |
| `survey-shell.ts` | Visual container for the active page, navigation controls, and messages. |
| `paginator.test.ts` | Comprehensive unit tests covering navigation and persistence scenarios. |

## Data Flow

```mermaid
graph TD
  Loader[loadSurveyConfig] -->|PageDescriptor[]| Paginator
  Paginator -->|FlowControls| PageFactory
  PageFactory --> PageInstance
  PageInstance -->|validate()| Paginator
  Paginator -->|onComplete payload| App
```

1. `Paginator` receives normalized descriptors and a registry mapping page types to factories.
2. Upon `start()`, the paginator renders the first page through its factory.
3. Navigation events from the shell trigger `handleNext`, `handleBack`, or `handleJump`, each coordinating validation and state transitions.
4. On completion, the paginator emits a payload with all collected data.

## Flow Controls API

Pages interact with the flow through a `FlowControls` object containing:

- `next()` / `back()` — asynchronous methods to move between steps.
- `jumpTo(index)` — random access for advanced flows (e.g., review screens).
- `complete()` — finalize the flow immediately after storing valid data.
- `reset()` — restart the experience, clearing progress.
- `getState()` — inspect the current index, total steps, and progress fraction.
- `setNextEnabled(enabled)` — enable/disable the next button based on validation status.
- `setError(message?)` — display or clear validation feedback.
- `setDirection?(direction)` — optional hook for pages to request direction changes (rare).

## Timing Metrics

- `beginTimingFor(key)` records a timestamp whenever a page renders.
- `recordCurrentPageDuration()` accumulates time on the current page and stores it in `pageDurations`.
- Durations are rounded to the nearest millisecond in the completion payload.

## Persistence

When `storageKey` is supplied via configuration:

- `persistState()` serializes the current index, collected data, and page durations to `localStorage`.
- `restoreFromStorage()` reloads the serialized state when the app starts, resuming the flow at the last visited index (unless `resumeFromStorage` is false).
- `reset()` and `finish()` clear persisted state to avoid reusing sensitive data.

> Tip: Keep the number of persisted keys small to reduce contention and respect browser storage quotas.

## Error Handling

- Missing page factories throw explicit errors to surface misconfigurations.
- Validation failures return early without mutating state and display error messages via the shell.
- A guard against re-entrant navigation prevents double submissions while transitions are in progress.

## Completion Payload Structure

```ts
interface PaginationCompletePayload {
  descriptors: PageDescriptor[];           // Snapshot of the flow configuration
  dataById: Record<string, unknown>;       // User-submitted data keyed by descriptor ID
  pageDurationsMs: Record<string, number>; // Time spent on each page (ms)
  pageParameters: Record<string, PageParameterMeta>; // Template metadata when applicable
}
```

`pageParameters` only contains entries for descriptors that specified a `paramKey` and successfully resolved a template.

## Extensibility Guidelines

1. **Adding a New Page Type** — create the page module, update the registry in `main.ts`, and ensure `PageDescriptor` props capture required fields.
2. **Custom Navigation Logic** — subclass or extend `Paginator` carefully; prefer composition by wrapping flow controls if you need gating logic.
3. **Analytics Hooks** — subscribe to `onChange` for per-page analytics or `onComplete` for aggregated events.
4. **Accessibility Enhancements** — extend `SurveyShell` to manage focus outlines, ARIA roles, or additional keyboard shortcuts.

## Testing Recommendations

- Use jsdom environment tests to simulate navigation and validate state transitions.
- Mock page factories to isolate paginator behaviour without rendering real components.
- Verify persistence by inspecting `localStorage` snapshots before and after transitions.

By keeping the paginator stateless outside of its owned data structures, the survey flow remains predictable, testable, and easy to extend.
