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
      paramKey: 'welcome',
    },
    {
      type: 'text',
      id: 'overview',
      paramKey: 'overview',
      parameters: {
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
      paramKey: 'closing',
    },
  ],
};
