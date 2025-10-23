export type TextDirection = 'ltr' | 'rtl';

export interface PageParameterMeta {
  templateKey: string;
  parameters?: Record<string, unknown>;
  signature: string;
}

export interface PageDescriptor<TProps = unknown> {
  type: string;
  id?: string;
  props?: TProps;
  skippable?: boolean;
  paramKey?: string;
  parameters?: Record<string, unknown>;
  parameterMeta?: PageParameterMeta;
}

export interface FlowState {
  currentIndex: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
  progress: number;
}

export interface FlowPublicState extends FlowState {
  descriptor: PageDescriptor;
}

export interface PageValidationResult<TData = unknown> {
  valid: boolean;
  message?: string;
  data?: TData;
}

export interface PaginationCompletePayload {
  descriptors: PageDescriptor[];
  dataById: Record<string, unknown>;
  pageDurationsMs: Record<string, number>;
  pageParameters: Record<string, PageParameterMeta>;
}

export interface PageFactoryContext<TProps = unknown, TData = unknown> {
  container: HTMLDivElement;
  descriptor: PageDescriptor<TProps>;
  flow: FlowControls;
  savedData?: TData;
}

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
