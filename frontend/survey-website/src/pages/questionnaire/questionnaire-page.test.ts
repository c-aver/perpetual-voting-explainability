// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { QuestionnairePage, type QuestionnairePageProps, type QuestionnairePageResult } from './questionnaire-page.ts';
import type { PageDescriptor, PageFactoryContext, FlowControls, FlowState } from '../../pagination/types.ts';

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

describe('QuestionnairePage', () => {
  const createContext = () => {
    const descriptor: PageDescriptor<QuestionnairePageProps> = {
      type: 'questionnaire',
      id: 'profile',
      props: {
        title: 'Profile',
        summaryKey: 'profile',
        questions: [
          {
            id: 'experience',
            prompt: 'Experience level',
            variant: 'select',
            required: true,
            placeholder: 'Select…',
            options: [
              { value: 'none', label: 'No experience' },
              { value: 'some', label: 'Some experience' },
            ],
            outputKey: ['experience'],
          },
          {
            id: 'pilot-count',
            prompt: 'Number of pilots',
            variant: 'numeric',
            required: true,
            min: 0,
            step: 1,
            outputKey: ['history', 'pilotCount'],
          },
          {
            id: 'motivation',
            prompt: 'Why are you interested?',
            variant: 'shortText',
            required: false,
            maxLength: 100,
            outputKey: ['motivation'],
          },
        ],
      },
    };

    const container = document.createElement('div');
    const flowWrapper = createFlowControls();

    const context: PageFactoryContext<QuestionnairePageProps, QuestionnairePageResult> = {
      container,
      descriptor,
      flow: flowWrapper.controls,
    };

    return { context, container, flowWrapper };
  };

  it('validates required questions and builds nested submission output', async () => {
    const { context, container, flowWrapper } = createContext();
    const page = new QuestionnairePage(context);

    page.render();

    expect(flowWrapper.enabled).toBe(false);

  const select = container.querySelector<HTMLSelectElement>('select');
  const numeric = container.querySelector<HTMLInputElement>('input[type="number"]');
    if (!select || !numeric) throw new Error('Missing questionnaire controls');

    select.value = 'some';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    numeric.value = '3';
    numeric.dispatchEvent(new Event('input', { bubbles: true }));

    expect(flowWrapper.enabled).toBe(true);

    const result = await page.validate();
    expect(result.valid).toBe(true);
    const data = result.data;
    if (!data) throw new Error('Missing questionnaire result data');

    expect(Object.keys(data.answers)).toContain('experience');
    expect(data.answers.experience.value).toBe('some');
    expect(data.answers['pilot-count'].value).toBe(3);

    expect(data.submission).toEqual({
      profile: {
        experience: 'some',
        history: {
          pilotCount: 3,
        },
      },
    });
  });
});
