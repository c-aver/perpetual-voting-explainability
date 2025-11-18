import type { LocalizationBundle, TextDirection } from './types.ts';

/**
 * Callbacks and display preferences for the survey shell UI wrapper.
 */
interface SurveyShellOptions {
  onNext: () => void;
  onBack: () => void;
  onReset?: () => void;
  enableProgress?: boolean;
  direction?: TextDirection;
  copy: LocalizationBundle['shell'];
}

/**
 * Renders the shared survey chrome (progress, navigation, errors) around each page.
 */
export class SurveyShell {
  private readonly root: HTMLDivElement;
  private readonly options: SurveyShellOptions;
  private readonly wrapper: HTMLDivElement;
  private readonly progressEl: HTMLParagraphElement;
  private readonly contentEl: HTMLDivElement;
  private readonly messageEl: HTMLParagraphElement;
  private readonly navEl: HTMLDivElement;
  private readonly navActions: HTMLDivElement;
  private readonly resetButton: HTMLButtonElement;
  private readonly backButton: HTMLButtonElement;
  private readonly nextButton: HTMLButtonElement;
  private direction: TextDirection;
  private readonly copy: LocalizationBundle['shell'];
  private readonly handleReset: () => void;

  constructor(root: HTMLDivElement, options: SurveyShellOptions) {
    this.root = root;
    this.options = options;
    this.direction = options.direction ?? 'ltr';
    this.copy = options.copy;

    this.wrapper = document.createElement('div');
    this.wrapper.className = 'survey-shell';
    this.wrapper.dir = this.direction;

    this.progressEl = document.createElement('p');
    this.progressEl.className = 'survey-shell__progress';
    this.progressEl.setAttribute('aria-live', 'polite');
  this.progressEl.hidden = !options.enableProgress;

    this.contentEl = document.createElement('div');
    this.contentEl.className = 'survey-shell__content';

    this.messageEl = document.createElement('p');
    this.messageEl.className = 'survey-shell__message';
    this.messageEl.setAttribute('role', 'alert');
  this.messageEl.hidden = true;

    this.navEl = document.createElement('div');
    this.navEl.className = 'survey-shell__nav';

    this.handleReset = () => {
      if (!this.options.onReset) {
        return;
      }

      const shouldReset = typeof window !== 'undefined' && typeof window.confirm === 'function'
        ? window.confirm(this.copy.prompts.resetConfirm)
        : true;

      if (shouldReset) {
        this.options.onReset();
      }
    };

    this.resetButton = document.createElement('button');
    this.resetButton.type = 'button';
    this.resetButton.className = 'survey-shell__reset';
    this.resetButton.textContent = this.copy.labels.reset;
    this.resetButton.addEventListener('click', this.handleReset);
    this.resetButton.disabled = !this.options.onReset;

    this.backButton = document.createElement('button');
    this.backButton.type = 'button';
    this.backButton.className = 'survey-shell__back';
    this.backButton.dataset.role = 'back';
    this.backButton.textContent = this.copy.labels.back;
    this.backButton.addEventListener('click', this.options.onBack);

    this.nextButton = document.createElement('button');
    this.nextButton.type = 'button';
    this.nextButton.className = 'survey-shell__next';
    this.nextButton.dataset.role = 'next';
    this.nextButton.textContent = this.copy.labels.next;
    this.nextButton.addEventListener('click', this.options.onNext);

    this.navActions = document.createElement('div');
    this.navActions.className = 'survey-shell__nav-actions';
    this.navActions.append(this.backButton, this.nextButton);

    this.navEl.append(this.resetButton, this.navActions);

    this.wrapper.append(
      this.progressEl,
      this.contentEl,
      this.messageEl,
      this.navEl,
    );

    this.applyDirection(this.direction);

    this.root.replaceChildren(this.wrapper);
  }

  /**
   * Returns the DOM node where pages should render their content.
   */
  getContentContainer(): HTMLDivElement {
    return this.contentEl;
  }

  /**
   * Updates the progress indicator when progress tracking is enabled.
   */
  setProgress(current: number, total: number): void {
    if (!this.options.enableProgress) {
      this.progressEl.textContent = '';
      this.progressEl.hidden = true;
      return;
    }

    this.progressEl.hidden = false;
    this.progressEl.textContent = this.copy.progressLabel(current, total);
  }

  /**
   * Enables or disables the primary navigation button.
   */
  setNextDisabled(disabled: boolean): void {
    this.nextButton.disabled = disabled;
  }

  /**
   * Shows or hides the back button and toggles its disabled state.
   */
  setBackEnabled(enabled: boolean): void {
    this.backButton.disabled = !enabled;
    this.backButton.hidden = !enabled;
  }

  /**
   * Updates the label shown on the primary navigation button.
   */
  setNextLabel(label: string): void {
    this.nextButton.textContent = label;
  }

  /**
   * Displays validation or submission errors in the shell message area.
   */
  setError(message?: string): void {
    if (!message) {
      this.messageEl.textContent = '';
      this.messageEl.hidden = true;
      return;
    }

    this.messageEl.hidden = false;
    this.messageEl.textContent = message;
  }

  /**
   * Removes event listeners and detaches shell markup from the root node.
   */
  teardown(): void {
    this.backButton.removeEventListener('click', this.options.onBack);
    this.nextButton.removeEventListener('click', this.options.onNext);
    this.resetButton.removeEventListener('click', this.handleReset);
    this.root.replaceChildren();
  }

  /**
   * Applies a new text direction to the shell and reorders navigation controls accordingly.
   */
  setDirection(direction: TextDirection): void {
    this.direction = direction;
    this.applyDirection(direction);
  }

  /**
   * Toggles the availability of the reset button while respecting whether a reset handler exists.
   */
  setResetDisabled(disabled: boolean): void {
    this.resetButton.disabled = disabled || !this.options.onReset;
  }

  /**
   * Synchronizes DOM attributes and button order with the active text direction.
   */
  private applyDirection(direction: TextDirection): void {
    this.wrapper.dir = direction;

    if (direction === 'rtl') {
      this.navActions.replaceChildren(this.nextButton, this.backButton);
      this.navEl.replaceChildren(this.navActions, this.resetButton);
      this.progressEl.style.textAlign = 'left';
    } else {
      this.navActions.replaceChildren(this.backButton, this.nextButton);
      this.navEl.replaceChildren(this.resetButton, this.navActions);
      this.progressEl.style.textAlign = 'right';
    }
  }
}
