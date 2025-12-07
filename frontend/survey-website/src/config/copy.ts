import type { LocalizationBundle } from '../pagination/types.ts';

const fallbackLocale = 'en-US';

const enUS: LocalizationBundle = {
  locale: 'en-US',
  shell: {
    labels: {
      next: 'Next',
      back: 'Back',
      submit: 'Submit',
      completed: 'Completed',
      reset: 'Reset',
    },
    prompts: {
      resetConfirm: 'Reset survey progress? All responses will be cleared.',
    },
    progressLabel: (current, total) => `Step ${current} of ${total}`,
    defaultError: 'Please review this step.',
  },
  validation: {
    textInput: {
      inlineRequired: 'This response is required.',
      inlineMaxLength: (limit) => `Response must be shorter than ${limit} characters.`,
      shellRequired: 'Please provide a response before continuing.',
      shellMaxLength: (limit) => `Response must be shorter than ${limit} characters.`,
    },
    questionnaire: {
      questionRequired: 'This question is required.',
      summaryRequired: 'Please complete all required questions.',
      invalidResponse: 'Invalid response.',
      reviewPrompt: 'Please review the highlighted questions.',
      unsupportedQuestion: 'Unsupported question type',
    },
    numeric: {
      minValue: (min) => `Value must be at least ${min}.`,
      maxValue: (max) => `Value must be at most ${max}.`,
      integerRequired: 'Value must be an integer.',
      stepValue: (step) => `Value must increment by ${step}.`,
    },
    shortText: {
      maxLength: (limit) => `Response must be shorter than ${limit} characters.`,
      patternMismatch: 'Response does not match the required format.',
    },
    instance: {
      revealAllRounds: 'Reveal all voting days before continuing.',
      ratingRequired: 'Select a fairness rating to continue.',
    },
  },
  completion: {
    heading: 'Thank you!',
    body: 'Your responses have been recorded.',
    responseHeading: 'Submission Payload',
    serverHeading: 'Server Response',
    submissionPending: 'Submitting response...',
    submissionFailedPrefix: 'Submission failed:',
  },
  app: {
    loadFailure: 'Failed to load survey definition.',
    noPages: 'No survey pages are configured.',
  },
  instancePage: {
    revealDayVotes: (day) => `Show votes for day ${day}`,
    revealDayWinner: (day) => `Show winner for day ${day}`,
    pendingWinnerLabel: '',
    ratingPrompt: 'How fair do you find these results?',
    sliderMinLabel: 'Unfair',
    sliderMaxLabel: 'Very fair',
    voterHeaderLabel: 'Voter',
    dayHeader: (day) => `Day ${day}`,
    winnerRowLabel: 'Winner',
  },
};

const heIL: LocalizationBundle = {
  locale: 'he-IL',
  shell: {
    labels: {
      next: 'הבא',
      back: 'חזרה',
      submit: 'שליחה',
      completed: 'הושלם',
      reset: 'איפוס',
    },
    prompts: {
      resetConfirm: 'לאפס את ההתקדמות? כל התשובות יימחקו.',
    },
    progressLabel: (current, total) => `שלב ${current} מתוך ${total}`,
    defaultError: 'נא לבדוק את השלב.',
  },
  validation: {
    textInput: {
      inlineRequired: 'שדה חובה.',
      inlineMaxLength: (limit) => `התשובה חייבת להיות קצרה מ-${limit} תווים.`,
      shellRequired: 'נא למלא תשובה לפני ההמשך.',
      shellMaxLength: (limit) => `התשובה חייבת להיות קצרה מ-${limit} תווים.`,
    },
    questionnaire: {
      questionRequired: 'שאלה זו חובה.',
      summaryRequired: 'נא להשלים את כל שאלות החובה.',
      invalidResponse: 'תשובה לא תקינה.',
      reviewPrompt: 'בדקו מחדש את השאלות המסומנות.',
      unsupportedQuestion: 'סוג שאלה לא נתמך',
    },
    numeric: {
      minValue: (min) => `הערך חייב להיות לפחות ${min}.`,
      maxValue: (max) => `הערך חייב להיות לכל היותר ${max}.`,
      integerRequired: 'נדרש ערך שלם.',
      stepValue: (step) => `הערך חייב לגדול בקפיצות של ${step}.`,
    },
    shortText: {
      maxLength: (limit) => `התשובה חייבת להיות קצרה מ-${limit} תווים.`,
      patternMismatch: 'התשובה אינה עומדת בתבנית הנדרשת.',
    },
    instance: {
      revealAllRounds: 'חשפו את כל ימי ההצבעה לפני ההמשך.',
      ratingRequired: 'בחרו דירוג הוגנות כדי להמשיך.',
    },
  },
  completion: {
    heading: 'תודה!',
    body: 'התשובות נשמרו.',
    responseHeading: 'נתוני שליחה',
    serverHeading: 'תגובה מהשרת',
    submissionPending: 'שולח תשובות...',
    submissionFailedPrefix: 'השליחה נכשלה:',
  },
  app: {
    loadFailure: 'טעינת הסקר נכשלה.',
    noPages: 'אין עמודי סקר זמינים.',
  },
  instancePage: {
    revealDayVotes: (day) => `הצג את ההצבעות ליום ${day}`,
    revealDayWinner: (day) => `הצג את המנצח של יום ${day}`,
    pendingWinnerLabel: '',
    ratingPrompt: 'עד כמה התוצאות הללו הוגנות?',
    sliderMinLabel: 'לא הוגן',
    sliderMaxLabel: 'הוגן מאוד',
    voterHeaderLabel: 'מצביע',
    dayHeader: (day) => `יום ${day}`,
    winnerRowLabel: 'מנצח',
  },
};

const catalogs = new Map<string, LocalizationBundle>([
  [enUS.locale.toLowerCase(), enUS],
  ['en', enUS],
  [heIL.locale.toLowerCase(), heIL],
  ['he', heIL],
]);

/**
 * Resolves the closest matching localization bundle for the provided language tag.
 */
export function resolveCopyCatalog(language?: string): LocalizationBundle {
  const normalized = language?.toLowerCase();
  if (normalized && catalogs.has(normalized)) {
    return catalogs.get(normalized)!;
  }

  if (normalized) {
    const primary = normalized.split('-')[0];
    if (catalogs.has(primary)) {
      return catalogs.get(primary)!;
    }
  }

  return catalogs.get(fallbackLocale.toLowerCase()) ?? enUS;
}
