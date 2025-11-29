import { BasePage } from '../base-page.ts';
import type { PageValidationResult } from '../../pagination/types.ts';
import type {
  InstanceDayConfig,
  InstancePagePropsConfig,
  InstanceRatingConfig,
  InstanceVoterConfig,
} from '../../config/types.ts';

export interface InstancePageResult {
  revealedDays: number;
  totalDays: number;
  rating?: number;
}

const DEFAULT_SLIDER_LENGTH = 5;

/**
 * Presents a perpetual voting instance round-by-round and captures a fairness rating.
 */
export class InstancePage extends BasePage<InstancePageResult, InstancePagePropsConfig> {
  private revealedDays = 0;
  private rating?: number;
  private tableContainer?: HTMLDivElement;
  private winnersContainer?: HTMLDivElement;
  private revealButton?: HTMLButtonElement;
  private ratingContainer?: HTMLDivElement;
  private ratingValueLabel?: HTMLSpanElement;
  private highlightedDay?: number;
  private pendingScrollDay?: number;
  private readonly revealHandler = () => this.handleRevealNextDay();

  onEnter(data?: InstancePageResult): void {
    super.onEnter(data);
    const totalDays = this.getTotalDays();
    this.revealedDays = Math.min(Math.max(data?.revealedDays ?? 0, 0), totalDays);
    this.rating = data?.rating;
    this.highlightedDay = undefined;
    this.pendingScrollDay = undefined;
  }

  render(): void {
    const props = this.getProps();
    const wrapper = document.createElement('div');
    wrapper.className = 'instance-page';

    if (props.title) {
      const heading = document.createElement('h2');
      heading.className = 'instance-page__title';
      heading.textContent = props.title;
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

    this.container.replaceChildren(wrapper);

    this.refreshUi();
  }

  destroy(): void {
    this.revealButton?.removeEventListener('click', this.revealHandler);
    super.destroy();
  }

  async validate(): Promise<PageValidationResult<InstancePageResult>> {
    const totalDays = this.getTotalDays();
    const validationCopy = this.copy.validation.instance;

    if (this.revealedDays < totalDays) {
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

    const table = document.createElement('table');
    table.className = 'instance-page__table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const voterHeader = document.createElement('th');
    voterHeader.textContent = copy.voterHeaderLabel;
    voterHeader.classList.add('instance-page__cell--frozen');
    headerRow.appendChild(voterHeader);

    for (let day = 1; day <= this.revealedDays; day += 1) {
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

      for (let day = 1; day <= this.revealedDays; day += 1) {
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

    if (this.revealedDays > 0) {
      const tfoot = document.createElement('tfoot');
      const winnerRow = document.createElement('tr');
      winnerRow.className = 'instance-page__winner-row';
      const labelCell = document.createElement('th');
      labelCell.scope = 'row';
      labelCell.textContent = copy.winnerRowLabel;
      labelCell.classList.add('instance-page__cell--frozen');
      winnerRow.appendChild(labelCell);

      for (let day = 1; day <= this.revealedDays; day += 1) {
        const valueCell = document.createElement('td');
        valueCell.textContent = this.getWinnerDisplay(day);
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
    const explainedDays = props.days
      .slice(0, this.revealedDays)
      .map((day, index) => ({ dayNumber: day.day, text: explanations[index] }))
      .filter((entry) => Boolean(entry.text));

    if (explainedDays.length === 0) {
      this.winnersContainer.hidden = true;
      this.winnersContainer.replaceChildren();
      return;
    }

    this.winnersContainer.hidden = false;
    const list = document.createElement('ol');
    list.className = 'instance-page__explanation-list';

    explainedDays.forEach((entry) => {
      const item = document.createElement('li');
      const heading = document.createElement('p');
      heading.className = 'instance-page__explanation-heading';
      heading.textContent = this.copy.instancePage.dayHeader(entry.dayNumber);
      item.appendChild(heading);

      const explanation = document.createElement('p');
      explanation.className = 'instance-page__winner-explanation';
      this.appendTextWithLineBreaks(explanation, entry.text ?? '');
      item.appendChild(explanation);

      list.appendChild(item);
    });

    if (props.showResultsExplanation) this.winnersContainer.replaceChildren(list);
  }

  private updateRevealButton(): void {
    if (!this.revealButton) {
      return;
    }

    const totalDays = this.getTotalDays();
    if (this.revealedDays >= totalDays) {
      this.revealButton.hidden = true;
      return;
    }

    this.revealButton.hidden = false;
    this.revealButton.disabled = false;
    this.revealButton.textContent = this.copy.instancePage.revealNextDay(this.revealedDays + 1);
  }

  private renderRatingSection(): void {
    if (!this.ratingContainer) {
      return;
    }

    const totalDays = this.getTotalDays();
    const props = this.getProps();

    if (this.revealedDays < totalDays) {
      this.ratingContainer.hidden = true;
      return;
    }

    this.ratingContainer.hidden = false;
    this.ratingContainer.replaceChildren();

    const ratingConfig = this.normalizeRatingConfig(props.rating);

    const prompt = document.createElement('p');
    prompt.className = 'instance-page__rating-prompt';
    prompt.textContent = ratingConfig.prompt;
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
    const initialValue = this.rating ?? 1;
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
    if (this.revealedDays >= totalDays) {
      return;
    }

    this.revealedDays += 1;
    this.highlightedDay = this.revealedDays;
    this.pendingScrollDay = this.revealedDays;
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
  }

  private syncNextButtonState(): void {
    const totalDays = this.getTotalDays();
    const canContinue = this.revealedDays >= totalDays && this.rating !== undefined;
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
    return {
      revealedDays: this.revealedDays,
      totalDays: this.getTotalDays(),
      rating: this.rating,
    };
  }

  private persistState(): void {
    this.savedData = this.buildResult();
  }

  private appendTextWithLineBreaks(element: HTMLElement, text: string): void {
    const segments = (text ?? '').split('\n');
    segments.forEach((segment, index) => {
      if (index > 0) {
        element.appendChild(document.createElement('br'));
      }
      element.appendChild(document.createTextNode(segment));
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
}
