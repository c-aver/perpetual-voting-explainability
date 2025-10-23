// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { TextInputPage, type TextInputPageProps, type TextInputPageResult } from './text-input-page.ts';
import type { PageFactoryContext, PageDescriptor, FlowControls, FlowState } from '../pagination/types.ts';

describe('TextInputPage', () => {
  const createFlowControls = () => {
    let nextEnabled = false;
    const controls: FlowControls = {
      next: async () => undefined,
      back: async () => undefined,
      jumpTo: async () => undefined,
      complete: async () => undefined,
      reset: async () => undefined,
      getState: (): FlowState => ({
        currentIndex: 0,
        total: 1,
        hasNext: false,
        hasPrev: false,
        progress: 1,
      }),
      setNextEnabled: (enabled: boolean) => {
        nextEnabled = enabled;
      },
      setError: () => undefined,
    };
    return { controls, get enabled() { return nextEnabled; } };
  };

  const createContext = (
    overrides: {
      props?: Partial<TextInputPageProps>;
      savedData?: TextInputPageResult;
    } = {},
  ) => {
    const descriptor: PageDescriptor<TextInputPageProps> = {
      type: 'textInput',
      id: 'test-text-input',
      props: {
        prompt: 'Share your thoughts',
        required: true,
        maxLength: 120,
        ...overrides.props,
      },
    };

    const container = document.createElement('div');
    const flowWrapper = createFlowControls();

    const context: PageFactoryContext<TextInputPageProps, TextInputPageResult> = {
      container,
      descriptor,
      flow: flowWrapper.controls,
      savedData: overrides.savedData,
    };

    return { context, container, flowWrapper };
  };

  it('disables next until required text is entered and validates the response', async () => {
    const { context, container, flowWrapper } = createContext();
    const page = new TextInputPage(context);

    page.render();

    expect(flowWrapper.enabled).toBe(false);

    const textarea = container.querySelector('textarea');
    if (!textarea) throw new Error('Missing textarea');

    textarea.value = 'This is my perspective.';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    expect(flowWrapper.enabled).toBe(true);

    const result = await page.validate();
    expect(result.valid).toBe(true);
    expect(result.data?.value).toBe('This is my perspective.');
    expect(result.data?.metadata?.length).toBe(23);
  });

  it('returns validation error when required input is missing', async () => {
    const { context } = createContext();
    const page = new TextInputPage(context);

    page.render();

    const result = await page.validate();
    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/provide a response/i);
  });

  it('allows optional input to be skipped without data', async () => {
    const { context, flowWrapper } = createContext({
      props: { required: false },
    });
    const page = new TextInputPage(context);

    page.render();

    expect(flowWrapper.enabled).toBe(true);

    const result = await page.validate();
    expect(result.valid).toBe(true);
    expect(result.data).toBeUndefined();
  });
});
