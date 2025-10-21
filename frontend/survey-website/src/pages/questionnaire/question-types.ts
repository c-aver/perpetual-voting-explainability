export type QuestionVariant = 'select' | 'numeric' | 'shortText' | (string & {});

export interface QuestionDescriptorBase<
  TVariant extends QuestionVariant = QuestionVariant,
  TValue = unknown,
> {
  id: string;
  prompt: string;
  variant: TVariant;
  required?: boolean;
  helpText?: string;
  outputKey?: string | string[];
  meta?: Record<string, unknown>;
  defaultValue?: TValue;
}

export interface SelectQuestionDescriptor
  extends QuestionDescriptorBase<'select', string | undefined> {
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
}

export interface NumericQuestionDescriptor extends QuestionDescriptorBase<'numeric', number> {
  min?: number;
  max?: number;
  step?: number;
  format?: 'integer' | 'decimal';
}

export interface ShortTextQuestionDescriptor
  extends QuestionDescriptorBase<'shortText', string | undefined> {
  placeholder?: string;
  maxLength?: number;
  pattern?: RegExp | string;
}

export type QuestionDescriptor =
  | SelectQuestionDescriptor
  | NumericQuestionDescriptor
  | ShortTextQuestionDescriptor
  | QuestionDescriptorBase;

export interface QuestionValidationResult<TValue = unknown> {
  valid: boolean;
  message?: string;
  value?: TValue;
}

export interface QuestionField<TValue = unknown> {
  element: HTMLElement;
  getValue(): TValue | undefined;
  setValue(value: TValue | undefined): void;
  focus(): void;
  destroy(): void;
}

export interface QuestionVariantContext<TValue> {
  initialValue?: TValue;
  onChange(value: TValue | undefined): void;
}

export interface QuestionVariantDefinition<
  TDescriptor extends QuestionDescriptor = QuestionDescriptor,
  TValue = unknown,
> {
  create(
    descriptor: TDescriptor,
    context: QuestionVariantContext<TValue>,
  ): QuestionField<TValue>;
  validate?(
    descriptor: TDescriptor,
    value: TValue | undefined,
  ): QuestionValidationResult<TValue>;
  coerce?(value: unknown): TValue | undefined;
}

type VariantEntry = QuestionVariantDefinition<QuestionDescriptor, unknown>;

const registry = new Map<string, VariantEntry>();

export function registerQuestionVariant<
  TDescriptor extends QuestionDescriptor,
  TValue,
>(variant: TDescriptor['variant'], definition: QuestionVariantDefinition<TDescriptor, TValue>): void {
  registry.set(variant, definition as VariantEntry);
}

export function getQuestionVariant(variant: string): VariantEntry | undefined {
  return registry.get(variant) ?? registry.get('*');
}

export function listQuestionVariants(): string[] {
  return [...registry.keys()];
}

registerQuestionVariant<SelectQuestionDescriptor, string | undefined>('select', {
  create(descriptor, context) {
    const wrapper = document.createElement('div');
    wrapper.className = 'questionnaire-field questionnaire-field--select';

    const select = document.createElement('select');
    select.className = 'questionnaire-field__control';

    if (descriptor.placeholder) {
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = descriptor.placeholder;
      placeholder.disabled = true;
      placeholder.selected =
        context.initialValue === undefined || context.initialValue === '';
      select.appendChild(placeholder);
    }

    descriptor.options.forEach((option) => {
      const optionEl = document.createElement('option');
      optionEl.value = option.value;
      optionEl.textContent = option.label;
      select.appendChild(optionEl);
    });

    if (context.initialValue !== undefined && context.initialValue !== null) {
      select.value = String(context.initialValue);
    }

    const handleChange = (): void => {
      const value = select.value;
      context.onChange(value === '' ? undefined : value);
    };

    select.addEventListener('change', handleChange);

    wrapper.appendChild(select);

    return {
      element: wrapper,
      getValue: () => {
        const value = select.value;
        return value === '' ? undefined : value;
      },
      setValue: (value) => {
        select.value = value ?? '';
      },
      focus: () => select.focus(),
      destroy: () => select.removeEventListener('change', handleChange),
    } satisfies QuestionField<string | undefined>;
  },
  coerce: (value) => {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }
    return String(value);
  },
});

registerQuestionVariant<NumericQuestionDescriptor, number>('numeric', {
  create(descriptor, context) {
    const wrapper = document.createElement('div');
    wrapper.className = 'questionnaire-field questionnaire-field--numeric';

    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'questionnaire-field__control';

    if (descriptor.min !== undefined) {
      input.min = descriptor.min.toString();
    }
    if (descriptor.max !== undefined) {
      input.max = descriptor.max.toString();
    }
    if (descriptor.step !== undefined) {
      input.step = descriptor.step.toString();
    }
    if (descriptor.format === 'integer' && !input.step) {
      input.step = '1';
    }

    if (context.initialValue !== undefined) {
      input.value = String(context.initialValue);
    } else if (descriptor.defaultValue !== undefined) {
      input.value = String(descriptor.defaultValue);
      context.onChange(descriptor.defaultValue);
    }

    const parseValue = (): number | undefined => {
      const raw = input.value.trim();
      if (raw === '') {
        return undefined;
      }
      const parsed = Number(raw);
      return Number.isFinite(parsed) ? parsed : undefined;
    };

    const handleInput = (): void => {
      context.onChange(parseValue());
    };

    input.addEventListener('input', handleInput);

    wrapper.appendChild(input);

    return {
      element: wrapper,
      getValue: () => parseValue(),
      setValue: (value) => {
        input.value = value !== undefined ? String(value) : '';
      },
      focus: () => input.focus(),
      destroy: () => input.removeEventListener('input', handleInput),
    } satisfies QuestionField<number>;
  },
  validate(descriptor, value) {
    if (value === undefined) {
      return { valid: true };
    }

    if (descriptor.min !== undefined && value < descriptor.min) {
      return { valid: false, message: `Value must be at least ${descriptor.min}.` };
    }

    if (descriptor.max !== undefined && value > descriptor.max) {
      return { valid: false, message: `Value must be at most ${descriptor.max}.` };
    }

    if (descriptor.format === 'integer' && !Number.isInteger(value)) {
      return { valid: false, message: 'Value must be an integer.' };
    }

    if (descriptor.step && descriptor.step > 0) {
      const base = descriptor.min ?? 0;
      const ratio = (value - base) / descriptor.step;
      const nearInteger = Math.abs(ratio - Math.round(ratio)) <= 1e-8;
      if (!nearInteger) {
        return { valid: false, message: `Value must increment by ${descriptor.step}.` };
      }
    }

    return { valid: true, value };
  },
  coerce: (value) => {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }
    const parsed = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  },
});

registerQuestionVariant<ShortTextQuestionDescriptor, string | undefined>('shortText', {
  create(descriptor, context) {
    const wrapper = document.createElement('div');
    wrapper.className = 'questionnaire-field questionnaire-field--short-text';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'questionnaire-field__control';
    input.placeholder = descriptor.placeholder ?? '';

    if (descriptor.maxLength) {
      input.maxLength = descriptor.maxLength;
    }

    if (context.initialValue !== undefined) {
      input.value = context.initialValue;
    }

    const handleInput = (): void => {
      const raw = input.value;
      context.onChange(raw.trim() === '' ? undefined : raw);
    };

    input.addEventListener('input', handleInput);

    wrapper.appendChild(input);

    return {
      element: wrapper,
      getValue: () => {
        const raw = input.value.trim();
        return raw === '' ? undefined : input.value;
      },
      setValue: (value) => {
        input.value = value ?? '';
      },
      focus: () => input.focus(),
      destroy: () => input.removeEventListener('input', handleInput),
    } satisfies QuestionField<string | undefined>;
  },
  validate(descriptor, value) {
    if (value === undefined) {
      return { valid: true };
    }

    if (descriptor.maxLength && value.length > descriptor.maxLength) {
      return {
        valid: false,
        message: `Response must be shorter than ${descriptor.maxLength} characters.`,
      };
    }

    if (descriptor.pattern) {
      const pattern = typeof descriptor.pattern === 'string'
        ? new RegExp(descriptor.pattern)
        : descriptor.pattern;
      if (!pattern.test(value)) {
        return { valid: false, message: 'Response does not match the required format.' };
      }
    }

    return { valid: true, value };
  },
  coerce: (value) => {
    if (value === undefined || value === null) {
      return undefined;
    }
    return String(value);
  },
});

registerQuestionVariant<QuestionDescriptor, unknown>('*', {
  create: () => {
    const element = document.createElement('div');
    element.className = 'questionnaire-field questionnaire-field--unsupported';
    element.textContent = 'Unsupported question type';
    return {
      element,
      getValue: () => undefined,
      setValue: () => undefined,
      focus: () => element.focus(),
      destroy: () => undefined,
    } satisfies QuestionField<unknown>;
  },
  validate: () => ({ valid: true }),
});