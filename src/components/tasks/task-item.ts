import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface Task {
  id: string;
  name: string;
  time: string;
}

@customElement('task-item')
export class TaskItem extends LitElement {
  @property({ type: Object }) task!: Task;

  static styles = css`
    .task-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      background-color: #10231c;
      padding: 0.5rem 1rem;
      min-height: 72px;
      border-radius: 8px;
    }

    .icon {
      background-color: #214a3c;
      color: white;
      border-radius: 0.5rem;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .title {
      color: white;
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.4;
      margin: 0;
    }

    .time {
      color: #8ecdb7;
      font-size: 0.875rem;
      line-height: 1.3;
      margin: 0.2rem 0 0;
    }

    .task-actions {
      display: flex;
      gap: 0.5rem;
    }

    button {
      background: none;
      border: none;
      padding: 0.25rem;
      cursor: pointer;
      color: #8ecdb7;
    }

    button:hover {
      color: white;
    }

    .delete-task-btn:hover {
      color: #f56565;
    }

    svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }
  `;

  render() {
    return html`
      <div class="task-item" data-task-id=${this.task.id}>
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/>
          </svg>
        </div>
        <div class="info">
          <p class="title">${this.task.name}</p>
          <p class="time">${this.task.time}</p>
        </div>
        <div class="task-actions">
          <button class="edit-task-btn" @click=${this._onEdit}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <path d="M229.66,70.34l-44-44a8,8,0,0,0-11.32,0L36.69,163.31a8,8,0,0,0-2.1,3.41l-8,32A8,8,0,0,0,32,208a8.14,8.14,0,0,0,1.69-.18l32-8a8,8,0,0,0,3.41-2.1L229.66,81.66A8,8,0,0,0,229.66,70.34ZM69.66,188.69l-19.07,4.77,4.77-19.07L144,85.66l14.34,14.34Zm96-96L151.31,78.34,168,61.66l14.34,14.34Z"/>
            </svg>
          </button>
          <button class="delete-task-btn" @click=${this._onDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V216a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM192,216H64V64H192ZM104,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm64,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

private _onEdit() {
  this.dispatchEvent(new CustomEvent('edit-task', {
    detail: { id: this.task.id },
    bubbles: true,
    composed: true
  }));
}

  private _onDelete() {
    this.dispatchEvent(new CustomEvent('delete-task', {
      detail: { id: this.task.id },
      bubbles: true,
      composed: true
    }));
  }
}
