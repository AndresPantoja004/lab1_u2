import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('add-task-modal')
export class AddTaskModal extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;

  @query('#task-name') nameInput!: HTMLInputElement;
  @query('#task-time') timeInput!: HTMLInputElement;
  @query('#task-priority') prioritySelect!: HTMLSelectElement;
  @query('#task-notes') notesInput!: HTMLTextAreaElement;

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1000;
    }

    :host([open]) {
      display: flex;
    }

    .modal-content {
      background-color: #10231c;
      border-radius: 12px;
      max-width: 480px;
      width: 90%;
      padding-bottom: 1.5rem;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
      color: white;
    }

    h2 {
      text-align: center;
      font-size: 1.75rem;
      font-weight: bold;
      padding: 1.25rem 1rem 0.5rem;
    }

    .form-group {
      padding: 0.75rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    input, textarea, select {
      background-color: #214a3c;
      border: none;
      border-radius: 10px;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      color: white;
      resize: none;
    }

    ::placeholder {
      color: #8ecdb7;
    }

    .actions {
      display: flex;
      justify-content: center;
      padding: 1rem;
    }

    button {
      background-color: #019863;
      color: white;
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #027752;
    }

    .close {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      font-size: 1.5rem;
      cursor: pointer;
      color: #8ecdb7;
    }
  `;

  render() {
    return html`
      <div class="modal-content">
        <div class="close" @click=${this._close}>&times;</div>
        <h2>Nueva tarea</h2>
        <div class="form-group">
          <input id="task-name" placeholder="Nombre de la tarea" />
          <textarea id="task-notes" placeholder="Notas"></textarea>
          <input id="task-time" type="time" value="10:00" />
          <select id="task-priority">
            <option value="Alta">Alta</option>
            <option value="Media" selected>Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
        <div class="actions">
          <button @click=${this._submit}>Agregar</button>
        </div>
      </div>
    `;
  }

  private _close() {
    this.open = false;
  }

  private _submit() {
    const name = this.nameInput?.value.trim();
    const time = this.timeInput?.value;
    const priority = this.prioritySelect?.value;
    const notes = this.notesInput?.value.trim();

    if (name) {
      this.dispatchEvent(new CustomEvent('new-task', {
        detail: { name, time, priority, notes },
        bubbles: true,
        composed: true
      }));
      this._close();
    }
  }
}