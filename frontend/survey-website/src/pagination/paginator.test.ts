// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest';
import { Paginator, type PageRegistry } from './paginator.ts';
import type {
  PageDescriptor,
  PageFactoryContext,
  PaginationCompletePayload,
} from './types.ts';
import { BasePage } from '../pages/base-page.ts';

interface MockPageProps {
  message: string;
  failOnce?: boolean;
}

class MockPage extends BasePage<string, MockPageProps> {
  private remainingFailures: number;

  constructor(context: PageFactoryContext<MockPageProps, string>) {
    super(context);
    this.remainingFailures = context.descriptor.props?.failOnce ? 1 : 0;
  }

  render(): void {
    const message = this.descriptor.props?.message ?? '';
    this.container.textContent = message;
  }

  async validate() {
    if (this.remainingFailures > 0) {
      this.remainingFailures -= 1;
      return { valid: false, message: 'Mock validation failure' } as const;
    }

    const message = this.descriptor.props?.message ?? '';
    this.savedData = message;
    return { valid: true, data: message } as const;
  }
}

afterEach(() => {
  vi.useRealTimers();
});

describe('Paginator', () => {
  const registry: PageRegistry = {
    mock: (context) => new MockPage(context as PageFactoryContext<MockPageProps, string>),
  };

  it('renders the first page and progress on start', () => {
    document.body.innerHTML = '<div id="app"></div>';
    const app = document.querySelector<HTMLDivElement>('#app');
    if (!app) throw new Error('Missing app container');

    const descriptors: PageDescriptor<MockPageProps>[] = [
      { type: 'mock', id: 'first', props: { message: 'Page one' } },
      { type: 'mock', id: 'second', props: { message: 'Page two' } },
    ];

    const paginator = new Paginator(app, descriptors, registry, { showProgress: true });
    paginator.start();

    expect(app.querySelector('.survey-shell__content')?.textContent).toContain('Page one');
    expect(app.querySelector('.survey-shell__progress')?.textContent).toBe('Step 1 of 2');
  });

  it('blocks navigation when validation fails', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    const app = document.querySelector<HTMLDivElement>('#app');
    if (!app) throw new Error('Missing app container');

    const descriptors: PageDescriptor<MockPageProps>[] = [
      { type: 'mock', id: 'first', props: { message: 'First', failOnce: true } },
      { type: 'mock', id: 'second', props: { message: 'Second' } },
    ];

    const paginator = new Paginator(app, descriptors, registry, { showProgress: true });
    paginator.start();

    const nextButton = app.querySelector<HTMLButtonElement>('button[data-role="next"]');
    if (!nextButton) throw new Error('Missing next button');

    nextButton.click();
    await vi.waitFor(() => {
      expect(app.querySelector('.survey-shell__message')?.textContent).toBe('Mock validation failure');
    });
    expect(app.querySelector('.survey-shell__content')?.textContent).toContain('First');

    nextButton.click();
    await vi.waitFor(() => {
      expect(app.querySelector('.survey-shell__content')?.textContent).toContain('Second');
    });
  });

  it('emits completion payload with saved data', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    const app = document.querySelector<HTMLDivElement>('#app');
    if (!app) throw new Error('Missing app container');

    const descriptors: PageDescriptor<MockPageProps>[] = [
      { type: 'mock', id: 'final', props: { message: 'Final step' } },
    ];

    const onComplete = vi.fn<(payload: PaginationCompletePayload) => void>();

    const paginator = new Paginator(app, descriptors, registry, {
      showProgress: false,
      onComplete,
    });

    paginator.start();

    const nextButton = app.querySelector<HTMLButtonElement>('button[data-role="next"]');
    if (!nextButton) throw new Error('Missing next button');

    nextButton.click();

    await vi.waitFor(() => {
      expect(onComplete).toHaveBeenCalledTimes(1);
    });

    const payload = onComplete.mock.calls[0][0];
    expect(payload.descriptors).toHaveLength(1);
    expect(payload.dataById.final).toBe('Final step');
    expect(payload.pageDurationsMs.final).toBeGreaterThanOrEqual(0);
  expect(payload.pageParameters).toEqual({});
  });

  it('persists and restores state with storageKey', async () => {
    localStorage.clear();

    document.body.innerHTML = '<div id="app"></div>';
    const app = document.querySelector<HTMLDivElement>('#app');
    if (!app) throw new Error('Missing app container');

    const descriptors: PageDescriptor<MockPageProps>[] = [
      { type: 'mock', id: 'alpha', props: { message: 'Alpha page' } },
      { type: 'mock', id: 'beta', props: { message: 'Beta page' } },
    ];

    const storageKey = 'paginator-storage-test';
    const paginator = new Paginator(app, descriptors, registry, {
      storageKey,
    });

    paginator.start();

    const nextButton = app.querySelector<HTMLButtonElement>('button[data-role="next"]');
    if (!nextButton) throw new Error('Missing next button');

    nextButton.click();

    await vi.waitFor(() => {
      expect(app.querySelector('.survey-shell__content')?.textContent).toContain('Beta page');
      expect(localStorage.getItem(storageKey)).not.toBeNull();
    });

    paginator.dispose();

    const storedSnapshot = localStorage.getItem(storageKey);
    expect(storedSnapshot).not.toBeNull();
    const parsed = storedSnapshot
      ? JSON.parse(storedSnapshot) as { dataByKey: Record<string, unknown>; durationsByKey?: Record<string, number> }
      : null;
    expect(parsed?.dataByKey?.alpha).toBe('Alpha page');
    expect(parsed?.durationsByKey?.alpha).toBeDefined();

    document.body.innerHTML = '<div id="app"></div>';
    const appSecond = document.querySelector<HTMLDivElement>('#app');
    if (!appSecond) throw new Error('Missing second app container');

    const resumed = new Paginator(appSecond, descriptors, registry, {
      storageKey,
      resumeFromStorage: true,
    });

    resumed.start();

    expect(appSecond.querySelector('.survey-shell__content')?.textContent).toContain('Beta page');

    const nextButtonSecond = appSecond.querySelector<HTMLButtonElement>('button[data-role="next"]');
    if (!nextButtonSecond) throw new Error('Missing next button (resume)');

    nextButtonSecond.click();

    await vi.waitFor(() => {
      expect(localStorage.getItem(storageKey)).toBeNull();
    });
  });

  it('resets the flow when reset is confirmed', async () => {
    localStorage.clear();

    document.body.innerHTML = '<div id="app"></div>';
    const app = document.querySelector<HTMLDivElement>('#app');
    if (!app) throw new Error('Missing app container');

    const descriptors: PageDescriptor<MockPageProps>[] = [
      { type: 'mock', id: 'first', props: { message: 'Page one' } },
      { type: 'mock', id: 'second', props: { message: 'Page two' } },
    ];

    const storageKey = 'paginator-reset-test';
    const onReset = vi.fn();
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    const paginator = new Paginator(app, descriptors, registry, {
      storageKey,
      onReset,
    });

    paginator.start();

    const nextButton = app.querySelector<HTMLButtonElement>('button[data-role="next"]');
    const resetButton = app.querySelector<HTMLButtonElement>('.survey-shell__reset');
    if (!nextButton || !resetButton) {
      confirmSpy.mockRestore();
      throw new Error('Missing control buttons');
    }

    nextButton.click();
    await vi.waitFor(() => {
      expect(app.querySelector('.survey-shell__content')?.textContent).toContain('Page two');
      expect(localStorage.getItem(storageKey)).not.toBeNull();
    });

    resetButton.click();

    await vi.waitFor(() => {
      expect(app.querySelector('.survey-shell__content')?.textContent).toContain('Page one');
      expect(localStorage.getItem(storageKey)).toBeNull();
    });

    expect(onReset).toHaveBeenCalledTimes(1);
    confirmSpy.mockRestore();
  });

  it('tracks per-page durations across navigation', async () => {
    vi.useFakeTimers();
    let currentTime = new Date('2025-01-01T00:00:00Z').getTime();
    vi.setSystemTime(currentTime);

    document.body.innerHTML = '<div id="app"></div>';
    const app = document.querySelector<HTMLDivElement>('#app');
    if (!app) throw new Error('Missing app container');

    const descriptors: PageDescriptor<MockPageProps>[] = [
      { type: 'mock', id: 'first', props: { message: 'First' } },
      { type: 'mock', id: 'second', props: { message: 'Second' } },
    ];

    const onComplete = vi.fn<(payload: PaginationCompletePayload) => void>();

    const paginator = new Paginator(app, descriptors, registry, {
      onComplete,
    });

    paginator.start();

    const nextButton = app.querySelector<HTMLButtonElement>('button[data-role="next"]');
    if (!nextButton) throw new Error('Missing next button');

  currentTime += 5000;
  vi.setSystemTime(currentTime);

    nextButton.click();

    await vi.waitFor(() => {
      expect(app.querySelector('.survey-shell__content')?.textContent).toContain('Second');
    });

  currentTime += 3000;
  vi.setSystemTime(currentTime);

    const submitButton = app.querySelector<HTMLButtonElement>('button[data-role="next"]');
    if (!submitButton) throw new Error('Missing submit button');

    submitButton.click();

    await vi.waitFor(() => {
      expect(onComplete).toHaveBeenCalledTimes(1);
    });

    const payload = onComplete.mock.calls[0][0];
    expect(payload.pageDurationsMs.first).toBeGreaterThanOrEqual(5000);
    expect(payload.pageDurationsMs.first).toBeLessThan(6000);
    expect(payload.pageDurationsMs.second).toBeGreaterThanOrEqual(3000);
    expect(payload.pageDurationsMs.second).toBeLessThan(4000);
    expect(payload.pageParameters).toEqual({});
  });

  it('includes parameter metadata in completion payload when available', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    const app = document.querySelector<HTMLDivElement>('#app');
    if (!app) throw new Error('Missing app container');

    const descriptors: PageDescriptor[] = [
      {
        type: 'mock',
        id: 'templated',
        paramKey: 'demo',
        parameterMeta: {
          templateKey: 'demo',
          signature: 'template:demo|title=test',
          parameters: { title: 'Test' },
        },
        props: { message: 'Done' },
      },
    ];

    const onComplete = vi.fn<(payload: PaginationCompletePayload) => void>();

    const paginator = new Paginator(app, descriptors, registry, {
      onComplete,
    });

    paginator.start();

    const submitButton = app.querySelector<HTMLButtonElement>('button[data-role="next"]');
    if (!submitButton) throw new Error('Missing submit button');

    submitButton.click();

    await vi.waitFor(() => {
      expect(onComplete).toHaveBeenCalledTimes(1);
    });

    const payload = onComplete.mock.calls[0][0];
    expect(payload.pageParameters.templated).toMatchObject({
      templateKey: 'demo',
      signature: 'template:demo|title=test',
      parameters: { title: 'Test' },
    });
  });
});
