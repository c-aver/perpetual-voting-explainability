import { fallbackSurveyConfig } from './fallback.ts';
import type {
  DirectionSetting,
  LoadedSurveyConfig,
  QuestionnairePropsConfig,
  ResolvedSurveySettings,
  SurveyConfig,
  SurveyPageConfig,
  SurveySettings,
  TextDirection,
} from './types.ts';
import type { PageDescriptor } from '../pagination/types.ts';
import type { QuestionDescriptor } from '../pages/questionnaire/question-types.ts';

const DEFAULT_CONFIG_PATH = 'config/survey.json';
const DEFAULT_RTL_LOCALES = ['ar', 'fa', 'he', 'ur'];

export interface LoadSurveyConfigOptions {
  configPath?: string;
  fetchImpl?: typeof fetch;
  language?: string;
  searchParams?: URLSearchParams;
}

export async function loadSurveyConfig(
  options: LoadSurveyConfigOptions = {},
): Promise<LoadedSurveyConfig> {
  const fetcher = options.fetchImpl ?? globalThis.fetch?.bind(globalThis);

  const searchParams = options.searchParams
    ?? (typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : undefined);

  const configOverride = searchParams?.get('config') ?? undefined;
  const languageParam = searchParams?.get('lang')?.trim();
  const languageOverride = languageParam && languageParam.length > 0 ? languageParam : options.language;
  const configPath = configOverride ?? options.configPath ?? DEFAULT_CONFIG_PATH;

  const { config, baseUrl, source } = await fetchSurveyConfig(configPath, fetcher);

  const resolvedPages = await resolvePageConfigs(config.pages, fetcher, baseUrl);
  const orderedPages = await applyBackendOrdering(resolvedPages, config.settings, fetcher, baseUrl);

  const settings = resolveSettings(config.settings, languageOverride);

  return {
    pages: orderedPages,
    settings,
    source,
    meta: config.meta,
  };
}

async function fetchSurveyConfig(
  path: string,
  fetcher?: typeof fetch,
): Promise<{ config: SurveyConfig; baseUrl?: URL; source: 'remote' | 'fallback' }> {
  const fallbackResult = {
    config: fallbackSurveyConfig,
    baseUrl: getDefaultBaseUrl(),
    source: 'fallback' as const,
  };

  if (!fetcher) {
    return fallbackResult;
  }

  const resolvedUrl = resolveUrl(path);
  if (!resolvedUrl) {
    return fallbackResult;
  }

  try {
    const response = await fetcher(resolvedUrl.toString(), { cache: 'no-store' });
    if (!response.ok) {
      console.warn(`Survey config request failed with status ${response.status}. Using fallback.`);
      return fallbackResult;
    }

    const raw = (await response.json()) as SurveyConfig;
    if (!raw || !Array.isArray(raw.pages)) {
      console.warn('Survey config response missing "pages" array. Using fallback configuration.');
      return fallbackResult;
    }

    return {
      config: raw,
      baseUrl: new URL('.', resolvedUrl),
      source: 'remote',
    };
  } catch (error) {
    console.warn('Failed to load survey config. Falling back to embedded configuration.', error);
    return fallbackResult;
  }
}

async function resolvePageConfigs(
  pages: SurveyPageConfig[],
  fetcher?: typeof fetch,
  baseUrl?: URL,
): Promise<PageDescriptor[]> {
  if (!pages || pages.length === 0) {
    return fallbackSurveyConfig.pages as PageDescriptor[];
  }

  const resolved: PageDescriptor[] = [];

  for (const descriptor of pages) {
    const props = descriptor.props ? { ...descriptor.props } : undefined;
    const copy: PageDescriptor = {
      ...descriptor,
      props,
    };

    if (descriptor.type === 'questionnaire') {
      const questionnaireProps = props as QuestionnairePropsConfig | undefined;
      if (questionnaireProps) {
        const questions = await resolveQuestions(questionnaireProps, fetcher, baseUrl);
        questionnaireProps.questions = questions ?? [];
        delete questionnaireProps.questionSource;
        copy.props = questionnaireProps as unknown as Record<string, unknown>;
      }
    }

    resolved.push(copy);
  }

  return resolved;
}

async function resolveQuestions(
  props: QuestionnairePropsConfig,
  fetcher?: typeof fetch,
  baseUrl?: URL,
): Promise<QuestionDescriptor[] | undefined> {
  if (Array.isArray(props.questions) && props.questions.length > 0) {
    return props.questions;
  }

  const source = props.questionSource;
  if (!source || !fetcher) {
    return props.questions;
  }

  const resolvedUrl = resolveChildUrl(source, baseUrl);
  if (!resolvedUrl) {
    return props.questions;
  }

  try {
    const response = await fetcher(resolvedUrl.toString(), { cache: 'no-store' });
    if (!response.ok) {
      console.warn(`Question source request failed (${response.status}). Falling back to inline questions.`);
      return props.questions;
    }

    const payload = await response.json();
    if (Array.isArray(payload)) {
      return payload as QuestionDescriptor[];
    }

    const payloadObject = payload as Record<string, unknown>;
    const questionsCandidate = payloadObject.questions;
    if (Array.isArray(questionsCandidate)) {
      return questionsCandidate as QuestionDescriptor[];
    }

    console.warn('Question source payload missing "questions" array.');
    return props.questions;
  } catch (error) {
    console.warn('Failed to load question source. Using inline questions.', error);
    return props.questions;
  }
}

async function applyBackendOrdering(
  pages: PageDescriptor[],
  settings?: SurveySettings,
  fetcher?: typeof fetch,
  baseUrl?: URL,
): Promise<PageDescriptor[]> {
  const source = settings?.pageSequenceSource;
  if (!source || !fetcher) {
    return pages;
  }

  const resolvedUrl = resolveChildUrl(source, baseUrl);
  if (!resolvedUrl) {
    return pages;
  }

  try {
    const response = await fetcher(resolvedUrl.toString(), { cache: 'no-store' });
    if (!response.ok) {
      console.warn(`Page ordering request failed (${response.status}). Using default order.`);
      return pages;
    }

    const payload = await response.json();
    const payloadRecord = (payload ?? {}) as Record<string, unknown>;
    const pageIds = Array.isArray(payloadRecord.pageIds)
      ? (payloadRecord.pageIds as string[])
      : Array.isArray(payload)
        ? (payload as string[])
        : undefined;

    if (!pageIds || pageIds.length === 0) {
      return pages;
    }

    const included = new Set<PageDescriptor>();
    const ordered: PageDescriptor[] = [];

    for (const id of pageIds) {
      const page = pages.find((descriptor) => descriptor.id === id);
      if (page && !included.has(page)) {
        ordered.push(page);
        included.add(page);
      }
    }

    for (const page of pages) {
      if (!included.has(page)) {
        ordered.push(page);
        included.add(page);
      }
    }

    return ordered;
  } catch (error) {
    console.warn('Failed to load backend page ordering. Using default order.', error);
    return pages;
  }
}

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

function resolveUrl(path: string): URL | undefined {
  if (!path) {
    return undefined;
  }

  try {
    if (/^https?:/i.test(path)) {
      return new URL(path);
    }

    if (typeof window !== 'undefined') {
      const base = new URL('.', window.location.href);
      return new URL(path, base);
    }
  } catch (error) {
    console.warn('Unable to resolve survey config URL.', error);
  }

  return undefined;
}

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

function getDefaultBaseUrl(): URL | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    return new URL('.', window.location.href);
  } catch {
    return undefined;
  }
}
