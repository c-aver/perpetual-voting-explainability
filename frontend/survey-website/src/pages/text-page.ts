import { BasePage } from './base-page.ts';

export interface TextPageProps {
  title?: string;
  body: string;
  footnote?: string;
}

export class TextPage extends BasePage<void, TextPageProps> {
  render(): void {
    const { title, body, footnote } = this.descriptor.props ?? { body: '' };

    const headerMarkup = title ? `<h2>${title}</h2>` : '';
    const footnoteMarkup = footnote ? `<p class="text-page__footnote">${footnote}</p>` : '';

    this.container.innerHTML = `
      <div class="text-page">
        ${headerMarkup}
        <p>${body}</p>
        ${footnoteMarkup}
      </div>
    `;
  }
}
