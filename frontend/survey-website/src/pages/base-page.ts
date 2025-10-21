import type {
  FlowControls,
  PageDescriptor,
  PageFactoryContext,
  PageValidationResult,
} from '../pagination/types.ts';

export abstract class BasePage<
  TData = unknown,
  TProps = unknown,
> {
  protected readonly container: HTMLDivElement;
  protected readonly descriptor: PageDescriptor<TProps>;
  protected readonly flow: FlowControls;
  protected savedData?: TData;

  constructor(context: PageFactoryContext<TProps, TData>) {
    this.container = context.container;
    this.descriptor = context.descriptor;
    this.flow = context.flow;
    this.savedData = context.savedData;
  }

  onEnter(data?: TData): void {
    if (data !== undefined) {
      this.savedData = data;
    }
  }

  abstract render(): void;

  destroy(): void {
    this.container.replaceChildren();
  }

  async validate(): Promise<PageValidationResult<TData>> {
    return { valid: true, data: this.savedData };
  }

  onLeave(): void {
    /* noop */
  }
}