import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('sidebar-menu')
export class SidebarMenu extends LitElement {
  @state() private isOpen!: boolean;

  constructor() {
    super();
    this.isOpen = false;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('open-sidebar', this._handleOpenSidebar);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('open-sidebar', this._handleOpenSidebar);
  }

  private _handleOpenSidebar = () => {
    this.isOpen = true;
  };


static styles = css`
  .sidebar {
    width: 220px;
    background-color: var(--primary-color);
    color: white;
    padding: 1rem;
    transition: transform 0.3s ease;
  }

  .hidden {
    transform: translateX(-100%);
  }

  @media (min-width: 768px) {
    .sidebar {
      display: none;
    }
  }

  .toggle {
    cursor: pointer;
    margin-bottom: 1rem;
  }

  .link {
    margin: 0.5rem 0;
    cursor: pointer;
  }
`;

  private toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  render() {
    return html`
      <div class="sidebar ${this.isOpen ? '' : 'hidden'}">
        <div class="toggle" @click=${this.toggleSidebar}>🔄 Toggle</div>
        <div class="link">🏠 Inicio</div>
        <div class="link">📋 Mis tareas</div>
        <div class="link">🗓️ Calendario</div>
        <div class="link">📝 Notas</div>
      </div>
    `;
  }
}