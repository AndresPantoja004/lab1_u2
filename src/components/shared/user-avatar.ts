import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('user-avatar')
export class UserAvatar extends LitElement {
  @property({ type: String }) src: string = '/assets/default-avatar.jpg';

  static styles = css`
    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      cursor: pointer;
      border: 2px solid var(--accent-color);
    }
  `;

  render() {
    return html`<img src=${this.src} alt="Usuario" />`;
  }
}