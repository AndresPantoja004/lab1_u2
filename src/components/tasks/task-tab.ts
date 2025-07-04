import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('task-tab')
export class TaskTab extends LitElement {
  @state() private activeTab!: string;

  constructor() {
    super();
    this.activeTab = 'fecha';
  }


  static styles = css`
    .tabs {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .tab {
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-radius: 6px;
      background-color: #173322;
      color: white;
    }
    .tab.active {
      background-color: var(--accent-color);
      color: white;
    }
  `;

  private selectTab(tab: string) {
    this.activeTab = tab;
    this.dispatchEvent(new CustomEvent('tab-changed', {
      detail: { tab },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="tabs">
        <div class="tab ${this.activeTab === 'fecha' ? 'active' : ''}" @click=${() => this.selectTab('fecha')}>🗓️ Por Fecha</div>
        <div class="tab ${this.activeTab === 'prioridad' ? 'active' : ''}" @click=${() => this.selectTab('prioridad')}>🔥 Por Prioridad</div>
      </div>
    `;
  }
}