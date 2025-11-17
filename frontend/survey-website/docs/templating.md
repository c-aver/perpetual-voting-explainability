# Template & Parameter System

Parameterization lets survey designers reuse page structures while customizing content. The implementation lives in `src/config/page-templates.ts` with supporting types in `src/pagination/types.ts`.

## Concepts

- **Template Key (`paramKey`)** — string identifier referencing a registered template.
- **Parameters** — arbitrary key/value map passed to the template resolver. Useful for injecting localized copy, user-specific data, or variant-specific options.
- **Parameter Metadata** — immutable summary of the template resolution (template key, sanitized parameters, signature) saved on the descriptor.

## Registration

Templates are registered at module load time:

```ts
registerTemplate<TextPageProps>('text', 'welcome', (parameters) => ({
  title: pickString(parameters, 'title', 'Welcome to the Survey Prototype'),
  body: pickString(parameters, 'body', 'Thanks for helping us evaluate the upcoming perpetual voting study.'),
  footnote: pickString(parameters, 'footnote', 'Click Next to begin.'),
}));
```

- `type` corresponds to the `PageDescriptor.type` (e.g., `text`).
- `key` is the `paramKey` provided by configuration.
- `resolve` receives a defensively cloned `parameters` object.

## Resolution Lifecycle

1. **Descriptor Normalization** — `loadSurveyConfig` checks each page descriptor.
2. If `paramKey` is provided, `props` must be omitted. The loader throws an error if both are present.
3. `resolvePageTemplate(type, paramKey, parameters)` is invoked.
4. Resolved `props` replace the descriptor’s props, and the associated `parameterMeta` is stored on the descriptor.
5. The paginator copies `parameterMeta` into the completion payload so submissions include the exact template variant shown to the user.

## Signature Format

Signatures provide a stable identifier for analytics:

```
template:<key>|param1=value1&param2=value2
```

- Parameters are sorted alphabetically and URI-encoded.
- Complex values fall back to JSON stringification.

## Extending Templates

1. Import the page prop type relevant to the template.
2. Call `registerTemplate` with a new key and resolver.
3. Reference the `paramKey` in configuration.
4. Update tests in `loader.test.ts` if the new template influences resolution logic.

## Use Cases

- **Localized copy** — supply different `title` or `body` text for regional variants without duplicating entire descriptors.
- **User personalization** — pass first names or other dynamic data from upstream systems (once runtime parameter injection is implemented).
- **Experimentation** — toggle copy or layout variants by changing `paramKey` in configuration downloads.

## Future Enhancements

- **Async Templates** — support resolving parameters from remote services during load (e.g., fetch user profiles).
- **Compiled Signatures** — hash signatures to shorter IDs if storing verbose parameter combinations becomes unwieldy.
- **Authoring Tools** — expose templates and parameters in CMS interfaces so non-developers can manage copy variants.

By centralizing this logic, the frontend keeps templated content declarative and auditable, making it easier to roll out new messaging without code changes.
