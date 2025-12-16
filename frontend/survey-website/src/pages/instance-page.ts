import { BasePage } from './base-page.ts';
import type { PageValidationResult } from '../pagination/types.ts';
import type {
  InstanceDayConfig,
  InstancePagePropsConfig,
  InstanceRatingConfig,
  InstanceVoterConfig,
} from '../config/types.ts';

export interface InstancePageResult {
  revealedVotes: number;
  revealedWinners: number;
  totalDays: number;
  rating?: number;
  maxRating: number;
  revealedDays?: number;
  expandedExplanationDay?: number | null;
  additionalFeedback?: string;
}

const DEFAULT_SLIDER_LENGTH = 5;

/**
 * Presents a perpetual voting instance round-by-round and captures a fairness rating.
 */
export class InstancePage extends BasePage<InstancePageResult, InstancePagePropsConfig> {
  private revealedVoteDays = 0;
  private revealedWinnerDays = 0;
  private rating?: number;
  private tableContainer?: HTMLDivElement;
  private winnersContainer?: HTMLDivElement;
  private revealButton?: HTMLButtonElement;
  private ratingContainer?: HTMLDivElement;
  private ratingValueLabel?: HTMLSpanElement;
  private feedbackContainer?: HTMLDivElement;
  private feedbackInput?: HTMLTextAreaElement;
  private highlightedDay?: number;
  private pendingScrollDay?: number;
  private expandedExplanationDay?: number | null;
  private additionalFeedback?: string;
  private readonly revealHandler = () => this.handleRevealNextDay();
  private readonly explanationToggleHandler = (event: Event) => this.handleExplanationToggle(event);
  private readonly feedbackInputHandler = (event: Event) => this.handleFeedbackInput(event);

  onEnter(data?: InstancePageResult): void {
    super.onEnter(data);
    const totalDays = this.getTotalDays();
    const savedVotes = typeof data?.revealedVotes === 'number'
      ? data.revealedVotes
      : data?.revealedDays;
    const savedWinners = typeof data?.revealedWinners === 'number'
      ? data.revealedWinners
      : data?.revealedDays;

    this.revealedVoteDays = this.normalizeDayCount(savedVotes, totalDays);
    this.revealedWinnerDays = this.normalizeDayCount(savedWinners, this.revealedVoteDays);
    this.rating = data?.rating;
    this.highlightedDay = undefined;
    this.pendingScrollDay = undefined;
    this.additionalFeedback = typeof data?.additionalFeedback === 'string' ? data.additionalFeedback : '';

    const savedExpandedRaw = data?.expandedExplanationDay;
    const normalizedExpanded = this.normalizeDayCount(
      typeof savedExpandedRaw === 'number' ? savedExpandedRaw : undefined,
      this.revealedWinnerDays,
    );
    if (normalizedExpanded > 0) {
      this.expandedExplanationDay = normalizedExpanded;
    } else if (savedExpandedRaw === null) {
      this.expandedExplanationDay = null;
    } else if (this.revealedWinnerDays > 0) {
      this.expandedExplanationDay = this.revealedWinnerDays;
    } else {
      this.expandedExplanationDay = undefined;
    }
  }

  render(): void {
    const props = this.getProps();
    const wrapper = document.createElement('div');
    wrapper.className = 'instance-page';

    if (props.title) {
      const heading = document.createElement('h2');
      heading.className = 'instance-page__title';
      const numberSuffix = typeof props.questionNumber === 'number'
        ? ` ${props.questionNumber}`
        : '';
      heading.textContent = `${props.title}${numberSuffix}`.trim();
      wrapper.appendChild(heading);
    }

    if (props.introText) {
      const intro = document.createElement('p');
      intro.className = 'instance-page__intro';
      this.appendTextWithLineBreaks(intro, props.introText);
      wrapper.appendChild(intro);
    }

    this.tableContainer = document.createElement('div');
    this.tableContainer.className = 'instance-page__table-container';
    wrapper.appendChild(this.tableContainer);

    this.winnersContainer = document.createElement('div');
    this.winnersContainer.className = 'instance-page__explanations';
    this.winnersContainer.addEventListener('click', this.explanationToggleHandler);
    wrapper.appendChild(this.winnersContainer);

    const controls = document.createElement('div');
    controls.className = 'instance-page__controls';

    this.revealButton = document.createElement('button');
    this.revealButton.type = 'button';
    this.revealButton.className = 'instance-page__reveal-button';
    this.revealButton.addEventListener('click', this.revealHandler);
    controls.appendChild(this.revealButton);

    wrapper.appendChild(controls);

    this.ratingContainer = document.createElement('div');
    this.ratingContainer.className = 'instance-page__rating';
    wrapper.appendChild(this.ratingContainer);

    this.feedbackContainer = document.createElement('div');
    this.feedbackContainer.className = 'instance-page__feedback';
    wrapper.appendChild(this.feedbackContainer);

    this.container.replaceChildren(wrapper);

    this.refreshUi();
  }

  destroy(): void {
    this.winnersContainer?.removeEventListener('click', this.explanationToggleHandler);
    this.revealButton?.removeEventListener('click', this.revealHandler);
    this.feedbackInput?.removeEventListener('input', this.feedbackInputHandler);
    super.destroy();
  }

  async validate(): Promise<PageValidationResult<InstancePageResult>> {
    const totalDays = this.getTotalDays();
    const validationCopy = this.copy.validation.instance;

    if (this.revealedWinnerDays < totalDays) {
      return {
        valid: false,
        message: validationCopy.revealAllRounds,
      };
    }

    if (this.rating === undefined) {
      return {
        valid: false,
        message: validationCopy.ratingRequired,
      };
    }

    return {
      valid: true,
      data: this.buildResult(),
    };
  }

  private refreshUi(): void {
    this.renderTable();
    this.renderWinners();
    this.updateRevealButton();
    this.renderRatingSection();
    this.renderFeedbackSection();
    this.syncNextButtonState();
  }

  private getProps(): InstancePagePropsConfig {
    const props = this.descriptor.props;
    if (!props || !Array.isArray(props.voters) || !Array.isArray(props.days)) {
      throw new Error('Instance page requires voters and days.');
    }
    return props;
  }

  private getTotalDays(): number {
    return this.descriptor.props?.days?.length ?? 0;
  }

  private renderTable(): void {
    if (!this.tableContainer) {
      return;
    }

    const props = this.getProps();
    const copy = this.copy.instancePage;
    const hasRevealedVotes = this.revealedVoteDays > 0;

    this.tableContainer.hidden = !hasRevealedVotes;
    if (!hasRevealedVotes) {
      this.tableContainer.replaceChildren();
      return;
    }

    const table = document.createElement('table');
    table.className = 'instance-page__table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const voterHeader = document.createElement('th');
    voterHeader.textContent = copy.voterHeaderLabel;
    voterHeader.classList.add('instance-page__cell--frozen');
    headerRow.appendChild(voterHeader);

    const visibleDayCount = this.revealedVoteDays;
    for (let day = 1; day <= visibleDayCount; day += 1) {
      const dayHeader = document.createElement('th');
      dayHeader.textContent = copy.dayHeader(day);
      dayHeader.dataset.day = day.toString();
      if (day === this.highlightedDay) {
        dayHeader.classList.add('instance-page__cell--highlight');
      }
      headerRow.appendChild(dayHeader);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    for (const voter of props.voters) {
      const row = document.createElement('tr');
      const labelCell = document.createElement('th');
      labelCell.scope = 'row';
      labelCell.textContent = this.getVoterLabel(voter);
      labelCell.classList.add('instance-page__cell--frozen');
      row.appendChild(labelCell);

      for (let day = 1; day <= visibleDayCount; day += 1) {
        const dayCell = document.createElement('td');
        dayCell.textContent = this.getBallotDisplay(voter.id, day);
        dayCell.dataset.day = day.toString();
        if (day === this.highlightedDay) {
          dayCell.classList.add('instance-page__cell--highlight');
        }
        row.appendChild(dayCell);
      }

      tbody.appendChild(row);
    }

    table.appendChild(tbody);

    if (visibleDayCount > 0) {
      const tfoot = document.createElement('tfoot');
      const winnerRow = document.createElement('tr');
      winnerRow.className = 'instance-page__winner-row';
      const labelCell = document.createElement('th');
      labelCell.scope = 'row';
      labelCell.textContent = copy.winnerRowLabel;
      labelCell.classList.add('instance-page__cell--frozen');
      winnerRow.appendChild(labelCell);

      for (let day = 1; day <= visibleDayCount; day += 1) {
        const valueCell = document.createElement('td');
        valueCell.textContent = day <= this.revealedWinnerDays
          ? this.getWinnerDisplay(day)
          : this.copy.instancePage.pendingWinnerLabel;
        valueCell.dataset.day = day.toString();
        if (day === this.highlightedDay) {
          valueCell.classList.add('instance-page__cell--highlight');
        }
        winnerRow.appendChild(valueCell);
      }

      tfoot.appendChild(winnerRow);
      table.appendChild(tfoot);
    }

    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'instance-page__table-scroll';
    scrollContainer.appendChild(table);
    this.tableContainer.replaceChildren(scrollContainer);

    if (this.pendingScrollDay) {
      this.scrollToDay(scrollContainer, this.pendingScrollDay);
      this.pendingScrollDay = undefined;
    }
  }

  private renderWinners(): void {
    if (!this.winnersContainer) {
      return;
    }

    const props = this.getProps();
    const explanations = props.explanations ?? [];
    if (this.revealedWinnerDays === 0 || !props.showResultsExplanation) {
      this.winnersContainer.hidden = true;
      this.winnersContainer.replaceChildren();
      return;
    }

    const normalizedExpanded = typeof this.expandedExplanationDay === 'number'
      ? this.normalizeDayCount(this.expandedExplanationDay, this.revealedWinnerDays)
      : 0;
    const requestedExpandedDay = normalizedExpanded > 0 ? normalizedExpanded : undefined;

    const explainedDays = props.days
      .slice(0, this.revealedWinnerDays)
      .map((day, index) => ({ dayNumber: day.day, text: explanations[index] }))
      .filter((entry) => Boolean(entry.text));

    if (explainedDays.length === 0) {
      this.winnersContainer.hidden = true;
      this.winnersContainer.replaceChildren();
      return;
    }

    if (typeof requestedExpandedDay === 'number') {
      const hasExpanded = explainedDays.some((entry) => entry.dayNumber === requestedExpandedDay);
      this.expandedExplanationDay = hasExpanded ? requestedExpandedDay : null;
    } else if (this.expandedExplanationDay === undefined) {
      this.expandedExplanationDay = explainedDays[explainedDays.length - 1]?.dayNumber ?? null;
    }

    this.winnersContainer.hidden = false;
    const tabs = document.createElement('div');
    tabs.className = 'instance-page__explanation-tabs';
    tabs.setAttribute('role', 'tablist');

    explainedDays.forEach((entry) => {
      const day = entry.dayNumber;
      const isExpanded = day === this.expandedExplanationDay;
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'instance-page__explanation-toggle';
      toggle.dataset.day = day.toString();
      toggle.setAttribute('aria-pressed', isExpanded ? 'true' : 'false');
      toggle.setAttribute('role', 'tab');
      toggle.textContent = this.copy.instancePage.dayHeader(day);
      tabs.appendChild(toggle);
    });

    const expandedEntry = explainedDays.find((entry) => entry.dayNumber === this.expandedExplanationDay);
    const panel = document.createElement('div');
    panel.className = 'instance-page__explanation-panel';
    panel.hidden = !expandedEntry;

    if (expandedEntry) {
      const heading = document.createElement('p');
      heading.className = 'instance-page__explanation-heading';
      heading.textContent = this.copy.instancePage.dayHeader(expandedEntry.dayNumber);

      const explanation = document.createElement('div');
      explanation.className = 'instance-page__explanation-body';
      const explanationText = document.createElement('p');
      explanationText.className = 'instance-page__winner-explanation';
      this.appendTextWithLineBreaks(explanationText, expandedEntry.text ?? '');
      explanation.appendChild(explanationText);

      panel.append(heading, explanation);
    }

    this.winnersContainer.replaceChildren(tabs, panel);
  }

  private updateRevealButton(): void {
    if (!this.revealButton) {
      return;
    }

    const totalDays = this.getTotalDays();
    if (this.revealedWinnerDays >= totalDays && this.revealedVoteDays >= totalDays) {
      this.revealButton.hidden = true;
      return;
    }

    this.revealButton.hidden = false;
    this.revealButton.disabled = false;
    if (this.revealedVoteDays === this.revealedWinnerDays) {
      this.revealButton.textContent = this.copy.instancePage.revealDayVotes(this.revealedVoteDays + 1);
    } else {
      this.revealButton.textContent = this.copy.instancePage.revealDayWinner(this.revealedWinnerDays + 1);
    }
  }

  private renderRatingSection(): void {
    if (!this.ratingContainer) {
      return;
    }

    const totalDays = this.getTotalDays();
    const props = this.getProps();

    if (this.revealedWinnerDays < totalDays) {
      this.ratingContainer.hidden = true;
      return;
    }

    this.ratingContainer.hidden = false;
    this.ratingContainer.replaceChildren();

    const ratingConfig = this.normalizeRatingConfig(props.rating);

    const prompt = document.createElement('p');
    prompt.className = 'instance-page__rating-prompt';
    this.appendTextWithLineBreaks(prompt, ratingConfig.prompt);
    this.ratingContainer.appendChild(prompt);

    const sliderWrapper = document.createElement('div');
    sliderWrapper.className = 'instance-page__slider-wrapper';

    const minLabel = document.createElement('span');
    minLabel.className = 'instance-page__slider-label';
    minLabel.textContent = ratingConfig.minLabel;

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '1';
    slider.max = ratingConfig.scaleSize.toString();
    slider.step = '1';
    const initialValue = this.rating ?? Math.ceil(ratingConfig.scaleSize / 2);
    slider.value = initialValue.toString();
    slider.addEventListener('input', (event) => this.handleSliderInput(event));

    const maxLabel = document.createElement('span');
    maxLabel.className = 'instance-page__slider-label';
    maxLabel.textContent = ratingConfig.maxLabel;

    this.ratingValueLabel = document.createElement('span');
    this.ratingValueLabel.className = 'instance-page__slider-value';
    this.ratingValueLabel.textContent = this.rating !== undefined ? this.rating.toString() : '';

    sliderWrapper.appendChild(minLabel);
    sliderWrapper.appendChild(slider);
    sliderWrapper.appendChild(maxLabel);

    this.ratingContainer.appendChild(sliderWrapper);
    this.ratingContainer.appendChild(this.ratingValueLabel);
  }

  private handleRevealNextDay(): void {
    const totalDays = this.getTotalDays();

    if (this.revealedVoteDays === this.revealedWinnerDays) {
      if (this.revealedVoteDays >= totalDays) {
        return;
      }
      this.revealedVoteDays += 1;
      this.highlightedDay = this.revealedVoteDays;
      this.pendingScrollDay = this.revealedVoteDays;
      this.expandedExplanationDay = null; // collapse any open explanations when showing more votes
    } else {
      this.revealedWinnerDays = Math.min(this.revealedVoteDays, this.revealedWinnerDays + 1);
      this.highlightedDay = this.revealedWinnerDays;
      this.pendingScrollDay = this.revealedWinnerDays;
      if (this.hasExplanationForDay(this.revealedWinnerDays)) {
        this.expandedExplanationDay = this.revealedWinnerDays;
      } else {
        this.expandedExplanationDay = null;
      }
    }

    this.persistState();
    this.refreshUi();
  }

  private handleSliderInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.rating = Number.parseInt(target.value, 10);
    if (this.ratingValueLabel) {
      this.ratingValueLabel.textContent = this.rating.toString();
    }
    this.persistState();
    this.syncNextButtonState();
    this.renderFeedbackSection();
  }

  private renderFeedbackSection(): void {
    if (!this.feedbackContainer) {
      return;
    }

    const hasRating = this.rating !== undefined;

    if (!hasRating) {
      this.feedbackInput?.removeEventListener('input', this.feedbackInputHandler);
      this.feedbackInput = undefined;
      this.feedbackContainer.hidden = true;
      this.feedbackContainer.replaceChildren();
      return;
    }

    this.feedbackContainer.hidden = false;
    this.feedbackContainer.replaceChildren();

    const textareaId = `${this.descriptor.id ?? 'instance'}-feedback`;
    const label = document.createElement('label');
    label.className = 'instance-page__feedback-label';
    label.setAttribute('for', textareaId);
    label.textContent = this.copy.instancePage.additionalFeedbackLabel;

    const textarea = document.createElement('textarea');
    textarea.className = 'instance-page__feedback-input';
    textarea.rows = 3;
    textarea.id = textareaId;
    textarea.placeholder = this.copy.instancePage.additionalFeedbackPlaceholder;
    textarea.value = this.additionalFeedback ?? '';

    this.feedbackInput?.removeEventListener('input', this.feedbackInputHandler);
    textarea.addEventListener('input', this.feedbackInputHandler);
    this.feedbackInput = textarea;

    this.feedbackContainer.append(label, textarea);
  }

  private syncNextButtonState(): void {
    const totalDays = this.getTotalDays();
    const canContinue = this.revealedWinnerDays >= totalDays && this.rating !== undefined;
    this.flow.setNextEnabled(canContinue);
  }

  private getVoterLabel(voter: InstanceVoterConfig): string {
    if (voter.label && voter.label.trim().length > 0) {
      return voter.label;
    }
    return `Voter ${voter.id}`;
  }

  private getBallotDisplay(voterId: number, dayNumber: number): string {
    const day = this.getDayConfig(dayNumber);
    if (!day) {
      return '—';
    }
    const vote = day.votes.find((entry) => entry.voterId === voterId);
    if (!vote || vote.selections.length === 0) {
      return '—';
    }
    return vote.selections.join(', ');
  }

  private getWinnerDisplay(dayNumber: number): string {
    const day = this.getDayConfig(dayNumber);
    return day ? day.winner : '—';
  }

  private getDayConfig(dayNumber: number): InstanceDayConfig | undefined {
    return this.getProps().days.find((entry) => entry.day === dayNumber);
  }

  private hasExplanationForDay(dayNumber: number): boolean {
    const props = this.getProps();
    if (!props.showResultsExplanation || !Array.isArray(props.explanations)) {
      return false;
    }
    const dayIndex = props.days.findIndex((day) => day.day === dayNumber);
    if (dayIndex < 0) {
      return false;
    }
    const explanation = props.explanations[dayIndex];
    return Boolean(explanation);
  }

  private normalizeRatingConfig(config?: InstanceRatingConfig): Required<InstanceRatingConfig> {
    const scaleSize = Math.max(config?.scaleSize ?? DEFAULT_SLIDER_LENGTH, 2);
    return {
      scaleSize,
      prompt: config?.prompt ?? this.copy.instancePage.ratingPrompt,
      minLabel: config?.minLabel ?? this.copy.instancePage.sliderMinLabel,
      maxLabel: config?.maxLabel ?? this.copy.instancePage.sliderMaxLabel,
    };
  }

  private buildResult(): InstancePageResult {
    const ratingConfig = this.normalizeRatingConfig(this.getProps().rating);
    const totalDays = this.getTotalDays();
    const trimmedFeedback = this.additionalFeedback?.trim();
    return {
      revealedVotes: this.revealedVoteDays,
      revealedWinners: this.revealedWinnerDays,
      revealedDays: this.revealedWinnerDays,
      totalDays,
      rating: this.rating,
      maxRating: ratingConfig.scaleSize,
      expandedExplanationDay: this.expandedExplanationDay ?? null,
      additionalFeedback: trimmedFeedback && trimmedFeedback.length > 0 ? trimmedFeedback : undefined,
    };
  }

  private persistState(): void {
    this.persistData(this.buildResult());
  }

  private appendTextWithLineBreaks(element: HTMLElement, text: string): void {
    const segments = (text ?? '').split('\n');
    segments.forEach((segment, index) => {
      if (index > 0) {
        element.appendChild(document.createElement('br'));
      }
      this.appendFormattedText(element, segment);
    });
  }

  private scrollToDay(container: HTMLDivElement, day: number): void {
    const targetCell = container.querySelector<HTMLElement>(`[data-day="${day}"]`);
    if (!targetCell) {
      return;
    }

    const direction = getComputedStyle(container).direction;
    const inline = direction === 'rtl' ? 'start' : 'end';
    targetCell.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline });
  }

  private appendFormattedText(target: HTMLElement, content: string): void {
    if (!content) {
      target.appendChild(document.createTextNode(''));
      return;
    }

    const boldPattern = /\*(.+?)\*/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let foundBold = false;

    while ((match = boldPattern.exec(content)) !== null) {
      foundBold = true;
      if (match.index > lastIndex) {
        target.appendChild(document.createTextNode(content.slice(lastIndex, match.index)));
      }

      const strong = document.createElement('strong');
      strong.textContent = match[1];
      target.appendChild(strong);
      lastIndex = match.index + match[0].length;
    }

    if (!foundBold) {
      target.appendChild(document.createTextNode(content));
      return;
    }

    if (lastIndex < content.length) {
      target.appendChild(document.createTextNode(content.slice(lastIndex)));
    }
  }

  private handleExplanationToggle(event: Event): void {
    const target = (event.target as HTMLElement | null)?.closest('button.instance-page__explanation-toggle');
    if (!target) {
      return;
    }
    const day = Number.parseInt(target.getAttribute('data-day') ?? '', 10);
    if (!Number.isFinite(day) || day <= 0 || day > this.revealedWinnerDays) {
      return;
    }
    if (this.expandedExplanationDay === day) {
      this.expandedExplanationDay = null;
    } else {
      this.expandedExplanationDay = day;
    }
    this.persistState();
    this.renderWinners();
  }

  private handleFeedbackInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.additionalFeedback = target.value;
    this.persistState();
  }

  private normalizeDayCount(value: number | undefined | null, max: number): number {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      return 0;
    }
    if (value <= 0) {
      return 0;
    }
    if (value >= max) {
      return max;
    }
    return Math.floor(value);
  }
}
