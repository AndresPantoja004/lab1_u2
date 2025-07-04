import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './task-item.ts';
import './task-section.ts';
import '../shared/add-task-modal.ts'; // Modal
import { AddTaskModal } from '../shared/add-task-modal.ts';

interface Task {
  id: string;
  name: string;
  time: string;
  date: string;
}

@customElement('task-view')
export class TaskView extends LitElement {
  @property({ type: Array }) tasks: Task[] = [];

  constructor() {
    super();
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

  firstUpdated() {
    this.addEventListener('new-task', this._onNewTask as EventListener);
    this.addEventListener('delete-task', this._onDeleteTask as EventListener);
    this.addEventListener('edit-task', this._onEditTask as EventListener);
    this.addEventListener('open-modal', this._onOpenModal as EventListener);
  }

  private _onOpenModal() {
    const modal = this.renderRoot?.querySelector('add-task-modal') as AddTaskModal | null;
    if (modal) modal.open = true;
  }

  private _onNewTask(e: CustomEvent) {
    const { name, time, priority, notes } = e.detail;

    const newTask: Task = {
      id: crypto.randomUUID(),
      name,
      time: this._formatearHora(time),
      date: this._calcularFecha()
    };

    this.tasks = [...this.tasks, newTask];
  }

  private _onEditTask(e: CustomEvent) {
    const updatedTask = e.detail;

    // Si el detalle solo trae `id`, buscamos la tarea actual y abrimos el modal
    if (!updatedTask.name) {
      const task = this.tasks.find(t => t.id === updatedTask.id);
      const modal = this.renderRoot?.querySelector('add-task-modal') as AddTaskModal | null;
      if (task && modal) {
        const time = task.time.split('·')[1]?.trim() || '10:00';
        modal.openForEdit({
          id: task.id,
          name: task.name,
          time,
          priority: 'Media',
          notes: ''
        });
      }
      return;
    }

    // Si ya viene con datos, significa que guardaron una edición
    this.tasks = this.tasks.map(task =>
      task.id === updatedTask.id
        ? {
            ...task,
            name: updatedTask.name,
            time: this._formatearHora(updatedTask.time)
          }
        : task
    );
  }

  private _onDeleteTask(e: CustomEvent) {
    const id = e.detail.id;
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  private _formatearHora(hora: string): string {
    const hoy = new Date();
    const [hh, mm] = hora.split(':');
    hoy.setHours(Number(hh));
    hoy.setMinutes(Number(mm));
    const formato = hoy.toLocaleTimeString('es-EC', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    return `Hoy · ${formato}`;
  }

  private _calcularFecha(): string {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  }

  render() {
    const hoy = this.tasks.filter(t => t.date === '2025-07-04');
    const manana = this.tasks.filter(t => t.date === '2025-07-05');

    return html`
      <div class="view">
        <add-task-modal></add-task-modal>

        ${hoy.length > 0
          ? html`<task-section title="Hoy" .tasks=${hoy}></task-section>`
          : ''}
        ${manana.length > 0
          ? html`<task-section title="Mañana" .tasks=${manana}></task-section>`
          : ''}
      </div>
    `;
  }
}
