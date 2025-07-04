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

    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .hamburger {
      margin-right: 1rem;
      cursor: pointer;
    }

    @media (min-width: 768px) {
      .hamburger {
        display: none;
      }
    }

    icon-bell, user-avatar {
      cursor: pointer;
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
        <div class="header-right">
          <div class="hamburger" @click=${this._openSidebar}>☰</div>
          <nav-menu></nav-menu>
          <icon-bell></icon-bell>
          <user-avatar src="https://cdn-icons-png.flaticon.com/512/4159/4159471.png"></user-avatar>
        </div>
      </header>
    `;
  }

}