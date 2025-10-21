import { BasePage } from '../base-page.ts';
import type { PageValidationResult } from '../../pagination/types.ts';
import {
  getQuestionVariant,
  type QuestionDescriptor,
  type QuestionField,
  type QuestionValidationResult,
} from './question-types.ts';

export interface QuestionnairePageProps {
  title?: string;
  description?: string;
  questions: QuestionDescriptor[];
  summaryKey?: string;
  questionSource?: string;
}

export interface QuestionnaireAnswer<TValue = unknown> {
  value: TValue;
  variant: string;
  questionId: string;
  metadata?: Record<string, unknown>;
}

export interface QuestionnairePageResult {
  answers: Record<string, QuestionnaireAnswer>;
  submission: Record<string, unknown>;
}

interface QuestionInstance {
  descriptor: QuestionDescriptor;
  field: QuestionField<unknown>;
  container: HTMLDivElement;
  errorEl: HTMLParagraphElement;
  value?: unknown;
}

export class QuestionnairePage extends BasePage<QuestionnairePageResult, QuestionnairePageProps> {
  private readonly instances: QuestionInstance[] = [];
  private readonly answerMap = new Map<string, QuestionnaireAnswer>();

  onEnter(data?: QuestionnairePageResult): void {
    super.onEnter(data);
    this.answerMap.clear();
    if (data?.answers) {
      Object.values(data.answers).forEach((answer) => {
        this.answerMap.set(answer.questionId, answer);
      });
    }
  }

  render(): void {
    const props = this.descriptor.props ?? { questions: [] };
    this.instances.length = 0;

    const wrapper = document.createElement('div');
    wrapper.className = 'questionnaire-page';

    if (props.title) {
      const heading = document.createElement('h2');
      heading.className = 'questionnaire-page__title';
      heading.textContent = props.title;
      wrapper.appendChild(heading);
    }

    if (props.description) {
      const description = document.createElement('p');
      description.className = 'questionnaire-page__description';
      description.textContent = props.description;
      wrapper.appendChild(description);
    }

    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'questionnaire-page__questions';

    props.questions.forEach((question) => {
      const instance = this.createQuestionInstance(question);
      this.instances.push(instance);
      questionsContainer.appendChild(instance.container);
    });

    wrapper.appendChild(questionsContainer);
    this.container.replaceChildren(wrapper);

    this.updateNextButtonState();
  }

  destroy(): void {
    this.instances.forEach((instance) => {
      instance.field.destroy();
    });
    this.instances.length = 0;
    super.destroy();
  }

  async validate(): Promise<PageValidationResult<QuestionnairePageResult>> {
    const props = this.descriptor.props ?? { questions: [] };
    const answers: Record<string, QuestionnaireAnswer> = {};
    const submission: Record<string, unknown> = {};
    let firstInvalid: QuestionInstance | undefined;
    let firstValidationMessage: string | undefined;

    for (const instance of this.instances) {
      const value = instance.field.getValue();
      instance.value = value;

      this.clearQuestionError(instance);

      const descriptor = instance.descriptor;
      const variantDefinition = getQuestionVariant(descriptor.variant);

      const hasValue = value !== undefined && value !== null && value !== '';
      if (descriptor.required && !hasValue) {
        this.setQuestionError(instance, 'This question is required.');
        if (!firstInvalid) {
          firstInvalid = instance;
          firstValidationMessage = 'Please complete all required questions.';
        }
        continue;
      }

      let validated: QuestionValidationResult | undefined;
      if (variantDefinition?.validate) {
        validated = variantDefinition.validate(descriptor as QuestionDescriptor, value);
        if (!validated.valid) {
          this.setQuestionError(instance, validated.message ?? 'Invalid response.');
          if (!firstInvalid) {
            firstInvalid = instance;
            firstValidationMessage = validated.message;
          }
          continue;
        }
      }

      if (!hasValue) {
        continue;
      }

      const payload: QuestionnaireAnswer = {
        value: validated?.value ?? value,
        variant: descriptor.variant,
        questionId: descriptor.id,
        metadata: descriptor.meta,
      };
      answers[descriptor.id] = payload;
      this.answerMap.set(descriptor.id, payload);
  this.applySubmissionValue(submission, descriptor.outputKey ?? descriptor.id, payload.value);
    }

    if (firstInvalid) {
      firstInvalid.field.focus();
      return {
        valid: false,
        message: firstValidationMessage ?? 'Please review the highlighted questions.',
      };
    }

    const submissionPayload = props.summaryKey
      ? { [props.summaryKey]: submission }
      : submission;

    return {
      valid: true,
      data: {
        answers,
        submission: submissionPayload,
      },
    };
  }

  private createQuestionInstance(descriptor: QuestionDescriptor): QuestionInstance {
    const container = document.createElement('div');
    container.className = 'questionnaire-question';
    container.dataset.questionId = descriptor.id;

    const label = document.createElement('label');
    label.className = 'questionnaire-question__label';
    label.textContent = descriptor.prompt;
    container.appendChild(label);

    if (descriptor.helpText) {
      const help = document.createElement('p');
      help.className = 'questionnaire-question__help';
      help.textContent = descriptor.helpText;
      container.appendChild(help);
    }

    const errorEl = document.createElement('p');
    errorEl.className = 'questionnaire-question__error';
    errorEl.hidden = true;

    const savedAnswer = this.answerMap.get(descriptor.id);
    const variantDefinition = getQuestionVariant(descriptor.variant);

    const initialValueRaw = savedAnswer?.value;
    const initialValue = variantDefinition?.coerce
      ? variantDefinition.coerce(initialValueRaw)
      : initialValueRaw;

    if (savedAnswer) {
      if (initialValue === undefined) {
        this.answerMap.delete(descriptor.id);
      } else if (initialValue !== savedAnswer.value) {
        this.answerMap.set(descriptor.id, {
          value: initialValue,
          variant: descriptor.variant,
          questionId: descriptor.id,
          metadata: savedAnswer.metadata ?? descriptor.meta,
        });
      }
    }

    let instance: QuestionInstance;

    const field = variantDefinition?.create(descriptor as QuestionDescriptor, {
      initialValue,
      onChange: (value) => {
        if (value === undefined || value === null || value === '') {
          this.answerMap.delete(descriptor.id);
        } else {
          this.answerMap.set(descriptor.id, {
            value,
            variant: descriptor.variant,
            questionId: descriptor.id,
            metadata: descriptor.meta,
          });
        }
        if (instance) {
          instance.value = value;
          this.clearQuestionError(instance);
        }
        this.updateNextButtonState();
        this.flow.setError();
      },
    }) ?? this.createFallbackField();

    const fieldElement = field.element;
    fieldElement.classList.add('questionnaire-question__field');
    container.appendChild(fieldElement);

    container.appendChild(errorEl);

    instance = {
      descriptor,
      field,
      container,
      errorEl,
    };

    this.clearQuestionError(instance);
  instance.value = initialValue;

    return instance;
  }

  private clearQuestionError(instance: QuestionInstance): void {
    instance.container.classList.remove('questionnaire-question--invalid');
    instance.errorEl.hidden = true;
    instance.errorEl.textContent = '';
  }

  private setQuestionError(instance: QuestionInstance, message: string): void {
    instance.container.classList.add('questionnaire-question--invalid');
    instance.errorEl.hidden = false;
    instance.errorEl.textContent = message;
  }

  private updateNextButtonState(): void {
    const props = this.descriptor.props ?? { questions: [] };

    const allRequiredSatisfied = props.questions.every((question) => {
      if (!question.required) {
        return true;
      }
      return this.answerMap.has(question.id);
    });

    this.flow.setNextEnabled(allRequiredSatisfied);
  }

  private applySubmissionValue(
    target: Record<string, unknown>,
    key: string | string[],
    value: unknown,
  ): void {
    const path = Array.isArray(key)
      ? key
      : key.split('.').map((segment) => segment.trim()).filter(Boolean);

    if (path.length === 0) {
      return;
    }

    let cursor: Record<string, unknown> = target;
    for (let index = 0; index < path.length - 1; index += 1) {
      const segment = path[index];
      if (!Object.prototype.hasOwnProperty.call(cursor, segment)) {
        cursor[segment] = {};
      }
      const next = cursor[segment];
      if (typeof next !== 'object' || next === null || Array.isArray(next)) {
        cursor[segment] = {};
      }
      cursor = cursor[segment] as Record<string, unknown>;
    }

    cursor[path[path.length - 1]] = value;
  }

  private createFallbackField(): QuestionField<unknown> {
    const container = document.createElement('div');
    container.className = 'questionnaire-field questionnaire-field--unsupported';
    container.textContent = 'Unsupported question type';
    container.tabIndex = -1;
    return {
      element: container,
      getValue: () => undefined,
      setValue: () => undefined,
      focus: () => container.focus(),
      destroy: () => undefined,
    };
  }
}
