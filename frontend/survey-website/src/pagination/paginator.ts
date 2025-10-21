import { BasePage } from '../pages/base-page.ts';
import { SurveyShell } from './survey-shell.ts';
import type {
  FlowControls,
  FlowPublicState,
  FlowState,
  PageDescriptor,
  PageFactoryContext,
  PageValidationResult,
  PaginationCompletePayload,
  TextDirection,
} from './types.ts';

export type PageFactory = (
  context: PageFactoryContext
) => BasePage<unknown, unknown>;

export type PageRegistry = Record<string, PageFactory>;

export interface PaginatorOptions {
  showProgress?: boolean;
  onComplete?: (payload: PaginationCompletePayload) => void;
  onChange?: (state: FlowPublicState) => void;
  onReset?: () => void;
  progressFormatter?: (state: FlowState) => string;
  defaultErrorMessage?: string;
  storageKey?: string;
  resumeFromStorage?: boolean;
  storageVersion?: string;
  direction?: TextDirection;
}

export class Paginator {
  private readonly root: HTMLDivElement;
  private readonly descriptors: PageDescriptor[];
  private readonly registry: PageRegistry;
  private readonly options: PaginatorOptions;
  private readonly storageKey?: string;
  private readonly resumeFromStorage: boolean;
  private readonly storageVersion: string;
  private initialIndex = 0;
  private direction: TextDirection;

  private shell?: SurveyShell;
  private currentIndex = -1;
  private currentPage?: BasePage<unknown, unknown>;
  private currentDescriptor?: PageDescriptor;
  private readonly dataByKey = new Map<string, unknown>();
  private readonly visited = new Set<number>();
  private isTransitioning = false;
  private isComplete = false;
  private readonly flowControls: FlowControls;

  constructor(
    root: HTMLDivElement,
    descriptors: PageDescriptor[],
    registry: PageRegistry,
    options: PaginatorOptions = {},
  ) {
    if (descriptors.length === 0) {
      throw new Error('Paginator requires at least one page descriptor.');
    }

    this.root = root;
    this.descriptors = descriptors;
    this.registry = registry;
    this.options = options;
    this.storageKey = options.storageKey;
    this.resumeFromStorage = options.resumeFromStorage ?? true;
    this.storageVersion = options.storageVersion ?? 'v1';
    this.direction = options.direction ?? 'ltr';

    this.flowControls = {
      next: () => this.handleNext(),
      back: () => this.handleBack(),
      jumpTo: (index: number) => this.handleJump(index),
      complete: () => this.finish(),
      reset: () => this.reset(),
      getState: () => this.getFlowState(),
      setNextEnabled: (enabled: boolean) => {
        this.shell?.setNextDisabled(!enabled);
      },
      setError: (message?: string) => {
        this.shell?.setError(message);
      },
      setDirection: (direction: TextDirection) => {
        this.setDirection(direction);
      },
    };

    this.restoreFromStorage();
  }

  start(): void {
    if (this.shell) {
      return;
    }

    this.shell = new SurveyShell(this.root, {
      onNext: () => {
        void this.handleNext();
      },
      onBack: () => {
        void this.handleBack();
      },
      onReset: () => {
        void this.reset();
      },
      enableProgress: this.options.showProgress ?? true,
      direction: this.direction,
    });

    void this.renderPageAt(this.initialIndex, { notifyChange: false });
  }

  dispose(): void {
    this.currentPage?.onLeave();
    this.currentPage?.destroy();
    this.shell?.teardown();
    this.shell = undefined;
    this.currentIndex = -1;
    this.currentPage = undefined;
    this.currentDescriptor = undefined;
    this.isComplete = false;
    this.isTransitioning = false;
    this.visited.clear();
  }

  private async handleNext(): Promise<void> {
    if (!this.currentPage || this.isTransitioning || this.isComplete) {
      return;
    }

    this.isTransitioning = true;
    this.shell?.setNextDisabled(true);
    this.shell?.setError();

    try {
      const result = await this.currentPage.validate();
      if (!result.valid) {
        this.shell?.setError(
          result.message ?? this.options.defaultErrorMessage ?? 'Please review this step.',
        );
        return;
      }

      this.storeResult(result);
      this.currentPage.onLeave();
      this.currentPage.destroy();

      if (this.currentIndex === this.descriptors.length - 1) {
        await this.finish();
        return;
      }

      await this.renderPageAt(this.currentIndex + 1);
    } finally {
      if (!this.isComplete) {
        this.shell?.setNextDisabled(false);
      }
      this.isTransitioning = false;
    }
  }

  private async handleBack(): Promise<void> {
    if (this.currentIndex <= 0 || this.isTransitioning || !this.currentPage || !this.shell) {
      return;
    }

    this.isTransitioning = true;
    this.shell.setNextDisabled(true);
    this.shell.setError();

    try {
      this.currentPage.onLeave();
      this.currentPage.destroy();
      await this.renderPageAt(this.currentIndex - 1);
    } finally {
      if (!this.isComplete) {
        this.shell.setNextDisabled(false);
      }
      this.isTransitioning = false;
    }
  }

  private async handleJump(index: number): Promise<void> {
    if (index < 0 || index >= this.descriptors.length) {
      throw new Error(`Cannot jump to index ${index}; out of bounds.`);
    }

    if (this.isTransitioning || this.currentIndex === index || !this.shell) {
      return;
    }

    this.isTransitioning = true;

    try {
      this.currentPage?.onLeave();
      this.currentPage?.destroy();
      await this.renderPageAt(index);
    } finally {
      if (!this.isComplete) {
        this.shell?.setNextDisabled(false);
      }
      this.isTransitioning = false;
    }
  }

  private async renderPageAt(index: number, options: { notifyChange?: boolean } = {}): Promise<void> {
    const shell = this.shell;
    if (!shell) {
      throw new Error('Paginator has not been started.');
    }

    const descriptor = this.descriptors[index];
    const factory = this.registry[descriptor.type];

    if (!factory) {
      throw new Error(`No page registered for type "${descriptor.type}".`);
    }

    const container = shell.getContentContainer();
    container.replaceChildren();

    const key = this.keyFor(descriptor, index);
    const savedData = this.dataByKey.get(key);

    const context: PageFactoryContext = {
      container,
      descriptor,
      flow: this.flowControls,
      savedData,
    };

    const page = factory(context);

    this.currentIndex = index;
    this.currentDescriptor = descriptor;
    this.currentPage = page;
    this.visited.add(index);

    shell.setProgress(index + 1, this.descriptors.length);
    shell.setBackEnabled(index > 0);
    shell.setNextLabel(index === this.descriptors.length - 1 ? 'Submit' : 'Next');
    shell.setError();

    page.onEnter(savedData);
    page.render();

    if (options.notifyChange !== false) {
      this.options.onChange?.(this.getPublicState());
    }

    this.persistState();
  }

  private storeResult(result: PageValidationResult<unknown>): void {
    if (!this.currentDescriptor) {
      return;
    }

    if ('data' in result) {
      const key = this.keyFor(this.currentDescriptor, this.currentIndex);
      this.dataByKey.set(key, result.data);
      this.persistState();
    }
  }

  private async finish(): Promise<void> {
    if (this.isComplete) {
      return;
    }

    this.isComplete = true;

    const payload: PaginationCompletePayload = {
      descriptors: [...this.descriptors],
      dataById: this.buildDataSnapshot(),
    };

    this.options.onComplete?.(payload);

    if (this.shell) {
      this.shell.setNextLabel('Completed');
      this.shell.setNextDisabled(true);
      this.shell.setBackEnabled(false);
    }

    this.clearStorage();
  }

  private buildDataSnapshot(): Record<string, unknown> {
    const snapshot: Record<string, unknown> = {};

    this.descriptors.forEach((descriptor, index) => {
      const key = this.keyFor(descriptor, index);
      if (this.dataByKey.has(key)) {
        snapshot[key] = this.dataByKey.get(key);
      }
    });

    return snapshot;
  }

  private keyFor(descriptor: PageDescriptor, index: number): string {
    return descriptor.id ?? `${descriptor.type}-${index}`;
  }

  private getFlowState(): FlowState {
    return {
      currentIndex: this.currentIndex,
      total: this.descriptors.length,
      hasNext: this.currentIndex < this.descriptors.length - 1,
      hasPrev: this.currentIndex > 0,
      progress: (this.currentIndex + 1) / this.descriptors.length,
    };
  }

  private getPublicState(): FlowPublicState {
    return {
      ...this.getFlowState(),
      descriptor: this.currentDescriptor ?? this.descriptors[this.currentIndex],
    };
  }

  private restoreFromStorage(): void {
    if (!this.storageKey || typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    const raw = window.localStorage.getItem(this.storageKey);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as PersistedPaginatorState;
      if (!parsed || parsed.version !== this.storageVersion) {
        return;
      }

      if (parsed.completed) {
        this.clearStorage();
        return;
      }

      const entries = Object.entries(parsed.dataByKey ?? {});
      entries.forEach(([key, value]) => {
        this.dataByKey.set(key, value);
      });

      if (this.resumeFromStorage) {
        const safeIndex = Number.isInteger(parsed.currentIndex)
          ? Math.min(Math.max(parsed.currentIndex ?? 0, 0), this.descriptors.length - 1)
          : 0;
        this.initialIndex = safeIndex;
      }
    } catch (error) {
      console.warn('Failed to restore paginator state from storage.', error);
    }
  }

  private persistState(): void {
    if (!this.storageKey || typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      const data: Record<string, unknown> = {};
      this.dataByKey.forEach((value, key) => {
        data[key] = value;
      });

      const payload: PersistedPaginatorState = {
        version: this.storageVersion,
        currentIndex: this.currentIndex,
        dataByKey: data,
      };

      window.localStorage.setItem(this.storageKey, JSON.stringify(payload));
    } catch (error) {
      console.warn('Failed to persist paginator state to storage.', error);
    }
  }

  private clearStorage(): void {
    if (!this.storageKey || typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      window.localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.warn('Failed to clear paginator storage.', error);
    }
  }

  setDirection(direction: TextDirection): void {
    this.direction = direction;
    this.shell?.setDirection(direction);
  }

  async reset(): Promise<void> {
    if (this.isTransitioning) {
      return;
    }

    if (!this.shell) {
      this.dataByKey.clear();
      this.visited.clear();
      this.currentPage = undefined;
      this.currentDescriptor = undefined;
      this.currentIndex = -1;
      this.initialIndex = 0;
      this.isComplete = false;
      this.clearStorage();
      this.options.onReset?.();
      return;
    }

    this.isTransitioning = true;
    this.shell.setNextDisabled(true);
    this.shell.setResetDisabled(true);
    this.shell.setError();

    try {
      this.currentPage?.onLeave();
      this.currentPage?.destroy();
      this.currentPage = undefined;
      this.currentDescriptor = undefined;
      this.currentIndex = -1;
      this.initialIndex = 0;
      this.dataByKey.clear();
      this.visited.clear();
      this.isComplete = false;
      this.clearStorage();

      this.options.onReset?.();

      await this.renderPageAt(0);
      this.shell.setNextDisabled(false);
      this.shell.setError();
    } catch (error) {
      console.error('Paginator reset failed.', error);
      this.shell.setError(this.options.defaultErrorMessage ?? 'Unable to reset at this time.');
    } finally {
      this.shell.setResetDisabled(false);
      this.isTransitioning = false;
    }
  }
}

interface PersistedPaginatorState {
  version: string;
  currentIndex: number;
  dataByKey: Record<string, unknown>;
  completed?: boolean;
}
