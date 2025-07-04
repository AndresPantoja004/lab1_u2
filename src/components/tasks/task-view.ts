import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './task-item.ts';
import './task-section.ts';

interface Task {
  id: string;
  name: string;
  time: string;
  date: string;
}

@customElement('task-view')
export class TaskView extends LitElement {
  @property({ type: Array }) tasks!: Task[];

  constructor() {
    super();
    this.tasks = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.tasks = [
      {
        id: '1',
        name: 'Revisar entregas de programación',
        time: 'Hoy · 08:00 AM',
        date: '2025-07-04'
      },
      {
        id: '2',
        name: 'Estudiar LitElement para el examen',
        time: 'Mañana · 10:30 AM',
        date: '2025-07-05'
      },
      {
        id: '3',
        name: 'Organizar tareas de U2',
        time: 'Mañana · 03:00 PM',
        date: '2025-07-05'
      }
    ];
  }

  static styles = css`
    .view {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding-bottom: 2rem;
    }


  `;

  render() {
    const hoy = this.tasks.filter(t => t.date === '2025-07-04');
    const manana = this.tasks.filter(t => t.date === '2025-07-05');

    return html`
      <div class="view">
        ${hoy.length > 0
          ? html`<task-section  title="Hoy" .tasks=${hoy}></task-section>`
          : ''}
        ${manana.length > 0
          ? html`<task-section title="Mañana" .tasks=${manana}></task-section>`
          : ''}
      </div>
    `;
  }
}