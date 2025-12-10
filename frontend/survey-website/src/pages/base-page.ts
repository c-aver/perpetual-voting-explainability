import type {
  FlowControls,
  LocalizationBundle,
  PageDescriptor,
  PageFactoryContext,
  PageValidationResult,
} from '../pagination/types.ts';

/**
 * Shared base class for survey pages, providing lifecycle hooks and access to flow controls.
 */
export abstract class BasePage<
  TData = unknown,
  TProps = unknown,
> {
  protected readonly container: HTMLDivElement;
  protected readonly descriptor: PageDescriptor<TProps>;
  protected readonly flow: FlowControls;
  protected readonly copy: LocalizationBundle;
  protected savedData?: TData;

  constructor(context: PageFactoryContext<TProps, TData>) {
    this.container = context.container;
    this.descriptor = context.descriptor;
    this.flow = context.flow;
    this.copy = context.copy;
    this.savedData = context.savedData;
  }

  /**
   * Called when the page becomes active; default implementation stores any persisted data.
   */
  onEnter(data?: TData): void {
    if (data !== undefined) {
      this.savedData = data;
    }
  }

  /**
   * Renders the page UI inside the provided container.
   */
  abstract render(): void;

  /**
   * Removes page-specific markup; subclasses should also detach event listeners if needed.
   */
  destroy(): void {
    this.container.replaceChildren();
  }

  /**
   * Validates user input and returns a result; defaults to passing through saved data.
   */
  async validate(): Promise<PageValidationResult<TData>> {
    return { valid: true, data: this.savedData };
  }

  /**
   * Persists in-progress page data locally and forwards it to the paginator when supported.
   */
  protected persistData(data: TData | undefined): void {
    this.savedData = data;
    this.flow.setPageData?.(data as unknown);
  }

  /**
   * Called before the page is removed from view; default implementation is a no-op.
   */
  onLeave(): void {
    /* noop */
  }
}