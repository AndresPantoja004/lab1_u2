import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('add-task-modal')
export class AddTaskModal extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean }) editing = false;
  @property({ type: String }) editingId = '';

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

    .backdrop {
      width: 500px;
    }

    .modal-content {
      background-color: #10231c;
      border-radius: 12px;
      max-width: 480px;
      width: 90%;
      padding-bottom: 1.5rem;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
      color: white;
      position: relative;
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

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this._handleEscape);
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this._handleEscape);
    super.disconnectedCallback();
  }

  /**
   * Este método se llama para abrir el modal en modo edición.
   * Los valores del formulario se rellenan automáticamente.
   */
  public openForEdit(task: { id: string; name: string; time: string; priority: string; notes: string }) {
    this.editing = true;
    this.editingId = task.id;
    this.open = true;

    setTimeout(() => {
      this.nameInput.value = task.name;
      this.timeInput.value = this._parseTo24Hour(task.time); // ✅ solo esta
      this.prioritySelect.value = task.priority;
      this.notesInput.value = task.notes;
    }, 0);
  }


  private _parseTo24Hour(timeStr: string): string {
    try {
      const match = timeStr.match(/·\s*([\d:]+)\s*(AM|PM)/i);
      if (!match) return '10:00'; // fallback

      let [hour, minute] = match[1].split(':').map(Number);
      const ampm = match[2].toUpperCase();

      if (ampm === 'PM' && hour < 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;

      return `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;
    } catch {
      return '10:00';
    }
  }


  render() {
    return html`
      <div class="backdrop" @click=${this._onBackdropClick}>
        <div class="modal-content" @click=${this._stopPropagation}>
          <div class="close" @click=${this._close}>&times;</div>
          <h2>${this.editing ? 'Editar tarea' : 'Nueva tarea'}</h2>
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
            <button @click=${this._submit}>
              ${this.editing ? 'Guardar cambios' : 'Agregar'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private _close() {
    this.open = false;
    this.editing = false;
    this.editingId = '';
    this.nameInput.value = '';
    this.timeInput.value = '10:00';
    this.notesInput.value = '';
    this.prioritySelect.value = 'Media';
  }

  private _onBackdropClick() {
    this._close();
  }

  private _stopPropagation(e: Event) {
    e.stopPropagation();
  }

  private _handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this._close();
    }
  };

  private _submit() {
    const name = this.nameInput?.value.trim();
    const time = this.timeInput?.value;
    const priority = this.prioritySelect?.value;
    const notes = this.notesInput?.value.trim();

    if (!name) return;

    const eventName = this.editing ? 'edit-task' : 'new-task';

    this.dispatchEvent(new CustomEvent(eventName, {
      detail: {
        id: this.editingId,
        name,
        time,
        priority,
        notes
      },
      bubbles: true,
      composed: true
    }));

    this._close();
  }
}
