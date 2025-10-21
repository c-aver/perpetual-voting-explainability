# Pagination & Survey Flow PRD

## Background
- A reusable pagination scaffold now powers the survey flow (`Paginator`, `SurveyShell`, typed descriptors) and replaces the previous single-page prototype.
- Text display, autosaving text input, and questionnaire pages are live, with data persisted per step and resumable across sessions via `localStorage`.
- The system supports progress tracking, navigation lifecycle hooks, and data capture per page, with completion payloads ready for submission to downstream services.
- The next phase focuses on deepening configurability (external question definitions, server-driven ordering), broadening language support (RTL layouts), and preparing static-site deployment (e.g., GitHub Pages).

## Goals
- Expand survey configuration so page/question descriptors can be loaded from external JSON files and, later, backend APIs.
- Support right-to-left (RTL) languages across every view, including navigation controls, page shells, and question components.
- Allow surveys to declare a preferred language/locale in configuration so direction, copy, and formatting can be aligned without relying solely on browser detection.
- Preserve client-side only execution with a static-site build compatible with GitHub Pages (relative paths, hash-friendly routing, HTTPS API calls).
- Keep the page registry extensible, allowing additional question/page types without rewriting the flow engine.
- Capture typed responses in a structure ready for submission to backend services and future analytics.

## Non-Goals
- Persisting survey responses to remote storage (handled separately).
- Implementing complex routing or URL-driven navigation; the scope is in-memory pagination inside the single-page app shell.
- Designing the full visual styling; only minimal structure/components to demonstrate pagination controls.

## User Stories
1. As a participant, I can move through a set of survey pages sequentially using Next/Back controls.
2. As a participant, I can see which step I am on and how many steps remain.
3. As a researcher, I can configure the page sequence declaratively without altering page classes.
4. As a developer, I can add a new page type (e.g., chart page) by extending the base class and registering it with the flow manager.

## Functional Requirements
- **Existing Platform**: Retain current paginator features (page model, shell UI, validation pipeline, data persistence, registry-based instantiation).
- **Text Input Page**: Provide a large text field capturing arbitrary prose; props include prompt, placeholder, character guidance, optional required flag, and autosave key.
- **Questionnaire Page**: Render a list of configurable questions, each declaring id, label, type (`select`, `numeric`, `shortText`, extensible), validation metadata, and answer options where applicable.
- **Question Type Extensibility**: Question descriptors include a `variant` key mapping to renderer/validator strategies so new variants (e.g., Likert, checkbox) can be added without refactoring the base questionnaire page.
- **Data Persistence**: Pages emit structured responses keyed by page/question id; paginator persists progress locally and surfaces completion payloads.
- **Configuration Loading**: Allow page/question descriptors to be provided via static JSON files bundled with the site, with hooks to upgrade to remote API fetching.
- **Language Configuration**: Support a `language` (or locale) property in `survey.json` that informs loader defaults (direction, formatting) instead of only checking browser preferences.
- **Backend-Controlled Ordering (Future-Proofing)**: Architect descriptor loading so question inclusion/order can be overridden by backend payloads without redeploying the frontend.
- **RTL Support**: Provide toggles or auto-detection for RTL languages, mirroring layouts, aligning typography, and ensuring controls remain accessible.
- **Reset Control**: Surface a persistent reset button that opens a confirmation dialog and, when accepted, clears local progress/autosave data and restarts the survey.
- **Accessibility**: Inputs expose labels/aria attributes; focus management respects pagination navigation; support keyboard navigation in RTL context.

## Non-Functional Requirements
- Keep bundle size changes minimal (<10% increase) and avoid runtime dependencies beyond existing toolchain.
- Ensure TypeScript types cover page descriptors, controller APIs, events, and external configuration schemas.
- Provide unit tests for controller logic and integration tests for simple flow in jsdom environment.
- Guarantee the site builds to static assets only (HTML/JS/CSS) with relative paths, hash-friendly navigation, and HTTPS API calls so it can deploy on GitHub Pages.
- Ensure all UI components respect RTL rendering and typography guidelines without duplicate code paths.

## UX Notes
- Minimal responsive layout; reuse existing CSS scaffolding.
- Keyboard accessibility: Enter triggers Next, Shift+Enter or custom key triggers Back; controls expose ARIA labels.
- Error messaging area for validation failures.
- Always-visible reset control (e.g., secondary button) prompts for confirmation before clearing progress; confirmation dialog supports keyboard focus management and screen readers.
- RTL mode mirrors layout, keeps progress indicators intuitive (e.g., step count aligning with reading direction), and retains consistent spacing.

## Technical Approach
1. **Implemented (Complete)**: Core paginator, survey shell, text page, text input page with autosave, questionnaire page with variant registry, and unit tests.
2. **Configuration Loader**:
   - Define JSON schema for surveys (pages array, metadata, question pools).
   - Add lightweight loader module that fetches local JSON (via `fetch` against relative path) and hydrates descriptors.
   - Support optional `language` override to seed direction/locale logic.
   - Provide fallback to embedded descriptors if config fails.
3. **Static Site Compliance**:
   - Ensure all fetches use relative URLs compatible with GitHub Pages.
   - Introduce hash-based routing guard (if needed) so deep links do not 404.
   - Document deployment steps (vite `base` option, asset path adjustments).
4. **RTL Enablement**:
   - Add direction toggle/detection (e.g., via config or browser locale).
   - Apply logical CSS properties (`margin-inline`, `padding-inline`, `text-align` adjustments) and set `[dir="rtl"]` styling overrides.
   - Validate component mirroring (progress indicator, nav buttons order, question alignment).
5. **Persistent Reset Control**:
   - Introduce a reset button in the shell visible on every step.
   - Implement confirmation dialog (modal or inline) that traps focus, describes consequences, and respects RTL.
   - On confirmation, clear persisted state (paginator storage, page autosaves) and restart at the first page.
6. **External Question Sources**:
   - Allow questionnaire descriptors to be split across files (e.g., `questions/profile.json`).
   - Build mapping utilities so backend-delivered order/inclusion metadata can override local defaults.
   - Implement caching/validation for remote payloads (HTTPS) while keeping client-only execution.
7. **Future Backend Ordering**:
   - Define interface for backend response (e.g., `GET /survey/:id/config`) that returns question IDs and order.
   - Layer merging logic to reconcile backend lists with local registry (unknown ids ignored with warnings).
8. **Testing & QA**:
   - Expand Vitest coverage for config loading, RTL layout toggles, and backend override merging.
   - Add visual regression checklist/manual QA for RTL and static-site deployment.
   - Verify reset confirmation flow (happy path, cancellation) and ensure autosave keys are cleared.

## Deliverables
- Documented JSON configuration schema with example files and loaders.
- RTL-ready CSS/JS updates with automated tests or manual QA checklist.
- Updated survey bootstrap (`main.ts`) demonstrating config-driven page loading and RTL toggle.
- Reset control implementation with confirmation handling and documentation for data clearing behavior.
- Static-site deployment guide (GitHub Pages) including build config, relative paths, and hash routing strategy.
- Extended unit/integration tests for config loader, RTL toggling, and backend override utilities.
- Updated documentation covering how to add question variants, plug in external config, and consume collected data.

## Open Questions and their answers
- Should we persist interim responses locally (e.g., localStorage) to guard against browser refresh? Yes (implemented).
- Do we need per-question analytics (time to answer, changes)? Not currently.
- What format does the backend expect for submission (flat map vs nested objects)? Should have support for nested objects (current approach nests by `outputKey`).
- Who owns RTL locale detection (browser vs survey config)? TBD — proposal: default to config flag with browser fallback.
- Should the config `language` also control number/date formatting beyond direction? TBD — coordinate with analytics consumers.
- How frequently will backend question ordering change, and do we need versioning/rollback mechanisms? TBD with research team.
- Do we require offline fallback for config files (e.g., embed last known config)? Pending decision.

## Milestones & Timeline
1. **Config & Static-Site Foundations (Day 1-2)**: Finalize JSON schema, implement loader (including `language` override), adjust Vite config for relative assets, document GitHub Pages deployment considerations.
2. **RTL & Locale Implementation (Day 3-4)**: Add direction toggles, update CSS/DOM utilities, wire language override into loader, run accessibility/UX review in RTL.
3. **Reset Control Delivery (Day 5)**: Build confirmation UX, integrate storage clearing, add tests.
4. **Backend Override Preparation (Day 6)**: Implement merging logic, mock API integration, expand tests.
5. **Documentation & QA (Day 7)**: Update README/PRD snippets, craft deployment checklist, verify hash routing, confirm reset flow, run regression tests (LTR/RTL).
