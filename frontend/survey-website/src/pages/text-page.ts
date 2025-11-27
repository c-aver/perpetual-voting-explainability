import { BasePage } from './base-page.ts';

/**
 * Props for rendering static informational text pages.
 */
export interface TextPageProps {
  title?: string;
  body: string;
  footnote?: string;
}

/**
 * Displays title/body/footnote content without collecting user input.
 */
export class TextPage extends BasePage<void, TextPageProps> {
  render(): void {
    const { title, body, footnote } = this.descriptor.props ?? { body: '' };
    const formattedBody = (body ?? '').replace(/\n/g, '<br />');

    const headerMarkup = title ? `<h2>${title}</h2>` : '';
    const footnoteMarkup = footnote ? `<p class="text-page__footnote">${footnote}</p>` : '';

    this.container.innerHTML = `
      <div class="text-page">
        ${headerMarkup}
        <p>${formattedBody}</p>
        ${footnoteMarkup}
      </div>
    `;
  }
}
