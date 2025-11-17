# Testing Guide

The frontend uses [Vitest](https://vitest.dev/) with a jsdom environment to exercise components and infrastructure. This document outlines how tests are organized and how to contribute new coverage.

## Quick Start

```bash
npm install
npm test           # watch mode
npm test -- --run  # single run (CI mode)
```

Vitest configuration is driven by package scripts in `package.json`; no additional config file is required because defaults suffice for this project.

## Test Locations

Tests live beside their source files using the `.test.ts` suffix:

- `src/config/loader.test.ts` — configuration loading, template resolution, fallback logic.
- `src/pagination/paginator.test.ts` — navigation behaviour, persistence, completion payloads.
- `src/pages/text-input-page.test.ts` — validation rules and autosave behaviour for free-form responses.
- `src/pages/questionnaire/questionnaire-page.test.ts` — questionnaire rendering and data normalization.

This colocation keeps tests close to the implementation and encourages updating coverage whenever modules change.

## Writing Tests

1. **Select the Right Environment** — annotate each file with `// @vitest-environment jsdom` to ensure DOM APIs are available.
2. **Arrange** — create DOM containers (`document.body.innerHTML = '<div id="app"></div>';`) and instantiate modules under test.
3. **Act** — trigger events (`click`, `input`, etc.) or call flow control methods to simulate user behaviour.
4. **Assert** — use `expect` to validate DOM changes, emitted payloads, and side effects such as `localStorage` writes.

### Mocking Fetch Requests

When testing configuration loaders, inject a custom `fetchImpl` function that returns deterministic `Response` objects. This keeps tests hermetic and faster than relying on actual network requests.

### Handling Timers

Paginator duration tests use fake timers:

```ts
vi.useFakeTimers();
vi.setSystemTime(new Date('2025-01-01T00:00:00Z'));
```

After the test, always call `vi.useRealTimers()` or restore timers in `afterEach` to avoid cross-test interference.

### Inspecting Local Storage

Use `localStorage.getItem(key)` to verify persistence. Clear storage (`localStorage.clear()`) at the start of relevant tests to isolate state.

## Adding Coverage for New Features

1. Identify the module boundaries and how the new logic should behave.
2. Create a `.test.ts` file next to the module if one does not already exist.
3. Mock dependencies (e.g., fetch, page factories) rather than relying on full integrations unless the integration itself is what needs validation.
4. Validate both happy-path behaviour and error handling.
5. Run `npm test -- --run` before committing to ensure all suites pass in single-run mode.

## Debugging Failing Tests

- Use `console.log` or `screen.debug()` (from @testing-library if introduced) to inspect DOM as needed.
- Run a focused test with `vitest run file.test.ts -t "test name"` for faster iterations.
- When a failure only appears in CI, confirm environment variables and default config values—many tests rely on fallback behaviour when fetch fails.

By keeping tests deterministic and colocated with source files, the project maintains a fast feedback cycle and makes refactoring safer.
