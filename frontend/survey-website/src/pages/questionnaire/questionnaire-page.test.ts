// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { QuestionnairePage, type QuestionnairePageProps, type QuestionnairePageResult } from './questionnaire-page.ts';
import type { PageDescriptor, PageFactoryContext, FlowControls, FlowState } from '../../pagination/types.ts';
import { resolveCopyCatalog } from '../../config/copy.ts';

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
  const defaultProps: QuestionnairePageProps = {
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
  };

  const createContext = (propsOverride?: QuestionnairePageProps) => {
    const descriptor: PageDescriptor<QuestionnairePageProps> = {
      type: 'questionnaire',
      id: 'profile',
      props: propsOverride ?? defaultProps,
    };

    const container = document.createElement('div');
    const flowWrapper = createFlowControls();

    const context: PageFactoryContext<QuestionnairePageProps, QuestionnairePageResult> = {
      container,
      descriptor,
      flow: flowWrapper.controls,
      copy: resolveCopyCatalog('en-US'),
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
    expect(data.incorrectAttempts).toBeUndefined();

    expect(data.submission).toEqual({
      profile: {
        experience: 'some',
        history: {
          pilotCount: 3,
        },
      },
    });
  });

  it('tracks incorrect attempts and exposes attempt counts in submissions', async () => {
    const props: QuestionnairePageProps = {
      title: 'Knowledge Check',
      description: 'Answer all questions correctly.',
      summaryKey: 'quiz',
      attemptTracking: {
        outputKey: ['attempts'],
      },
      questions: [
        {
          id: 'color',
          prompt: 'Primary sky color',
          variant: 'shortText',
          required: true,
          correctAnswer: 'blue',
          outputKey: ['responses', 'color'],
        },
        {
          id: 'number',
          prompt: 'Result of 2 + 3',
          variant: 'numeric',
          required: true,
          correctAnswer: 5,
          outputKey: ['responses', 'number'],
        },
      ],
    };

    const { context, container } = createContext(props);
    const page = new QuestionnairePage(context);
    page.render();

    const textInput = container.querySelector<HTMLInputElement>('input[type="text"]');
    const numberInput = container.querySelector<HTMLInputElement>('input[type="number"]');
    if (!textInput || !numberInput) throw new Error('Missing quiz inputs');

    textInput.value = 'red';
    textInput.dispatchEvent(new Event('input', { bubbles: true }));
    numberInput.value = '3';
    numberInput.dispatchEvent(new Event('input', { bubbles: true }));

    const firstResult = await page.validate();
    expect(firstResult.valid).toBe(false);

    const incorrectQuestion = container.querySelector('.questionnaire-question--incorrect');
    expect(incorrectQuestion).not.toBeNull();

    const attemptSummary = container.querySelector<HTMLParagraphElement>('.questionnaire-page__attempts');
    expect(attemptSummary?.textContent).toBe('Incorrect attempts: 1');

    textInput.value = 'Blue';
    textInput.dispatchEvent(new Event('input', { bubbles: true }));
    numberInput.value = '5';
    numberInput.dispatchEvent(new Event('input', { bubbles: true }));

    const successResult = await page.validate();
    expect(successResult.valid).toBe(true);
    const successData = successResult.data;
    if (!successData) throw new Error('Missing success data');

    expect(successData.incorrectAttempts).toBe(1);
    expect(successData.submission).toEqual({
      quiz: {
        responses: {
          color: 'Blue',
          number: 5,
        },
        attempts: 1,
      },
    });
  });

  it('omits incorrectAttempts field when no questions have correct answers', async () => {
    const props: QuestionnairePageProps = {
      title: 'Regular Survey',
      summaryKey: 'regular',
      attemptTracking: {
        outputKey: ['attempts'],
        label: 'Attempts:',
      },
      questions: [
        {
          id: 'mood',
          prompt: 'How do you feel?',
          variant: 'shortText',
          required: true,
          outputKey: ['responses', 'mood'],
        },
      ],
    };

    const { context, container } = createContext(props);
    const page = new QuestionnairePage(context);
    page.render();

    const input = container.querySelector<HTMLInputElement>('input[type="text"]');
    if (!input) throw new Error('Missing mood input');

    input.value = 'Great';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    const result = await page.validate();
    expect(result.valid).toBe(true);
    const data = result.data;
    if (!data) throw new Error('Missing questionnaire result data');

    expect(data.incorrectAttempts).toBeUndefined();
    expect(container.querySelector('.questionnaire-page__attempts')).toBeNull();
    expect(data.submission).toEqual({
      regular: {
        responses: {
          mood: 'Great',
        },
      },
    });
  });

  it('omits inline attempt summary when showSummary is false', async () => {
    const props: QuestionnairePageProps = {
      title: 'Hidden Attempts',
      summaryKey: 'quiz',
      attemptTracking: {
        outputKey: ['attempts'],
        label: 'Attempts:',
        showSummary: false,
      },
      questions: [
        {
          id: 'check',
          prompt: 'Type the secret word',
          variant: 'shortText',
          required: true,
          correctAnswer: 'orbit',
          outputKey: ['responses', 'word'],
        },
      ],
    };

    const { context, container } = createContext(props);
    const page = new QuestionnairePage(context);
    page.render();

    const textInput = container.querySelector<HTMLInputElement>('input[type="text"]');
    if (!textInput) throw new Error('Missing hidden attempt input');

    textInput.value = 'wrong';
    textInput.dispatchEvent(new Event('input', { bubbles: true }));

    const firstResult = await page.validate();
    expect(firstResult.valid).toBe(false);

    expect(container.querySelector('.questionnaire-page__attempts')).toBeNull();

    textInput.value = 'orbit';
    textInput.dispatchEvent(new Event('input', { bubbles: true }));

    const successResult = await page.validate();
    expect(successResult.valid).toBe(true);
    const successData = successResult.data;
    if (!successData) throw new Error('Missing success data for hidden attempts');

    expect(successData.incorrectAttempts).toBe(1);
    expect(successData.submission).toEqual({
      quiz: {
        responses: {
          word: 'orbit',
        },
        attempts: 1,
      },
    });
  });
});
