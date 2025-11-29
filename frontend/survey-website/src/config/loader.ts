import { fallbackSurveyConfig } from './fallback.ts';
import { resolveCopyCatalog } from './copy.ts';
import type {
  DirectionSetting,
  LoadedSurveyConfig,
  QuestionnairePropsConfig,
  ResolvedSurveySettings,
  SurveyPageConfig,
  SurveySettings,
  TextDirection,
} from './types.ts';
import type { PageDescriptor } from '../pagination/types.ts';
import { resolvePageTemplate } from './page-templates.ts';

const DEFAULT_RTL_LOCALES = ['ar', 'fa', 'he', 'ur'];
const ORDERING_PREFIX_PAGE_IDS = ['intro', 'demographic', 'overview', 'perpetual-demo'];
const ORDERING_POSTFIX_PAGE_IDS = ['feedback', 'thank-you'];
const RANDOMIZED_INSTANCE_COUNT = 4;
const INSTANCE_ID_POOL = ['simple', 'complicated', 'few_rounds', 'few_voters'];
const RULE_ID_POOL = ['approval', 'unit_cost', 'equal_shares', 'phragmen'];
const EXPLANATION_ID_POOL = ['none', 'mechanical', 'instance_based', 'llm_generated'];

export interface LoadSurveyConfigOptions {
  fetchImpl?: typeof fetch;
  language?: string;
  searchParams?: URLSearchParams;
}

/**
 * Loads the embedded survey configuration, normalizes descriptors, applies optional
 * backend ordering, and resolves runtime settings.
 */
export async function loadSurveyConfig(
  options: LoadSurveyConfigOptions = {},
): Promise<LoadedSurveyConfig> {
  const fetcher = options.fetchImpl ?? globalThis.fetch?.bind(globalThis);

  const searchParams = options.searchParams
    ?? (typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : undefined);

  const languageParam = searchParams?.get('lang')?.trim();
  const languageOverride = languageParam && languageParam.length > 0 ? languageParam : options.language;
  const config = fallbackSurveyConfig;

  const resolvedPages = await resolvePageConfigs(config.pages);
  const storageKey = config.settings?.storageKey;
  const storageVersion = config.settings?.storageVersion;
  const persistedOrder = readPersistedPageOrder(storageKey);
  const persistedPages = resolvePersistedOrder(resolvedPages, persistedOrder);
  const orderedPages = persistedPages
    ?? await applyBackendOrdering(resolvedPages, config.settings, fetcher);
  persistPageOrderSnapshot(storageKey, storageVersion, orderedPages);

  const settings = resolveSettings(config.settings, languageOverride);
  const copy = resolveCopyCatalog(settings.language);

  return {
    pages: orderedPages,
    settings,
    source: 'static',
    meta: config.meta,
    copy,
  };
}

/**
 * Clones and normalizes page descriptors, applying template resolution and questionnaire
 * question loading when necessary.
 */
async function resolvePageConfigs(
  pages: SurveyPageConfig[],
): Promise<PageDescriptor[]> {
  const sourcePages = !pages || pages.length === 0 ? fallbackSurveyConfig.pages : pages;
  const resolved: PageDescriptor[] = [];

  for (const descriptor of sourcePages) {
    const props = descriptor.props ? { ...descriptor.props } : undefined;
    const copy: PageDescriptor = {
      ...descriptor,
      props,
    };

    if (descriptor.paramKey) {
      if (props && Object.keys(props).length > 0) {
        throw new Error(
          `Page "${descriptor.id ?? descriptor.type}" cannot specify both "props" and "paramKey".`,
        );
      }

      const templateResult = resolvePageTemplate(descriptor.type, descriptor.paramKey, descriptor.parameters);
      if (!templateResult) {
        throw new Error(
          `Unknown template key "${descriptor.paramKey}" for page type "${descriptor.type}".`,
        );
      }

      copy.props = templateResult.props as Record<string, unknown>;
      copy.parameterMeta = templateResult.meta;
      copy.parameters = templateResult.meta.parameters;
    } else if (descriptor.parameters) {
      console.warn(
        `Page "${descriptor.id ?? descriptor.type}" provided parameters without paramKey; ignoring parameters.`,
      );
      copy.parameters = undefined;
    }

    if (descriptor.type === 'questionnaire') {
      const questionnaireProps = props as QuestionnairePropsConfig | undefined;
      if (questionnaireProps) {
        questionnaireProps.questions = Array.isArray(questionnaireProps.questions)
          ? questionnaireProps.questions
          : [];
        copy.props = questionnaireProps as unknown as Record<string, unknown>;
      }
    }

    resolved.push(copy);
  }

  return resolved;
}

/**
 * Applies backend-provided page ordering instructions when they are available; otherwise,
 * preserves the original descriptor sequence.
 */
async function applyBackendOrdering(
  pages: PageDescriptor[],
  settings?: SurveySettings,
  fetcher?: typeof fetch,
): Promise<PageDescriptor[]> {
  const source = settings?.pageSequenceSource;
  if (!source) {
    return buildOrderingFailureFallback(pages);
  }

  if (!fetcher) {
    console.warn('Page ordering requested without a fetch implementation; using fallback.');
    return buildOrderingFailureFallback(pages);
  }

  const resolvedUrl = resolveChildUrl(source);
  if (!resolvedUrl) {
        console.warn('Unable to resolve page ordering URL; using fallback ordering.');
        return buildOrderingFailureFallback(pages);
  }

  try {
    const response = await fetcher(resolvedUrl.toString(), { cache: 'no-store' });
    if (!response.ok) {
      console.warn(`Page ordering request failed (${response.status}). Using fallback ordering.`);
      return buildOrderingFailureFallback(pages);
    }

    const payload = await response.json();
    const payloadRecord = (payload ?? {}) as Record<string, unknown>;
    const pageIds = Array.isArray(payloadRecord.pageIds)
      ? (payloadRecord.pageIds as string[])
      : Array.isArray(payload)
        ? (payload as string[])
        : undefined;

    if (!pageIds || pageIds.length === 0) {
      console.warn('Page ordering payload missing "pageIds"; using fallback ordering.');
      return buildOrderingFailureFallback(pages);
    }

    const ordered: PageDescriptor[] = [];

    for (const id of pageIds) {
      const page = pages.find((descriptor) => descriptor.id === id);
      if (page) {
        ordered.push(page);
      }
    }

    return ordered;
  } catch (error) {
    console.warn('Failed to load backend page ordering. Using fallback ordering.', error);
    return buildOrderingFailureFallback(pages);
  }
}

/**
 * Merges runtime settings with defaults, resolving text direction and language overrides.
 */
function resolveSettings(
  settings: SurveySettings | undefined,
  languageOverride?: string,
): ResolvedSurveySettings {
  const language = languageOverride ?? settings?.language;
  const direction = resolveDirection(
    settings?.direction,
    settings?.defaultDirection,
    settings?.rtlLocales,
    language,
  );

  return {
    showProgress: settings?.showProgress ?? true,
    storageKey: settings?.storageKey,
    storageVersion: settings?.storageVersion,
    direction,
    autosaveKeysToClear: settings?.autosaveKeysToClear ?? [],
    language,
  };
}

/**
 * Resolves the effective text direction based on explicit configuration, default settings,
 * and language-specific RTL overrides.
 */
function resolveDirection(
  directionSetting: DirectionSetting | undefined,
  fallbackDirection: TextDirection | undefined,
  rtlLocales: string[] | undefined,
  languageOverride?: string,
): TextDirection {
  if (directionSetting === 'ltr' || directionSetting === 'rtl') {
    return directionSetting;
  }

  const defaultDirection = fallbackDirection ?? 'ltr';

  if (directionSetting !== 'auto') {
    return defaultDirection;
  }

  const locales = new Set((rtlLocales ?? DEFAULT_RTL_LOCALES).map((locale) => locale.toLowerCase()));
  const languageTag = (languageOverride
    ?? (typeof window !== 'undefined' ? window.navigator.language : undefined)
    ?? 'en')
    .toLowerCase();

  if (locales.has(languageTag)) {
    return 'rtl';
  }

  const primary = languageTag.split('-')[0];
  return locales.has(primary) ? 'rtl' : defaultDirection;
}

/**
 * Resolves a resource path relative to the configuration base URL or the current location.
 */
function resolveChildUrl(path: string, baseUrl?: URL): URL | undefined {
  try {
    if (/^https?:/i.test(path)) {
      return new URL(path);
    }

    if (baseUrl) {
      return new URL(path, baseUrl);
    }

    if (typeof window !== 'undefined') {
      const base = new URL('.', window.location.href);
      return new URL(path, base);
    }
  } catch (error) {
    console.warn('Unable to resolve relative config URL.', error);
  }

  return undefined;
}

function buildOrderingFailureFallback(pages: PageDescriptor[]): PageDescriptor[] {
  console.warn('Using order failure fallback');
  if (pages.length === 0) {
    return [];
  }

  const prefix = collectPagesById(pages, ORDERING_PREFIX_PAGE_IDS);
  const randomizedIds = generateInstancePageIds(RANDOMIZED_INSTANCE_COUNT);
  const randomized = collectPagesById(pages, randomizedIds);
  const postfix = collectPagesById(pages, ORDERING_POSTFIX_PAGE_IDS);

  const combined = [...prefix, ...randomized, ...postfix];

  if (combined.length > 0) {
    return combined;
  }

  return [pages[0]];
}

function resolvePersistedOrder(
  pages: PageDescriptor[],
  persistedOrder?: string[],
): PageDescriptor[] | undefined {
  if (!persistedOrder || persistedOrder.length === 0) {
    return undefined;
  }

  const persistedPages = collectPagesById(pages, persistedOrder);
  const hasAllEntries = persistedPages.length === persistedOrder.length;
  const hasInstancePage = persistedPages.some((page) => page.id?.startsWith('instance-'));
  return hasAllEntries && hasInstancePage ? persistedPages : undefined;
}

function collectPagesById(pages: PageDescriptor[], ids: string[]): PageDescriptor[] {
  return ids
    .map((id) => pages.find((page) => page.id === id))
    .filter((page): page is PageDescriptor => Boolean(page));
}

interface PersistedPaginatorStateSnapshot {
  version?: string;
  currentIndex?: number;
  dataByKey?: Record<string, unknown>;
  durationsByKey?: Record<string, number>;
  completed?: boolean;
  pageOrder?: string[];
  [key: string]: unknown;
}

function readPersistedPageOrder(storageKey?: string): string[] | undefined {
  if (!storageKey || typeof window === 'undefined' || !window.localStorage) {
    return undefined;
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return undefined;
    }

    const parsed = JSON.parse(raw) as PersistedPaginatorStateSnapshot;
    if (!parsed || !Array.isArray(parsed.pageOrder)) {
      return undefined;
    }

    const list = parsed.pageOrder.filter((value): value is string => typeof value === 'string' && value.length > 0);
    return list.length > 0 ? list : undefined;
  } catch (error) {
    console.warn('Failed to read persisted page order.', error);
    return undefined;
  }
}

function persistPageOrderSnapshot(
  storageKey: string | undefined,
  storageVersion: string | undefined,
  pages: PageDescriptor[] | undefined,
): void {
  if (!storageKey || typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  if (!pages || pages.length === 0) {
    return;
  }

  const order = pages
    .map((page) => page.id)
    .filter((id): id is string => typeof id === 'string' && id.length > 0);

  if (order.length === 0) {
    return;
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) as PersistedPaginatorStateSnapshot : undefined;
    const snapshot: PersistedPaginatorStateSnapshot = typeof parsed === 'object' && parsed !== null
      ? { ...parsed }
      : {};

    snapshot.version = typeof snapshot.version === 'string'
      ? snapshot.version
      : storageVersion ?? 'v1';
    snapshot.pageOrder = order;

    window.localStorage.setItem(storageKey, JSON.stringify(snapshot));
  } catch (error) {
    console.warn('Failed to persist page order snapshot.', error);
  }
}

function generateInstancePageIds(count: number): string[] {
  if (count <= 0) {
    return [];
  }

  const instances = shuffledSequence(INSTANCE_ID_POOL, count);
  const rules = shuffledSequence(RULE_ID_POOL, count);
  const explanations = shuffledSequence(EXPLANATION_ID_POOL, count);

  return Array.from({ length: count }, (_, index) => (
    `instance-${instances[index]}-${rules[index]}-${explanations[index]}`
  ));
}

function shuffledSequence(options: string[], count: number): string[] {
  if (options.length === 0 || count <= 0) {
    return [];
  }

  const pool = [...options];
  const result: string[] = [];

  while (result.length < count) {
    shuffleInPlace(pool);
    result.push(...pool);
  }

  return result.slice(0, count);
}

function shuffleInPlace<T>(values: T[]): void {
  for (let index = values.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [values[index], values[swapIndex]] = [values[swapIndex], values[index]];
  }
}
