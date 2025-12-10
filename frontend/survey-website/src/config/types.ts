import type { LocalizationBundle, PageDescriptor } from '../pagination/types.ts';
import type { QuestionDescriptor } from '../pages/questionnaire/question-types.ts';

/**
 * Render directions supported by the survey UI.
 */
export type TextDirection = 'ltr' | 'rtl';
/**
 * Configuration-level direction setting, including automatic resolution.
 */
export type DirectionSetting = TextDirection | 'auto';

/**
 * Raw survey settings that can be provided by configuration files.
 */
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

/**
 * Configuration shape for questionnaire page props prior to normalization.
 */
export interface QuestionnairePropsConfig {
  title?: string;
  description?: string;
  summaryKey?: string;
  questions?: QuestionDescriptor[];
}

export interface InstanceVoterConfig {
  id: number;
  label?: string;
}

export interface InstanceVoteConfig {
  voterId: number;
  selections: string[];
}

export interface InstanceDayConfig {
  day: number;
  winner: string;
  votes: InstanceVoteConfig[];
}

export interface InstanceRatingConfig {
  scaleSize?: number;
  prompt?: string;
  minLabel?: string;
  maxLabel?: string;
}

export interface InstancePagePropsConfig {
  title?: string;
  introText?: string;
  voters: InstanceVoterConfig[];
  showResultsExplanation?: boolean;
  days: InstanceDayConfig[];
  explanations?: string[];
  rating?: InstanceRatingConfig;
}

/**
 * Page definition as provided by configuration files before runtime normalization.
 */
export type SurveyPageConfig = Omit<PageDescriptor, 'props'> & {
  props?: Record<string, unknown>;
};

/**
 * Root survey configuration document loaded from JSON.
 */
export interface SurveyConfig {
  version?: string;
  meta?: Record<string, unknown>;
  settings?: SurveySettings;
  pages: SurveyPageConfig[];
}

/**
 * Runtime settings consumed by the paginator after defaults are applied.
 */
export interface ResolvedSurveySettings {
  showProgress: boolean;
  storageKey?: string;
  storageVersion?: string;
  direction: TextDirection;
  autosaveKeysToClear: string[];
  language?: string;
}

/**
 * Normalized configuration returned by `loadSurveyConfig`.
 */
export interface LoadedSurveyConfig {
  pages: PageDescriptor[];
  settings: ResolvedSurveySettings;
  source: 'static';
  meta?: Record<string, unknown>;
  copy: LocalizationBundle;
}
