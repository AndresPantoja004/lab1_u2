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
  @property({ type: Array }) tasks!: Task[];

  constructor() {
    super();
    this.tasks = [];
  }

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
      color: var(--text-color);
    }

    .task-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .title {
      color: var(--section-title-color);
    }

  `;

  render() {
    return html`
      <div class="section">
        <div class="title">${this.title}</div>
        <div class="task-list">
          ${this.tasks.map(task => html`<task-item .task=${task}></task-item>`)}
        </div>
      </div>
    `;
  }
}