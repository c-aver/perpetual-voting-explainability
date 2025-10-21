import { BasePage } from './base-page.ts';
import type { PageValidationResult } from '../pagination/types.ts';

type TextInputSavedData = {
  value: string;
};

export interface TextInputPageProps {
  prompt: string;
  placeholder?: string;
  helperText?: string;
  rows?: number;
  required?: boolean;
  maxLength?: number;
  autosaveKey?: string;
}

export interface TextInputPageResult extends TextInputSavedData {
  metadata?: {
    updatedAt: string;
    length: number;
  };
}

export class TextInputPage extends BasePage<TextInputPageResult, TextInputPageProps> {
  private textarea?: HTMLTextAreaElement;
  private counterEl?: HTMLSpanElement;
  private errorEl?: HTMLParagraphElement;
  private currentValue = '';
  private onInputBound = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    this.currentValue = target.value;
    this.updateUiState();
    this.clearError();
    this.syncNextButtonState();
    this.flow.setError();
    const trimmed = this.currentValue.trim();
    if (trimmed.length === 0 && !(this.descriptor.props?.required)) {
      this.savedData = undefined;
      this.persistAutosave(null);
      return;
    }

    this.persistAutosave({
      value: this.currentValue,
      metadata: {
        updatedAt: new Date().toISOString(),
        length: this.currentValue.length,
      },
    });
  };

  onEnter(data?: TextInputPageResult): void {
    super.onEnter(data);
    this.currentValue = data?.value ?? '';
  }

  render(): void {
    const props = this.descriptor.props ?? { prompt: '' };
    const wrapper = document.createElement('div');
    wrapper.className = 'text-input-page';

    const promptEl = document.createElement('h2');
    promptEl.className = 'text-input-page__prompt';
    promptEl.textContent = props.prompt;
    wrapper.appendChild(promptEl);

    if (props.helperText) {
      const helperDesc = document.createElement('p');
      helperDesc.className = 'text-input-page__helper';
      helperDesc.textContent = props.helperText;
      wrapper.appendChild(helperDesc);
    }

    const textarea = document.createElement('textarea');
    textarea.className = 'text-input-page__input';
    textarea.placeholder = props.placeholder ?? '';
    textarea.value = this.currentValue;
    textarea.rows = props.rows ?? 6;
    textarea.addEventListener('input', this.onInputBound);
    textarea.autocomplete = 'off';
    textarea.spellcheck = true;
    textarea.setAttribute('aria-label', props.prompt);

    if (props.maxLength && props.maxLength > 0) {
      textarea.maxLength = props.maxLength;
    }

    wrapper.appendChild(textarea);
    this.textarea = textarea;

  const errorEl = document.createElement('p');
  errorEl.className = 'text-input-page__error';
  errorEl.hidden = true;
  wrapper.appendChild(errorEl);
  this.errorEl = errorEl;

    const footer = document.createElement('div');
    footer.className = 'text-input-page__footer';

    const counter = document.createElement('span');
    counter.className = 'text-input-page__counter';
    footer.appendChild(counter);
    this.counterEl = counter;

    wrapper.appendChild(footer);

    this.container.replaceChildren(wrapper);
    this.updateUiState();
    this.syncNextButtonState();

    if (props.autosaveKey && typeof window !== 'undefined' && window.localStorage) {
      this.restoreFromAutosave(props.autosaveKey);
    }
  }

  destroy(): void {
    if (this.textarea) {
      this.textarea.removeEventListener('input', this.onInputBound);
    }
    super.destroy();
  }

  async validate(): Promise<PageValidationResult<TextInputPageResult>> {
    const props = this.descriptor.props ?? { prompt: '' };
    const value = this.textarea?.value ?? this.currentValue;
    const trimmed = value.trim();

    if (props.required && trimmed.length === 0) {
      this.showError('This response is required.');
      return { valid: false, message: 'Please provide a response before continuing.' };
    }

    if (props.maxLength && trimmed.length > props.maxLength) {
      this.showError(`Response must be shorter than ${props.maxLength} characters.`);
      return {
        valid: false,
        message: `Response must be shorter than ${props.maxLength} characters.`,
      };
    }

    if (!props.required && trimmed.length === 0) {
      this.clearError();
      this.persistAutosave(null);
      this.savedData = undefined;
      return { valid: true };
    }

    const result: TextInputPageResult = {
      value,
      metadata: {
        updatedAt: new Date().toISOString(),
        length: value.length,
      },
    };

    this.clearError();
    this.persistAutosave(result);
    this.savedData = result;

    return { valid: true, data: result };
  }

  private updateUiState(): void {
    const value = this.textarea?.value ?? this.currentValue;
    const props = this.descriptor.props;

    if (this.counterEl && props?.maxLength) {
      this.counterEl.textContent = `${value.length}/${props.maxLength}`;
    } else if (this.counterEl) {
      this.counterEl.textContent = `${value.length}`;
    }
  }

  private syncNextButtonState(): void {
    const props = this.descriptor.props;
    if (!props?.required) {
      this.flow.setNextEnabled(true);
      return;
    }

    const value = (this.textarea?.value ?? this.currentValue).trim();
    this.flow.setNextEnabled(value.length > 0);
  }

  private showError(message: string): void {
    if (this.errorEl) {
      this.errorEl.textContent = message;
      this.errorEl.hidden = false;
    }
  }

  private clearError(): void {
    if (this.errorEl) {
      this.errorEl.textContent = '';
      this.errorEl.hidden = true;
    }
  }

  private restoreFromAutosave(key: string): void {
    if (!window?.localStorage) {
      return;
    }

    try {
      const payload = window.localStorage.getItem(key);
      if (!payload) {
        return;
      }

      const parsed = JSON.parse(payload) as TextInputPageResult;
      if (parsed && typeof parsed.value === 'string') {
        this.currentValue = parsed.value;
        if (this.textarea) {
          this.textarea.value = parsed.value;
        }
        this.updateUiState();
        this.syncNextButtonState();
      }
    } catch (error) {
      console.warn('Failed to restore autosaved text input data.', error);
    }
  }

  private persistAutosave(result: TextInputPageResult | null): void {
    const key = this.descriptor.props?.autosaveKey;
    if (!key || !window?.localStorage) {
      return;
    }

    try {
      if (!result) {
        window.localStorage.removeItem(key);
        return;
      }

      window.localStorage.setItem(key, JSON.stringify(result));
    } catch (error) {
      console.warn('Failed to persist autosaved text input data.', error);
    }
  }
}
