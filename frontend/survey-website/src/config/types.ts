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

/**
 * Page definition as provided by configuration files before template resolution.
 */
export type SurveyPageConfig = Omit<PageDescriptor, 'props' | 'parameterMeta'> & {
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
