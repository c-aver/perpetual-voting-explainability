import type { SurveyConfig } from './types.ts';
import { resolveQuestionOrderEndpoint } from './api-endpoints.ts';

const questionOrderingSource = resolveQuestionOrderEndpoint();

/**
 * Embedded configuration used when remote survey loading fails or is unavailable.
 */
export const fallbackSurveyConfig: SurveyConfig = {
  version: 'beta-1',
  settings: {
    showProgress: true,
    storageKey: 'perpetual-voting-survey',
    storageVersion: 'v2',
    direction: 'auto',
    autosaveKeysToClear: ['survey-open-response'],
    language: 'he-IL',
    pageSequenceSource: questionOrderingSource,
  },
  pages: [
    {
      type: 'text',
      id: 'intro',
      props: {
        title: 'ברוכים הבאים',
        body: 'ברוכים הבאים, תודה.',
        footnote: ''
      },
    },
    {
      type: 'text',
      id: 'overview',
      props: {
        title: 'מטרת המחקר',
        body: 'לבחון תפיסת הוגנות של חוקי בחירות',
        footnote: ''
      },
    },
    {
      type: 'textInput',
      id: 'feedback',
      props: {
        prompt: 'נשמח למשוב בנוגע לסקר.',
        helperText: 'פרטו מעט או הרבה ככל שתרצו, נשתמש במשוב זה על מנת לבחון את תוצאות הסקר.',
        placeholder: 'חווייתי בסקר הייתה...',
        rows: 8,
        required: false,
        maxLength: 800,
        autosaveKey: 'feedback',
      },
    },
    {
      type: 'questionnaire',
      id: 'demographic',
      props: {
        title: 'פרטים דמוגרפיים',
        description: 'מספר שאלות עליכם לפני שנתחיל.',
        summaryKey: 'participant',
        questions: [
          {
            id: 'gender',
            prompt: 'אני',
            variant: 'select',
            required: true,
            placeholder: 'בחר אפשרות',
            options: [
              { value: 'm', label: 'גבר' },
              { value: 'f', label: 'אישה' },
              { value: 'x', label: 'אחר' },
            ],
            outputKey: ['gender'],
          },
          {
            id: 'education',
            prompt: 'מהי רמת ההשכלה שלכם?',
            variant: 'select',
            required: true,
            placeholder: 'בחר אפשרות',
            options: [
              { value: 'highschool', label: 'תיכונית' },
              { value: 'student', label: 'סטודנט לתואר ראשון' },
              { value: 'graduate', label: 'בוגר תואר ראשון' },
              { value: 'postgrad', label: 'תואר שני ומעלה'}
            ],
            outputKey: ['education'],
          },
          {
            id: 'age',
            prompt: 'מה גילך?',
            variant: 'numeric',
            required: true,
            min: 0,
            step: 1,
            outputKey: ['age'],
            meta: { label: 'גיל המשתתף' },
          },
        ],
      },
    },
    {
      type: 'instance',
      id: 'perpetual-demo',
      props: {
        title: 'דוגמה למעבר על מופע.',
        introText:
          'למטה ניתן לראות מופע פשוט עם שלושה מצביעים על פני שלושה ימים, התקדמו בימים ובסוף הביעו את דעתכם על ההוגנות.',
        voters: [
          { id: 1, label: 'מצביע 1' },
          { id: 2, label: 'מצביע 2' },
          { id: 3, label: 'מצביע 3' },
        ],
        days: [
          {
            day: 1,
            winner: 'א\'',
            explanation: 'כאן יהיה הסבר מדוע נבחר א\' בתור המנצח.',
            votes: [
              { voterId: 1, selections: ['א\'', 'ב\''] },
              { voterId: 2, selections: ['א\'', 'ב\''] },
              { voterId: 3, selections: ['א\''] },
            ],
          },
          {
            day: 2,
            winner: 'ב\'',
            explanation: 'כאן יהיה הסבר מדוע נבחר ב\' בתור המנצח.',
            votes: [
              { voterId: 1, selections: ['ב\'', 'ג\''] },
              { voterId: 2, selections: ['ב\''] },
              { voterId: 3, selections: ['ג\'', 'א\''] },
            ],
          },
          {
            day: 3,
            winner: 'ג\'',
            explanation: 'כאן יהיה הסבר מדוע נבחר ג\' בתור המנצח.',
            votes: [
              { voterId: 1, selections: ['ג\'', 'ב\''] },
              { voterId: 2, selections: ['ג\''] },
              { voterId: 3, selections: ['ג\'', 'א\''] },
            ],
          },
        ],
        rating: {
          scaleSize: 7,
          prompt: 'אחרי שראית את כל המנצחים, כמה לדעתך הייתה התוצאה הוגנת באופן כללי?',
          minLabel: 'לא הוגנת בכלל',
          maxLabel: 'הוגנת לגמרי',
        },
      },
    },
    {
      type: 'text',
      id: 'thank-you',
      props: {
        title: 'תודה רבה!',
        body: 'תודה לכם על ההשתפות, התוצאות ישומשו למחקר.\nאנא לחצאו על "שליחה" על מנת לסיים.',
        footnote: ''
      },
    },
  ],
};
