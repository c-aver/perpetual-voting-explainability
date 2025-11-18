// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadSurveyConfig } from './loader.ts';
import { fallbackSurveyConfig } from './fallback.ts';
import type { SurveyPageConfig } from './types.ts';

describe('loadSurveyConfig', () => {
  let pagesSnapshot: SurveyPageConfig[];
  let settingsSnapshot: typeof fallbackSurveyConfig.settings;

  beforeEach(() => {
    pagesSnapshot = [...fallbackSurveyConfig.pages];
    settingsSnapshot = { ...fallbackSurveyConfig.settings };
  });

  afterEach(() => {
    fallbackSurveyConfig.pages = pagesSnapshot;
    fallbackSurveyConfig.settings = { ...settingsSnapshot };
  });

  it('returns the static config with localized copy metadata', async () => {
    const result = await loadSurveyConfig();

    expect(result.source).toBe('static');
    expect(result.pages.length).toBeGreaterThan(0);
    expect(result.copy.locale).toBe('en-US');
    expect(result.settings.language).toBe('en-US');

    const intro = result.pages.find((page) => page.id === 'intro');
    expect(intro?.parameterMeta?.templateKey).toBe('welcome');
  });

  it('honours explicit language overrides when provided', async () => {
    const searchParams = new URLSearchParams({ lang: 'he-IL' });
    const result = await loadSurveyConfig({ searchParams });

    expect(result.settings.language).toBe('he-IL');
    expect(result.settings.direction).toBe('rtl');
    expect(result.copy.locale).toBe('he-IL');
  });

  it('applies backend ordering when the endpoint returns IDs', async () => {
    const orderingUrl = 'https://example.test/order.json';
    fallbackSurveyConfig.settings = {
      ...settingsSnapshot,
      pageSequenceSource: orderingUrl,
    };

    const orderingPayload = {
      pageIds: ['finish', 'intro'],
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
    expect(ids[0]).toBe('finish');
    expect(ids[1]).toBe('intro');
  });

  it('falls back to a single welcome page when ordering fails', async () => {
    const orderingUrl = 'https://example.test/broken-order.json';
    fallbackSurveyConfig.settings = {
      ...settingsSnapshot,
      pageSequenceSource: orderingUrl,
    };

    const fetchImpl = vi.fn(async () => new Response('nope', { status: 500 }));

    const result = await loadSurveyConfig({ fetchImpl });
    expect(result.pages).toHaveLength(1);
    expect(result.pages[0]?.id).toBe('intro');
  });

  it('throws when both props and paramKey are provided for a descriptor', async () => {
    fallbackSurveyConfig.pages = [
      {
        type: 'text',
        id: 'conflict',
        paramKey: 'welcome',
        props: { title: 'invalid' },
      },
    ];

    await expect(loadSurveyConfig()).rejects.toThrow(/cannot specify both "props" and "paramKey"/i);
  });
});
