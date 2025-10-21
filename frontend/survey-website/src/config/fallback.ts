import type { SurveyConfig } from './types.ts';

export const fallbackSurveyConfig: SurveyConfig = {
  version: 'fallback-1',
  settings: {
    showProgress: true,
    storageKey: 'perpetual-voting-survey',
    storageVersion: 'v2',
    direction: 'ltr',
    autosaveKeysToClear: ['survey-open-response'],
    language: 'en-US',
  },
  pages: [
    {
      type: 'text',
      id: 'intro',
      props: {
        title: 'Welcome to the Survey Prototype',
        body: 'Thanks for helping us evaluate the upcoming perpetual voting study.',
        footnote: 'Click Next to begin.',
      },
    },
    {
      type: 'text',
      id: 'overview',
      props: {
        title: 'What To Expect',
        body:
          'This flow showcases the pagination framework. In production, these steps will include interactive questions and explanations.',
        footnote: 'Use Back if you would like to review previous steps.',
      },
    },
    {
      type: 'textInput',
      id: 'open-response',
      props: {
        prompt: 'Describe your expectations for the perpetual voting system.',
        helperText: 'Share as much detail as you like. We will review this feedback to calibrate the final survey.',
        placeholder: 'I expect perpetual voting to help us…',
        rows: 8,
        required: true,
        maxLength: 800,
        autosaveKey: 'survey-open-response',
      },
    },
    {
      type: 'questionnaire',
      id: 'participant-profile',
      props: {
        title: 'About You',
        description: 'A few quick questions help us tailor future explanations and follow-ups.',
        summaryKey: 'participant',
        questions: [
          {
            id: 'experience',
            prompt: 'How familiar are you with participatory budgeting?',
            variant: 'select',
            required: true,
            helpText: 'Choose the option that best matches your experience so far.',
            placeholder: 'Select an option',
            options: [
              { value: 'none', label: 'Brand new to the concept' },
              { value: 'some', label: 'I have read about it or observed a pilot' },
              { value: 'active', label: 'I have actively participated' },
            ],
            outputKey: ['experience'],
          },
          {
            id: 'pilot-count',
            prompt: 'How many civic technology pilots have you taken part in?',
            variant: 'numeric',
            required: true,
            min: 0,
            step: 1,
            helpText: 'Enter zero if this is your first study.',
            outputKey: ['history', 'pilotCount'],
            meta: { label: 'Pilot Participation Count' },
          },
          {
            id: 'motivation',
            prompt: 'What motivates you to join the perpetual voting research effort today?',
            variant: 'shortText',
            required: false,
            maxLength: 160,
            placeholder: 'Optional response',
            outputKey: ['motivation'],
          },
        ],
      },
    },
    {
      type: 'text',
      id: 'finish',
      props: {
        title: 'You Made It!',
        body: 'This is the final placeholder page. Selecting Submit will complete the flow.',
        footnote: 'All steps are now complete.',
      },
    },
  ],
};
