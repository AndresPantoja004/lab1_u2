import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('header-component')
export class HeaderComponent extends LitElement {
  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: var(--primary-color);
      color: white;
      border-bottom: 0.3px solid var(--accent-color);
    }

    .logo {
      font-size: 1.2rem;
      font-weight: bold;
    }

    .hamburger {
      cursor: pointer;
      display: block;
    }

    .header-right {
      display: none;
      align-items: center;
      gap: 1rem;
    }

    nav-menu,
    icon-bell,
    user-avatar {
      display: none;
    }

    @media (min-width: 768px) {
      .header-right {
        display: flex;
      }

      nav-menu,
      icon-bell,
      user-avatar {
        display: block;
      }

      .hamburger {
        display: none;
      }
    }
  `;

  private _openSidebar() {
    this.dispatchEvent(new CustomEvent('open-sidebar', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <header>
        <div class="logo">🧻 ESPE Tasks</div>
        <div class="hamburger" @click=${this._openSidebar}>☰</div>
        <div class="header-right">
          <nav-menu></nav-menu>
          <icon-bell></icon-bell>
          <user-avatar src="https://cdn-icons-png.flaticon.com/512/4159/4159471.png"></user-avatar>
        </div>
      </header>
    `;
  }
}
