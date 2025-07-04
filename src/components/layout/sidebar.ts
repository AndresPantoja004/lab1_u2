import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('sidebar-menu')
export class SidebarMenu extends LitElement {
  @state() private isOpen: boolean = false;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('open-sidebar', this._handleOpenSidebar); // <-- CAMBIO CLAVE
  }

  disconnectedCallback() {
    document.removeEventListener('open-sidebar', this._handleOpenSidebar);
    super.disconnectedCallback();
  }

  private _handleOpenSidebar = () => {
    this.isOpen = true;
  };

  private _closeSidebar() {
    this.isOpen = false;
  }

  private _stopPropagation(e: Event) {
    e.stopPropagation();
  }

  static styles = css`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: none;
      z-index: 1000;
    }

    .overlay.open {
      display: block;
    }

    .sidebar {
      width: 240px;
      background-color: var(--primary-color);
      color: white;
      padding: 1rem;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      display:flex;
      flex-direction: column;
      z-index: 1001;
      gap: 7px;
    }

    .sidebar.open {
      transform: translateX(0);
    }

    .toggle {
      cursor: pointer;
      margin-bottom: 1rem;
    }

    .link {
      margin: 0.5rem 0;
      cursor: pointer;
    }
    .cotainer-avatar-noti{
      display: flex;
      margin-top: 15px;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    @media (min-width: 768px) {
      .overlay,
      .sidebar {
        display: none !important;
      }
    }
  `;

  render() {
    return html`
      <div
        class="overlay ${this.isOpen ? 'open' : ''}"
        @click=${this._closeSidebar}
      >
        <div
          class="sidebar ${this.isOpen ? 'open' : ''}"
          @click=${this._stopPropagation}
        >
          <div class="toggle" @click=${this._closeSidebar}>✖ Cerrar</div>
          <nav-menu></nav-menu>
          <div class="cotainer-avatar-noti">
            <icon-bell></icon-bell>
            <user-avatar src="https://cdn-icons-png.flaticon.com/512/4159/4159471.png"></user-avatar>
          </div>
        </div>
      </div>
    `;
  }
}
