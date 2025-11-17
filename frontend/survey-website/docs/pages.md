# Page Components

This guide describes the page modules located under `src/pages` and outlines the conventions they follow.

## Base Class

All pages extend `BasePage<TData, TProps>` which provides:

- Access to the mounting container (`context.container`).
- The descriptor defining page metadata and props.
- Flow controls for navigation and validation messages.
- Helper lifecycle hooks (`onEnter`, `onLeave`, `destroy`) with default no-op implementations.

`BasePage` also stores `savedData`, which holds the most recent successful validation result.

## Page Lifecycle

1. **Instantiation** — The paginator constructs a page with its `PageFactoryContext`.
2. **`onEnter(savedData)`** — Called before `render`; restore state and recalculate UI if necessary.
3. **`render()`** — Build the DOM structure, register event listeners, and synchronize initial UI state.
4. **`validate()`** — Perform synchronous/asynchronous checks and return a `PageValidationResult`.
5. **`onLeave()`** — Optional teardown when the page is navigated away from mid-session.
6. **`destroy()`** — Remove event listeners and release DOM references to avoid memory leaks.

### Validation Results

Return objects follow this contract:

```ts
interface PageValidationResult<TData = unknown> {
  valid: boolean;
  message?: string; // optional, shown in the survey shell
  data?: TData;     // optional, stored in paginator payloads
}
```

When `valid` is false, the paginator shows `message` (or a default message) and blocks navigation.

## Page Modules

### `text-page.ts`

Renders static informational content.

- Props interface: `{ title?: string; body?: string; footnote?: string; illustration?: string; }`
- Supports optional callouts by attaching `data-` attributes or additional markup based on props.
- Typically used for welcome, overview, and closing steps.

### `text-input-page.ts`

Collects open-ended responses with optional validation.

- Props: prompt, helper text, placeholder, row count, `required`, `maxLength`, `autosaveKey`.
- Automatically enables the “Next” button only when required fields contain non-empty values.
- Maintains a character counter and persists drafts to `localStorage` using the `autosaveKey`.
- Validation returns both raw text and metadata: `{ updatedAt, length }`.

### `questionnaire/questionnaire-page.ts`

Renders structured question groups defined by `QuestionDescriptor`s.

- Supports multiple variants: select, numeric input, short text, etc.
- Maps question metadata to specific input controls and aggregates results into an output object keyed by `outputKey` descriptors.
- Displays optional help text, placeholders, and validation requirements per question.
- Useful for collecting demographic or follow-up data.

### `questionnaire/question-types.ts`

Defines TypeScript types for questionnaire descriptors, including option structures and validation metadata. Keeping types centralized ensures configuration and rendering stay in sync.

### `pages/base-page.ts`

Common utilities for subclasses:

- `flow` — references shared `FlowControls` methods.
- `descriptor` — gives access to the page configuration and props.
- `container` — DOM node where the page should render.
- `savedData` — stores previously validated data for persistence.

## Creating a New Page

1. Add a module under `src/pages/<page-name>.ts` extending `BasePage`.
2. Define a props interface describing configuration options.
3. Implement UI creation in `render` and keep references to dynamic nodes for updates.
4. Implement `validate` to perform checks and return data with a stable shape.
5. Register the page in the registry inside `src/main.ts`.
6. Add tests to `src/pages/<page-name>.test.ts` covering validation logic and flow interaction.
7. Update configuration documentation if the new page introduces additional descriptor fields.

## Accessibility Guidelines

- Labels: ensure all interactive elements have accessible names. Use `aria-label` or associate `<label>` elements appropriately.
- Focus management: automatically focus the first input after rendering when appropriate.
- Error messaging: communicate errors both visually and via text to aid screen readers.
- Keyboard support: confirm all controls are operable via keyboard navigation (tab, space, enter).

Adhering to these guidelines keeps the survey accessible and maintainable as new features are introduced.
