import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('add-task-button')
export class AddTaskButton extends LitElement {
  static styles = css`
    button {
      background-color: var(--accent-color);
      color: white;
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      box-shadow: var(--shadow-soft);
      transition: background-color 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    button:hover {
      background-color: #2e8e5d;
    }

    svg {
      width: 18px;
      height: 18px;
      fill: white;
    }
  `;

  render() {
    return html`
      <button @click=${this.openModal}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H48a8,8,0,0,1,0-16h72V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/>
        </svg>
        Nueva tarea
      </button>
    `;
  }

  private openModal() {
    // Evento que debe ser capturado en task-view para abrir el modal en modo creación
    this.dispatchEvent(new CustomEvent('open-modal', {
      bubbles: true,
      composed: true
    }));
  }
}
