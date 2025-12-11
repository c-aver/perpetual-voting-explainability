import { BasePage } from '../base-page.ts';
import type { PageValidationResult } from '../../pagination/types.ts';
import {
  getQuestionVariant,
  type QuestionDescriptor,
  type QuestionField,
  type QuestionValidationResult,
} from './question-types.ts';

/**
 * Props describing a questionnaire page composed of multiple questions.
 */
export interface QuestionnairePageProps {
  title?: string;
  description?: string;
  questions: QuestionDescriptor[];
  summaryKey?: string;
  attemptTracking?: {
    outputKey?: string | string[];
    label?: string;
    showSummary?: boolean;
  };
}

/**
 * Normalized answer payload stored for each question after validation.
 */
export interface QuestionnaireAnswer<TValue = unknown> {
  value: TValue;
  variant: string;
  questionId: string;
  metadata?: Record<string, unknown>;
}

/**
 * Data returned by the questionnaire page containing answer metadata and submission payload.
 */
export interface QuestionnairePageResult {
  answers: Record<string, QuestionnaireAnswer>;
  submission: Record<string, unknown>;
  incorrectAttempts?: number;
}

interface QuestionInstance {
  descriptor: QuestionDescriptor;
  field: QuestionField<unknown>;
  container: HTMLDivElement;
  errorEl: HTMLParagraphElement;
  value?: unknown;
}

/**
 * Renders structured question groups and collects validated answers.
 */
export class QuestionnairePage extends BasePage<QuestionnairePageResult, QuestionnairePageProps> {
  private readonly instances: QuestionInstance[] = [];
  private readonly answerMap = new Map<string, QuestionnaireAnswer>();
  private incorrectAttemptCount = 0;
  private attemptSummaryEl?: HTMLParagraphElement;
  private supportsCorrectAnswers = false;

  onEnter(data?: QuestionnairePageResult): void {
    super.onEnter(data);
    this.answerMap.clear();
    if (data?.answers) {
      Object.values(data.answers).forEach((answer) => {
        this.answerMap.set(answer.questionId, answer);
      });
    }
    this.incorrectAttemptCount = data?.incorrectAttempts ?? 0;
  }

  render(): void {
    const props = this.descriptor.props ?? { questions: [] };
    this.instances.length = 0;
    this.supportsCorrectAnswers = props.questions.some(
      (question) => question.correctAnswer !== undefined && question.correctAnswer !== null,
    );

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
      this.setMultilineContent(description, props.description);
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

    const shouldShowAttempts = props.attemptTracking?.showSummary ?? true;
    if (props.attemptTracking && shouldShowAttempts && this.supportsCorrectAnswers) {
      const attemptSummary = document.createElement('p');
      attemptSummary.className = 'questionnaire-page__attempts';
      this.attemptSummaryEl = attemptSummary;
      wrapper.appendChild(attemptSummary);
      this.updateAttemptSummary();
    } else {
      this.attemptSummaryEl = undefined;
    }

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
    const validationCopy = this.copy.validation.questionnaire;
    let hadIncorrectAnswer = false;
    let hadMissingRequired = false;

    for (const instance of this.instances) {
      const value = instance.field.getValue();
      instance.value = value;

      this.clearQuestionError(instance);

      const descriptor = instance.descriptor;
      const variantDefinition = getQuestionVariant(descriptor.variant);

      const hasValue = value !== undefined && value !== null && value !== '';
      if (descriptor.required && !hasValue) {
        this.setQuestionError(instance, validationCopy.questionRequired);
        hadMissingRequired = true;
        if (!firstInvalid) {
          firstInvalid = instance;
          firstValidationMessage = validationCopy.summaryRequired;
        }
        continue;
      }

      let validated: QuestionValidationResult | undefined;
      if (variantDefinition?.validate) {
        validated = variantDefinition.validate(descriptor as QuestionDescriptor, value, this.copy);
        if (!validated.valid) {
          const validationMessage = validated.message ?? validationCopy.invalidResponse;
          this.setQuestionError(instance, validationMessage);
          if (!firstInvalid) {
            firstInvalid = instance;
            firstValidationMessage = validationMessage;
          }
          continue;
        }
      }

      if (!hasValue) {
        continue;
      }

      const normalizedValue = validated?.value ?? value;

      if (descriptor.correctAnswer !== undefined && descriptor.correctAnswer !== null) {
        if (!this.isAnswerCorrect(descriptor.correctAnswer, normalizedValue)) {
          this.setQuestionError(instance, validationCopy.incorrectAnswer, 'incorrect');
          hadIncorrectAnswer = true;
          if (!firstInvalid) {
            firstInvalid = instance;
            firstValidationMessage = validationCopy.reviewPrompt;
          }
          continue;
        }
      }

      const payload: QuestionnaireAnswer = {
        value: normalizedValue,
        variant: descriptor.variant,
        questionId: descriptor.id,
        metadata: descriptor.meta,
      };
      answers[descriptor.id] = payload;
      this.answerMap.set(descriptor.id, payload);
      this.applySubmissionValue(submission, descriptor.outputKey ?? descriptor.id, payload.value);
    }

    if (this.supportsCorrectAnswers && this.descriptor.props?.attemptTracking?.outputKey) {
      this.applySubmissionValue(
        submission,
        this.descriptor.props.attemptTracking.outputKey,
        this.incorrectAttemptCount,
      );
    }

    if (firstInvalid) {
      if (hadIncorrectAnswer && !hadMissingRequired) {
        this.recordIncorrectAttempt();
      }
      firstInvalid.field.focus();
      return {
        valid: false,
        message: firstValidationMessage ?? validationCopy.reviewPrompt,
      };
    }

    const submissionPayload = props.summaryKey
      ? { [props.summaryKey]: submission }
      : submission;

    const persistedResult: QuestionnairePageResult = {
      answers,
      submission: submissionPayload,
    };
    if (this.supportsCorrectAnswers) {
      persistedResult.incorrectAttempts = this.incorrectAttemptCount;
    }

    this.persistData(persistedResult);

    const resultData: QuestionnairePageResult = this.supportsCorrectAnswers
      ? {
        answers,
        submission: submissionPayload,
        incorrectAttempts: this.incorrectAttemptCount,
      }
      : {
        answers,
        submission: submissionPayload,
      };

    return {
      valid: true,
      data: resultData,
    };
  }

  /**
   * Builds the DOM and variant wiring for a single question descriptor.
   */
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
        this.persistState();
      },
      copy: this.copy,
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

  /**
   * Removes validation error styling from a question container.
   */
  private clearQuestionError(instance: QuestionInstance): void {
    instance.container.classList.remove('questionnaire-question--invalid');
    instance.container.classList.remove('questionnaire-question--incorrect');
    instance.errorEl.hidden = true;
    instance.errorEl.textContent = '';
  }

  /**
   * Applies validation error styling and message to a question container.
   */
  private setQuestionError(
    instance: QuestionInstance,
    message: string,
    variant: 'invalid' | 'incorrect' = 'invalid',
  ): void {
    const cssClass =
      variant === 'incorrect'
        ? 'questionnaire-question--incorrect'
        : 'questionnaire-question--invalid';
    instance.container.classList.add(cssClass);
    instance.errorEl.hidden = false;
    instance.errorEl.textContent = message;
  }

  /**
   * Enables the Next button only when all required questions have recorded answers.
   */
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

  private persistState(): void {
    const props = this.descriptor.props ?? { questions: [] };
    const answers: Record<string, QuestionnaireAnswer> = {};
    const submission: Record<string, unknown> = {};

    props.questions.forEach((question) => {
      const answer = this.answerMap.get(question.id);
      if (!answer) {
        return;
      }
      answers[question.id] = answer;
      this.applySubmissionValue(submission, question.outputKey ?? question.id, answer.value);
    });

    if (this.supportsCorrectAnswers && this.descriptor.props?.attemptTracking?.outputKey) {
      this.applySubmissionValue(
        submission,
        this.descriptor.props.attemptTracking.outputKey,
        this.incorrectAttemptCount,
      );
    }

    const submissionPayload = props.summaryKey
      ? { [props.summaryKey]: submission }
      : submission;

    const persistedResult: QuestionnairePageResult = {
      answers,
      submission: submissionPayload,
    };
    if (this.supportsCorrectAnswers) {
      persistedResult.incorrectAttempts = this.incorrectAttemptCount;
    }

    this.persistData(persistedResult);
  }

  /**
   * Writes an answer value into the submission object using dot-notation or path arrays.
   */
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

  private setMultilineContent(target: HTMLElement, value: string): void {
    target.textContent = '';
    const segments = value.split(/\n/g);
    segments.forEach((segment, index) => {
      target.append(document.createTextNode(segment));
      if (index < segments.length - 1) {
        target.append(document.createElement('br'));
      }
    });
  }

  private recordIncorrectAttempt(): void {
    if (!this.supportsCorrectAnswers) {
      return;
    }
    this.incorrectAttemptCount += 1;
    this.updateAttemptSummary();
    this.persistState();
  }

  private updateAttemptSummary(): void {
    if (!this.attemptSummaryEl) {
      return;
    }

    if (!this.incorrectAttemptCount) {
      this.attemptSummaryEl.hidden = true;
      this.attemptSummaryEl.textContent = '';
      return;
    }

    const propLabel = this.descriptor.props?.attemptTracking?.label;
    const label = propLabel
      ? `${propLabel} ${this.incorrectAttemptCount}`
      : this.copy.questionnairePage?.attemptCounterLabel?.(this.incorrectAttemptCount)
        ?? `Incorrect attempts: ${this.incorrectAttemptCount}`;
    this.attemptSummaryEl.hidden = false;
    this.attemptSummaryEl.textContent = label;
  }

  private isAnswerCorrect(expected: unknown, actual: unknown): boolean {
    if (typeof expected === 'string' && typeof actual === 'string') {
      return expected.trim().toLowerCase() === actual.trim().toLowerCase();
    }
    return expected === actual;
  }

  /**
   * Provides a minimal fallback field for unsupported question variants.
   */
  private createFallbackField(): QuestionField<unknown> {
    const container = document.createElement('div');
    container.className = 'questionnaire-field questionnaire-field--unsupported';
    container.textContent = this.copy.validation.questionnaire.unsupportedQuestion;
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
