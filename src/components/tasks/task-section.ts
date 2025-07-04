import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './task-item.ts';

interface Task {
  id: string;
  name: string;
  time: string;
  date: string;
}

@customElement('task-section')
export class TaskSection extends LitElement {
  @property({ type: String }) title: string = '';
  @property({ type: Array }) tasks: Task[] = [];

  static styles = css`
    .section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .title {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      padding-left: 0.25rem;
      color: var(--section-title-color);
    }

    .task-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
  `;

  // 🔄 Captura el evento y vuelve a emitirlo hacia arriba
  private _onEditRequest(e: CustomEvent) {
    e.stopPropagation(); // evita que se dispare varias veces
    this.dispatchEvent(new CustomEvent('edit-task-request', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="section">
        <div class="title">${this.title}</div>
        <div class="task-list">
          ${this.tasks.map(task => html`
            <task-item .task=${task} @edit-task-request=${this._onEditRequest}></task-item>
          `)}
        </div>
      </div>
    `;
  }
}
