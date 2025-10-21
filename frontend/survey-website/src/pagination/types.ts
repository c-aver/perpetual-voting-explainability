export type TextDirection = 'ltr' | 'rtl';

export interface PageDescriptor<TProps = unknown> {
  type: string;
  id?: string;
  props?: TProps;
  skippable?: boolean;
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
