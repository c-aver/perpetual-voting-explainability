/**
 * Supported writing directions for pages and shell layout.
 */
export type TextDirection = 'ltr' | 'rtl';

/**
 * Normalized descriptor for a survey page used by the paginator runtime.
 */
export interface PageDescriptor<TProps = unknown> {
  type: string;
  id?: string;
  props?: TProps;
  skippable?: boolean;
}

/**
 * Localization bundle describing user-facing strings and formatters used across the survey runtime.
 */
export interface LocalizationBundle {
  locale: string;
  shell: {
    labels: {
      next: string;
      back: string;
      submit: string;
      completed: string;
      reset: string;
    };
    prompts: {
      resetConfirm: string;
    };
    progressLabel(current: number, total: number): string;
    defaultError: string;
  };
  validation: {
    textInput: {
      inlineRequired: string;
      inlineMaxLength(limit: number): string;
      shellRequired: string;
      shellMaxLength(limit: number): string;
    };
    questionnaire: {
      questionRequired: string;
      summaryRequired: string;
      invalidResponse: string;
      reviewPrompt: string;
      unsupportedQuestion: string;
    };
    numeric: {
      minValue(min: number): string;
      maxValue(max: number): string;
      integerRequired: string;
      stepValue(step: number): string;
    };
    shortText: {
      maxLength(limit: number): string;
      patternMismatch: string;
    };
    instance: {
      revealAllRounds: string;
      ratingRequired: string;
    };
  };
  completion: {
    heading: string;
    body: string;
    responseHeading: string;
    serverHeading: string;
    submissionPending: string;
    submissionFailedPrefix: string;
  };
  app: {
    loadFailure: string;
    noPages: string;
  };
  instancePage: {
    revealDayVotes(day: number): string;
    revealDayWinner(day: number): string;
    pendingWinnerLabel: string;
    ratingPrompt: string;
    sliderMinLabel: string;
    sliderMaxLabel: string;
    voterHeaderLabel: string;
    dayHeader(day: number): string;
    winnerRowLabel: string;
    additionalFeedbackLabel: string;
    additionalFeedbackPlaceholder: string;
  };
}

/**
 * Internal flow state summary used to drive navigation logic and analytics.
 */
export interface FlowState {
  currentIndex: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
  progress: number;
}

/**
 * Public flow state emitted via paginator callbacks, including the current descriptor.
 */
export interface FlowPublicState extends FlowState {
  descriptor: PageDescriptor;
}

/**
 * Result returned by page validation routines, including optional error messaging and data.
 */
export interface PageValidationResult<TData = unknown> {
  valid: boolean;
  message?: string;
  data?: TData;
}

/**
 * Payload emitted when the paginator completes, capturing descriptors, data, and timing metrics.
 */
export interface PaginationCompletePayload {
  descriptors: PageDescriptor[];
  dataById: Record<string, unknown>;
  pageDurationsMs: Record<string, number>;
}

/**
 * Context object provided to page factories during instantiation.
 */
export interface PageFactoryContext<TProps = unknown, TData = unknown> {
  container: HTMLDivElement;
  descriptor: PageDescriptor<TProps>;
  flow: FlowControls;
  savedData?: TData;
  copy: LocalizationBundle;
}

/**
 * Methods exposed to page components for navigation, validation messaging, and direction changes.
 */
export interface FlowControls {
  next(): Promise<void>;
  back(): Promise<void>;
  jumpTo(index: number): Promise<void>;
  complete(): Promise<void>;
  reset(): Promise<void>;
  getState(): FlowState;
  setNextEnabled(enabled: boolean): void;
  setError(message?: string): void;
  setDirection?(direction: TextDirection): void;
  setPageData?(data: unknown): void;
}
