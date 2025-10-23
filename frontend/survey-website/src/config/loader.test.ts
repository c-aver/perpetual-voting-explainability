// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest';
import { loadSurveyConfig } from './loader.ts';

const configUrl = 'https://example.test/app/config/survey.json';
const questionUrl = 'https://example.test/app/config/questions.json';
const orderingUrl = 'https://example.test/app/config/order.json';

describe('loadSurveyConfig', () => {
  it('loads remote config, resolves question sources, and applies ordering', async () => {
    const remoteConfig = {
      meta: { title: 'Remote Survey' },
      settings: {
        showProgress: false,
        direction: 'auto',
        defaultDirection: 'ltr',
        rtlLocales: ['ar'],
        pageSequenceSource: './order.json',
        autosaveKeysToClear: ['draft'],
        language: 'fr-FR',
      },
      pages: [
        { type: 'text', id: 'welcome', props: { title: 'Welcome' } },
        {
          type: 'questionnaire',
          id: 'profile',
          props: {
            questionSource: './questions.json',
            title: 'Profile',
          },
        },
        { type: 'text', id: 'complete', props: { title: 'Done' } },
      ],
    };

    const questionPayload = {
      questions: [
        { id: 'q1', prompt: 'One?', variant: 'shortText' },
      ],
    };

    const orderingPayload = {
      pageIds: ['profile', 'welcome'],
    };

    const payloadByUrl = new Map<string, unknown>([
      [configUrl, remoteConfig],
      [questionUrl, questionPayload],
      [orderingUrl, orderingPayload],
    ]);

    const fetchImpl = vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
      const payload = payloadByUrl.get(url);
      if (!payload) {
        return new Response('Not Found', { status: 404 });
      }
      return new Response(JSON.stringify(payload), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    });

    const result = await loadSurveyConfig({
      configPath: configUrl,
      fetchImpl,
      language: 'ar',
    });

    expect(result.source).toBe('remote');
    expect(result.settings.showProgress).toBe(false);
    expect(result.settings.direction).toBe('rtl');
    expect(result.settings.autosaveKeysToClear).toEqual(['draft']);
  expect(result.settings.language).toBe('ar');

    const ids = result.pages.map((page) => page.id);
    expect(ids).toEqual(['profile', 'welcome', 'complete']);

    const profile = result.pages.find((page) => page.id === 'profile');
    expect(profile?.props && Array.isArray((profile.props as { questions?: unknown[] }).questions)).toBe(true);

    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it('falls back to embedded config when remote load fails', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error('network');
    });

    const result = await loadSurveyConfig({
      configPath: configUrl,
      fetchImpl,
    });

    expect(result.source).toBe('fallback');
    expect(result.pages.length).toBeGreaterThan(0);
    expect(result.settings.direction).toBe('ltr');
    expect(result.settings.autosaveKeysToClear).toContain('survey-open-response');
    expect(result.settings.language).toBe('en-US');

    const intro = result.pages.find((page) => page.id === 'intro');
    expect(intro?.props).toMatchObject({ title: 'Welcome to the Survey Prototype' });
    expect(intro?.parameterMeta?.templateKey).toBe('welcome');
  });

  it('uses config language when override is not provided', async () => {
    const remoteConfig = {
      settings: {
        direction: 'auto',
        defaultDirection: 'ltr',
        rtlLocales: ['he'],
        language: 'he-IL',
      },
      pages: [
        { type: 'text', id: 'intro', props: { title: 'Hi' } },
      ],
    };

    const fetchImpl = vi.fn(async () => new Response(JSON.stringify(remoteConfig), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }));

    const result = await loadSurveyConfig({
      configPath: configUrl,
      fetchImpl,
    });

    expect(result.settings.language).toBe('he-IL');
    expect(result.settings.direction).toBe('rtl');
  });

  it('resolves template parameters when paramKey is provided', async () => {
    const config = {
      pages: [
        {
          type: 'text',
          id: 'custom',
          paramKey: 'closing',
          parameters: {
            title: 'Done!',
            body: 'Thanks again.',
          },
        },
      ],
    };

    const fetchImpl = vi.fn(async () => new Response(JSON.stringify(config), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }));

    const result = await loadSurveyConfig({
      configPath: configUrl,
      fetchImpl,
    });

    expect(result.pages).toHaveLength(1);
    const page = result.pages[0];
    expect(page.props).toMatchObject({ title: 'Done!', body: 'Thanks again.' });
    expect(page.parameterMeta).toMatchObject({ templateKey: 'closing' });
    expect(page.parameters).toMatchObject({ title: 'Done!', body: 'Thanks again.' });
  });

  it('throws when both props and paramKey are provided', async () => {
    const config = {
      pages: [
        {
          type: 'text',
          id: 'conflict',
          paramKey: 'welcome',
          props: { title: 'invalid' },
        },
      ],
    };

    const fetchImpl = vi.fn(async () => new Response(JSON.stringify(config), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }));

    await expect(
      loadSurveyConfig({
        configPath: configUrl,
        fetchImpl,
      }),
    ).rejects.toThrow(/cannot specify both "props" and "paramKey"/i);
  });
});
