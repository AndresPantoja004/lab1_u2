import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('icon-bell')
export class IconBell extends LitElement {
  static styles = css`
    .wrapper {
      background-color: #214a3c; /* Verde oscuro que combina con el fondo */
      width: 30px;
      height: 30px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    svg {
      width: 20px;
      height: 20px;
      fill: white;
      transition: fill 0.3s ease;
    }

    .wrapper:hover svg {
      fill: #8ecdb7; /* Verde suave al hacer hover */
    }
  `;

  render() {
    return html`
      <div class="wrapper" title="Notificaciones">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path d="M232.49,199.82A15.86,15.86,0,0,1,224,208H175.37a47.87,47.87,0,0,1-94.74,0H32a16,16,0,0,1-12.49-26.18c.11-.14,10.49-12.91,10.49-53.82,0-32.35,8.56-57.56,25.46-75.19C72.12,35.32,88.28,28.43,104,25.45V24a24,24,0,0,1,48,0v1.45c15.72,3,31.88,9.87,48.53,27.16,16.9,17.63,25.47,42.84,25.47,75.19,0,40.91,10.38,53.68,10.49,53.82A15.86,15.86,0,0,1,232.49,199.82ZM128,216a32,32,0,0,0,31.21-24H96.79A32,32,0,0,0,128,216ZM50.25,192H205.75c-4.21-6.62-13.75-24.6-13.75-61.18,0-55.13-25.13-81.24-64-87.58V48a8,8,0,0,0-16,0v-4.76c-38.87,6.34-64,32.45-64,87.58C64,167.4,54.46,185.38,50.25,192Z"/>
        </svg>
      </div>
    `;
  }
}