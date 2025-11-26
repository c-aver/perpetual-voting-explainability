import type { InstanceDayConfig, InstanceVoterConfig, SurveyConfig, SurveyPageConfig } from './types.ts';
import { resolveQuestionOrderEndpoint } from './api-endpoints.ts';

const questionOrderingSource = resolveQuestionOrderEndpoint();

const instanceIds = [
  'simple',
  'complicated',
  'few_rounds',
  'few_voters'
]

const ruleIds = [
  'approval',
  'unit_cost',
  'equal_shares',
  'phragmen'
]

const explanationIds = [
  'none',
  'mechanical',
  'instance_based',
  'llm_generated'
]

const mechanicalExplanations: Record<string, string> = {
  "approval": "חוק זה בוחר בכל יום את האפשרות שלה מצביעים הכי הרבה.",
  "unit_cost": "חוק זה נותן לכל מצביע משקל, בהתחלה כל המשקלים שווים 1, אך כל מצביע שלא מסופק ביום כלשהו (כלומר המנצחת לא הייתה אחת מהבחירות שלו) מקבל העלאה של 1 במשקל. בכל יום המנצחת היא האופציה שסכום המשקלים של המצביעים שלה הכי גבוה.",
  "equal_shares": "חוק זה נותן לכל מצביע תקציב התחלתי של k שקלים (מספר הימים הכולל). על מנת \"לקנות\" אפשרות המצביעים צריכים להוציא n שקלים, המנצחת היא האפשרות שהמאשרים שלה יכולים לקנות כשכל אחד משלם כמה שפחות.",
  "phragmen": "חוק זה נותן לכל מצביע \"עומס\", בהתחלה כל העומסים שווים 0, לאחר בחירת המנצח עומס המצביעים שהצביעו לו מתחלק באופן שווה ביניהם אך עולה בסך הכל ב-1. האפשרות המנצחת בכל יום היא זו שיש לה קבוצת מצביעים שיקבלו את העומס הנמוך ביותר.",
};

const instanceDays: Record<string, InstanceDayConfig[]> = {
  "simple": [

  ],
  "complicated": [

  ],
  "few_rounds": [

  ],
  "few_voters": [

  ],
};

const instanceVoters: Record<string, InstanceVoterConfig[]> = {
  "simple": [

  ],
  "complicated": [

  ],
  "few_rounds": [

  ],
  "few_voters": [

  ],
};

const instanceBasedExplanations: Record<string, string[]> = {
  "simple": [

  ],
  "complicated": [

  ],
  "few_rounds": [

  ],
  "few_voters": [

  ],
};

const llmGeneratedExplanations: Record<string, string[]> = {
  "simple": [

  ],
  "complicated": [

  ],
  "few_rounds": [

  ],
  "few_voters": [

  ],
};

const introByType: Record<string, string> = {
  'none': 'עבור מופע זה אתם נדרשים לדרג את ההוגנות ללא הסבר.',
  'mechanical': 'עבור מופע זה תקבלו הסבר לגבי איך פועל החוק המוצג:',
  'instance_based': 'עבור מופע זה תקבלו הסבר לגבי איך פועל החוק המוצג וכן הסבר מפורט לגבי למה החוק בחר את המנצח:' ,
  'llm_generated': "עבור מופע זה תקבלו הסברים שיוצרו על ידי AI.",
}

const ruleExplanationByType: Record<string, Record<string, string> | undefined> = {
  'none': undefined,
  'mechanical': mechanicalExplanations,
  'instance_based': mechanicalExplanations,
  'llm_generated': undefined,
}

const explanationsByType: Record<string, Record<string, string[]> | undefined> = {
  'none': undefined,
  'mechanical': undefined,
  'instance_based': instanceBasedExplanations,
  'llm_generated': llmGeneratedExplanations,
}

function createInstancePages(): SurveyPageConfig[] {
  // instance-{instanceId}-{ruleId}-{explanationId}
  let result: SurveyPageConfig[] = [];
  for (const instanceId of instanceIds) {
    for (const ruleId of ruleIds) {
      for (const explanationId of explanationIds) {
        result.push({
          type: 'instance',
          id: `instance-${instanceId}-${ruleId}-${explanationId}`,
          props: {
            title: 'דוגמה למעבר על מופע.', // TODO: change to something representative?
            introText: introByType[explanationId] + "\n" + (ruleExplanationByType[explanationId]?.[ruleId] ?? ""),
            showResultsExplanation: explanationsByType[explanationId] !== undefined,
            voters: instanceVoters[instanceId],
            explanations: explanationsByType[explanationId]?.[instanceId],
            days: instanceDays[instanceId],
            rating: {
              scaleSize: 7,
              prompt: 'אחרי שראית את כל המנצחים, כמה לדעתך הייתה התוצאה הוגנת באופן כללי?',
              minLabel: 'לא הוגנת בכלל',
              maxLabel: 'הוגנת לגמרי',
            },
          },
        })
      }
    }
  }
  return result;
}

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
        title: 'ברוכים הבאים ותודה על ההשתתפות',
        body: 'ברוכים הבאים, אתם תענו על סקר בנוגע לחוקי בחירות חוזרות.\nמילוי הסקר ייקח כ-??? דקות. השאלון אנונימי לחלוטין ומיועד למטרות מחקר.',
        footnote: ''
      },
    },
    {
      type: 'text',
      id: 'overview',
      props: {
        title: 'בחירות חוזרות',
        body: 'בחירות חוזרות הן בחירות בין מצביעים אשר מתקיימות באופן חוזר, בעמוד הבא תראו דוגמה ל"מופע בחירות", כלומר תראו במי בחר כל מצביע, ובנוסף תראו דרך אחת לבחור מצביע.\nבשאלות הבאות תראו בחירת מנצחים על ידי חוקים שונים.',
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
              { value: 'postgrad', label: 'תואר שני ומעלה' }
            ],
            outputKey: ['education'],
          },
          {
            id: 'age',
            prompt: 'מה גילכם?',
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
          'למטה ניתן לראות מופע פשוט עם שלושה מצביעים על פני שלושה ימים, התקדמו בימים ובסוף הביעו את דעתכם על ההוגנות.\nבשאלות הבאות ייתכן ויופיעו הסברים למה החוק בחר את המנצח שבחר.',
        showResultsExplanation: true,
        voters: [
          { id: 1, label: 'מצביע 1' },
          { id: 2, label: 'מצביע 2' },
          { id: 3, label: 'מצביע 3' },
        ],
        explanations: [
          'כאן לפעמים יהיה הסבר מדוע נבחר א\' בתור המנצח ביום הראשון.',
          'עבור כל מופע תראו הסברים שונים.',
          'לאחר שתראו את כל המופע, תעברו לשלב הבא.',
          'כאן לפעמים יהיה הסבר מדוע נבחר א\' בתור המנצח ביום הראשון.',
          'עבור כל מופע תראו הסברים שונים.',
          'לאחר שתראו את כל המופע, תעברו לשלב הבא.',
        ],
        days: [
          {
            day: 1,
            winner: 'א\'',
            votes: [
              { voterId: 1, selections: ['א\'', 'ב\''] },
              { voterId: 2, selections: ['א\'', 'ב\''] },
              { voterId: 3, selections: ['א\''] },
            ],
          },
          {
            day: 2,
            winner: 'ב\'',
            votes: [
              { voterId: 1, selections: ['ב\'', 'ג\''] },
              { voterId: 2, selections: ['ב\''] },
              { voterId: 3, selections: ['ג\'', 'א\''] },
            ],
          },
          {
            day: 3,
            winner: 'ג\'',
            votes: [
              { voterId: 1, selections: ['ג\'', 'ב\''] },
              { voterId: 2, selections: ['ג\''] },
              { voterId: 3, selections: ['ג\'', 'א\''] },
            ],
          },
          {
            day: 4,
            winner: 'א\'',
            votes: [
              { voterId: 1, selections: ['א\'', 'ב\''] },
              { voterId: 2, selections: ['א\'', 'ב\''] },
              { voterId: 3, selections: ['א\''] },
            ],
          },
          {
            day: 5,
            winner: 'ב\'',
            votes: [
              { voterId: 1, selections: ['ב\'', 'ג\''] },
              { voterId: 2, selections: ['ב\''] },
              { voterId: 3, selections: ['ג\'', 'א\''] },
            ],
          },
          {
            day: 6,
            winner: 'ג\'',
            votes: [
              { voterId: 1, selections: ['ג\'', 'ב\''] },
              { voterId: 2, selections: ['ג\''] },
              { voterId: 3, selections: ['ג\'', 'א\''] },
            ],
          },
        ],
        rating: {
          scaleSize: 7,
          prompt: 'בשלב זה תדרגו כמה לדעתכם הייתה הוגנת בחירת המנצחים על פני כל המופע, נסו לדרג עכשיו.',
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
        body: 'תודה לכם על ההשתפות, התוצאות ישומשו למחקר.\nאנא לחצו על "שליחה" על מנת לסיים.',
        footnote: ''
      },
    },
    ...createInstancePages(),
  ],
};
