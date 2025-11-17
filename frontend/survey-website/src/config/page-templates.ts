import type { PageParameterMeta } from '../pagination/types.ts';
import type { TextPageProps } from '../pages/text-page.ts';

interface TemplateEntry<TProps> {
  type: string;
  resolve(parameters?: Record<string, unknown>): TProps;
}

interface ResolveTemplateResult<TProps> {
  props: TProps;
  meta: PageParameterMeta;
}

/**
 * In-memory registry of template resolvers keyed by "type:paramKey".
 */
const registry = new Map<string, TemplateEntry<unknown>>();

/**
 * Registers a template resolver for a specific page type and template key.
 */
function registerTemplate<TProps>(type: string, key: string, resolve: TemplateEntry<TProps>['resolve']): void {
  registry.set(`${type}:${key}`, { type, resolve } as TemplateEntry<unknown>);
}

/**
 * Resolves template props and metadata for the given page type and template key.
 */
export function resolvePageTemplate<TProps = unknown>(
  type: string,
  key: string,
  parameters?: Record<string, unknown>,
): ResolveTemplateResult<TProps> | undefined {
  const entry = registry.get(`${type}:${key}`) as TemplateEntry<TProps> | undefined;
  if (!entry) {
    return undefined;
  }

  const paramsCopy = cloneParameters(parameters);
  const props = entry.resolve(paramsCopy);
  const signature = buildSignature(key, paramsCopy);

  return {
    props,
    meta: {
      templateKey: key,
      parameters: paramsCopy,
      signature,
    },
  };
}

/**
 * Creates a defensive copy of template parameters to prevent downstream mutation.
 */
function cloneParameters(parameters?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!parameters) {
    return undefined;
  }
  try {
    return JSON.parse(JSON.stringify(parameters));
  } catch {
    const copy: Record<string, unknown> = {};
    Object.keys(parameters).forEach((key) => {
      copy[key] = parameters[key];
    });
    return copy;
  }
}

/**
 * Produces a stable signature string capturing the template key and parameter values.
 */
function buildSignature(key: string, parameters?: Record<string, unknown>): string {
  if (!parameters || Object.keys(parameters).length === 0) {
    return `template:${key}`;
  }

  const segments = Object.entries(parameters)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([paramKey, value]) => `${encodeURIComponent(paramKey)}=${encodeURIComponent(encodeValue(value))}`);

  return `template:${key}|${segments.join('&')}`;
}

/**
 * Encodes arbitrary parameter values into a string representation for signatures.
 */
function encodeValue(value: unknown): string {
  if (value === undefined) {
    return 'undefined';
  }
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

/**
 * Returns a trimmed string parameter or a fallback when the value is missing or empty.
 */
function pickString(parameters: Record<string, unknown> | undefined, key: string, fallback: string): string {
  const candidate = parameters?.[key];
  return typeof candidate === 'string' && candidate.trim().length > 0 ? candidate : fallback;
}

registerTemplate<TextPageProps>('text', 'welcome', (parameters) => ({
  title: pickString(parameters, 'title', 'Welcome to the Survey Prototype'),
  body: pickString(
    parameters,
    'body',
    'Thanks for helping us evaluate the upcoming perpetual voting study.',
  ),
  footnote: pickString(parameters, 'footnote', 'Click Next to begin.'),
}));

registerTemplate<TextPageProps>('text', 'overview', (parameters) => ({
  title: pickString(parameters, 'title', 'What To Expect'),
  body: pickString(
    parameters,
    'body',
    'This flow showcases the pagination framework. In production, these steps will include interactive questions and explanations.',
  ),
  footnote: pickString(parameters, 'footnote', 'Use Back if you would like to review previous steps.'),
}));

registerTemplate<TextPageProps>('text', 'closing', (parameters) => ({
  title: pickString(parameters, 'title', 'You Made It!'),
  body: pickString(parameters, 'body', 'This is the final placeholder page. Selecting Submit will complete the flow.'),
  footnote: pickString(parameters, 'footnote', 'All steps are now complete.'),
}));
