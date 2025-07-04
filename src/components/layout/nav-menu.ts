import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('nav-menu')
export class NavMenu extends LitElement {
  static styles = css`
    .menu {
      display: flex;
      gap: 1.5rem;
      flex-direction: row;
    }

    .menu-item {
      color: white;
      cursor: pointer;
      font-size: 0.95rem;
      transition: opacity 0.2s;
    }

    .menu-item:hover {
      opacity: 0.7;
    }

    /* Adaptación automática si el nav-menu tiene clase column (lo puedes añadir desde el sidebar) */
    :host(.column) .menu {
      flex-direction: column;
      gap: 0.75rem;
    }

    @media (max-width: 768px) {
      :host-context(sidebar-menu) .menu {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `;

  render() {
    return html`
      <div class="menu">
        <div class="menu-item">Inicio</div>
        <div class="menu-item">Tareas</div>
        <div class="menu-item">Calendario</div>
        <div class="menu-item">Notas</div>
      </div>
    `;
  }
}
