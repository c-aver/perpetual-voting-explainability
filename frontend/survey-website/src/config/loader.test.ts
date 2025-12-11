// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadSurveyConfig } from './loader.ts';
import { fallbackSurveyConfig } from './fallback.ts';
import type { InstancePagePropsConfig, SurveyPageConfig } from './types.ts';
import { resolveQuestionOrderEndpoint } from './api-endpoints.ts';

describe('loadSurveyConfig', () => {
  let pagesSnapshot: SurveyPageConfig[];
  let settingsSnapshot: typeof fallbackSurveyConfig.settings;
  let originalFetch: typeof fetch | undefined;
  const defaultOrderingEndpoint = resolveQuestionOrderEndpoint();

  beforeEach(() => {
    pagesSnapshot = [...fallbackSurveyConfig.pages];
    settingsSnapshot = { ...fallbackSurveyConfig.settings };
    originalFetch = globalThis.fetch;
    globalThis.fetch = createDefaultOrderingFetch(defaultOrderingEndpoint);
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  afterEach(() => {
    fallbackSurveyConfig.pages = pagesSnapshot;
    fallbackSurveyConfig.settings = { ...settingsSnapshot };
    if (originalFetch)
      globalThis.fetch = originalFetch;
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  it('returns the static config with localized copy metadata', async () => {
    const result = await loadSurveyConfig();

    expect(result.source).toBe('static');
    expect(result.pages.length).toBeGreaterThan(0);
    expect(result.copy.locale).toBe('he-IL');
    expect(result.settings.language).toBe('he-IL');

    const intro = result.pages.find((page) => page.id === 'intro');
    expect(intro).toBeDefined();
  });

  it('honours explicit language overrides when provided', async () => {
    const searchParams = new URLSearchParams({ lang: 'en-US' });
    const result = await loadSurveyConfig({ searchParams });

    expect(result.settings.language).toBe('en-US');
    expect(result.settings.direction).toBe('ltr');
    expect(result.copy.locale).toBe('en-US');
  });

  it('applies backend ordering when the endpoint returns IDs', async () => {
    const orderingUrl = 'https://example.test/order.json';
    fallbackSurveyConfig.settings = {
      ...settingsSnapshot,
      pageSequenceSource: orderingUrl,
    };

    const orderingPayload = {
      pageIds: ['thank-you', 'intro'],
    };

    const fetchImpl = vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
      if (url === orderingUrl) {
        return new Response(JSON.stringify(orderingPayload), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response('Not Found', { status: 404 });
    });

    const result = await loadSurveyConfig({ fetchImpl });
    const ids = result.pages.map((page) => page.id);
    expect(ids[0]).toBe('thank-you');
    expect(ids[1]).toBe('intro');
  });

  it('falls back to curated instance ordering when the endpoint fails', async () => {
    const orderingUrl = 'https://example.test/broken-order.json';
    fallbackSurveyConfig.settings = {
      ...settingsSnapshot,
      pageSequenceSource: orderingUrl,
    };

    const fetchImpl = vi.fn(async () => new Response('nope', { status: 500 }));

    const result = await loadSurveyConfig({ fetchImpl });
    expect(result.pages).toHaveLength(11);
    expect(result.pages.slice(0, 5).map((page) => page.id)).toEqual([
      'intro',
      'demographic',
      'perpetual-demo',
      'knowledge-check',
      'overview',
    ]);
    expect(result.pages.slice(-2).map((page) => page.id)).toEqual(['feedback', 'thank-you']);
    const randomizedSection = result.pages.slice(5, -2);
    randomizedSection.forEach((page, index) => {
      expect(page.id?.startsWith('instance-')).toBe(true);
      const props = page.props as InstancePagePropsConfig | undefined;
      expect(props?.questionNumber).toBe(index + 1);
    });
  });

  it('uses curated fallback ordering when no backend ordering source is configured', async () => {
    fallbackSurveyConfig.settings = {
      ...settingsSnapshot,
      pageSequenceSource: undefined,
    };

    const result = await loadSurveyConfig();
    expect(result.pages).toHaveLength(11);
    expect(result.pages.slice(0, 5).map((page) => page.id)).toEqual([
      'intro',
      'demographic',
      'perpetual-demo',
      'knowledge-check',
      'overview',
    ]);
    expect(result.pages.slice(-2).map((page) => page.id)).toEqual(['feedback', 'thank-you']);
    result.pages.slice(5, -2).forEach((page) => {
      expect(page.id?.startsWith('instance-')).toBe(true);
    });
  });

  it('reuses persisted ordering when fallback ordering is triggered', async () => {
    const orderingUrl = 'https://example.test/offline-order.json';
    fallbackSurveyConfig.settings = {
      ...settingsSnapshot,
      pageSequenceSource: orderingUrl,
    };

    const storageKey = fallbackSurveyConfig.settings.storageKey;
    if (!storageKey) {
      throw new Error('Test requires storageKey');
    }
    const storedOrder = [
      'intro',
      'demographic',
      'perpetual-demo',
      'knowledge-check',
      'overview',
      'instance-simple-approval-none',
      'instance-complicated-unit_cost-mechanical',
      'instance-few_rounds_1-equal_shares-instance_based',
      'instance-few_rounds_2-phragmen-llm_generated',
      'feedback',
      'thank-you',
    ];

    localStorage.setItem(storageKey, JSON.stringify({
      version: 'v9',
      currentIndex: 0,
      dataByKey: {},
      pageOrder: storedOrder,
    }));

    const fetchImpl = vi.fn(async () => {
      throw new Error('fetch should not be called when order is persisted');
    });

    const result = await loadSurveyConfig({ fetchImpl });
    const ids = result.pages.map((page) => page.id);
    expect(ids).toEqual(storedOrder);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('persists generated fallback ordering for future reloads', async () => {
    const orderingUrl = 'https://example.test/persist-order.json';
    fallbackSurveyConfig.settings = {
      ...settingsSnapshot,
      pageSequenceSource: orderingUrl,
    };

    const fetchImpl = vi.fn(async () => new Response('nope', { status: 500 }));

    const result = await loadSurveyConfig({ fetchImpl });
    const storageKey = fallbackSurveyConfig.settings.storageKey;
    if (!storageKey) {
      throw new Error('Test requires storageKey');
    }
    const snapshot = localStorage.getItem(storageKey);
    expect(snapshot).not.toBeNull();
    const parsed = snapshot ? JSON.parse(snapshot) as { pageOrder?: string[] } : null;
    expect(parsed?.pageOrder).toEqual(result.pages.map((page) => page.id));
  });

  it('reuses persisted ordering even when no backend ordering source exists', async () => {
    fallbackSurveyConfig.settings = {
      ...settingsSnapshot,
      pageSequenceSource: undefined,
    };

    const storageKey = fallbackSurveyConfig.settings.storageKey;
    if (!storageKey) {
      throw new Error('Test requires storageKey');
    }

    const storedOrder = [
      'intro',
      'demographic',
      'perpetual-demo',
      'knowledge-check',
      'overview',
      'instance-simple-approval-instance_based',
      'instance-complicated-unit_cost-none',
      'instance-few_rounds_1-approval-mechanical',
      'instance-few_rounds_2-phragmen-llm_generated',
      'feedback',
      'thank-you',
    ];

    localStorage.setItem(storageKey, JSON.stringify({
      version: 'v2',
      currentIndex: 0,
      dataByKey: {},
      pageOrder: storedOrder,
    }));

    const result = await loadSurveyConfig();
    const ids = result.pages.map((page) => page.id);
    expect(ids).toEqual(storedOrder);
  });

});

function createDefaultOrderingFetch(orderingEndpoint: string): typeof fetch {
  const mock = vi.fn(async (input: RequestInfo | URL) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    if (url === orderingEndpoint) {
      const pageIds = fallbackSurveyConfig.pages
        .map((page) => page.id)
        .filter((id): id is string => Boolean(id));
      return new Response(JSON.stringify({ pageIds }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response('Not Found', { status: 404 });
  });
  return mock as unknown as typeof fetch;
}
