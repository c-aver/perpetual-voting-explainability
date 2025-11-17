/**
 * Supported writing directions for pages and shell layout.
 */
export type TextDirection = 'ltr' | 'rtl';

/**
 * Metadata describing which template variant produced a page's rendered props.
 */
export interface PageParameterMeta {
  templateKey: string;
  parameters?: Record<string, unknown>;
  signature: string;
}

/**
 * Normalized descriptor for a survey page, optionally enriched with template metadata.
 */
export interface PageDescriptor<TProps = unknown> {
  type: string;
  id?: string;
  props?: TProps;
  skippable?: boolean;
  paramKey?: string;
  parameters?: Record<string, unknown>;
  parameterMeta?: PageParameterMeta;
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
 * Payload emitted when the paginator completes, capturing descriptors, data, timing, and parameters.
 */
export interface PaginationCompletePayload {
  descriptors: PageDescriptor[];
  dataById: Record<string, unknown>;
  pageDurationsMs: Record<string, number>;
  pageParameters: Record<string, PageParameterMeta>;
}

/**
 * Context object provided to page factories during instantiation.
 */
export interface PageFactoryContext<TProps = unknown, TData = unknown> {
  container: HTMLDivElement;
  descriptor: PageDescriptor<TProps>;
  flow: FlowControls;
  savedData?: TData;
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
}
