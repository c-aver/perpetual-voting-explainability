import type { PageDescriptor } from '../pagination/types.ts';
import type { QuestionDescriptor } from '../pages/questionnaire/question-types.ts';

export type TextDirection = 'ltr' | 'rtl';
export type DirectionSetting = TextDirection | 'auto';

export interface SurveySettings {
  showProgress?: boolean;
  storageKey?: string;
  storageVersion?: string;
  direction?: DirectionSetting;
  defaultDirection?: TextDirection;
  rtlLocales?: string[];
  pageSequenceSource?: string;
  autosaveKeysToClear?: string[];
  language?: string;
}

export interface QuestionnairePropsConfig {
  title?: string;
  description?: string;
  summaryKey?: string;
  questions?: QuestionDescriptor[];
  questionSource?: string;
}

export type SurveyPageConfig = Omit<PageDescriptor, 'props'> & {
  props?: Record<string, unknown>;
};

export interface SurveyConfig {
  version?: string;
  meta?: Record<string, unknown>;
  settings?: SurveySettings;
  pages: SurveyPageConfig[];
}

export interface ResolvedSurveySettings {
  showProgress: boolean;
  storageKey?: string;
  storageVersion?: string;
  direction: TextDirection;
  autosaveKeysToClear: string[];
  language?: string;
}

export interface LoadedSurveyConfig {
  pages: PageDescriptor[];
  settings: ResolvedSurveySettings;
  source: 'remote' | 'fallback';
  meta?: Record<string, unknown>;
}
