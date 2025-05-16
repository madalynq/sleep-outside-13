import { renderListWithTemplate } from './utils.mjs';
const alertTemplate = ({ message, background, color }) =>
  `<p style="${background ? `background: ${background};` : ''}${color ? `color: ${color};` : ''}">${message}<button onClick="this.parentElement.remove()">X</button></p>`;

export default class Alert {
  constructor() {
    // constructors are not allowed to be async
    this.init();
  }

  async init() {
    this.alerts = await this.getAlerts();
    // early exit if there are no alerts
    if (this.alerts.length < 1) return;

    const alertsBox = document.createElement('section');
    alertsBox.classList.add('alert-list');
    document.querySelector('main').prepend(alertsBox);

    // note: will need changed if a different implementation is used for `renderListWithTemplate`
    renderListWithTemplate(
      alertsBox,
      this.alerts,
      alertTemplate,
      undefined,
      false,
    );
  }

  async getAlerts() {
    try {
      const res = await fetch('../json/alerts.json');
      if (res.ok) return this.getJson(res);
    } catch (e) {
      throw new Error('Error whilst getting alerts.json:', e);
    }
  }

  async getJson(data) {
    let result;
    // we return an empty array if normal parsing fails,
    // which can happen if `alerts.json` is empty
    try {
      result = await data.json();
    } catch {
      result = [];
    }
    // it will break stuff further along if the result isn't an array,
    // so we return an empty array if that's the case
    return Array.isArray(result) ? result : [];
  }
}

/* Testing JSON (place in alerts.json)
[
    {
        "message": "This is only a test.",
        "background": "darkblue",
        "color": "white"
    },
    {
        "message": "This is also a test.",
        "background": "yellow",
        "color": "black"
    },
    {
        "message": "This, however, is a test.",
        "background": "linear-gradient(45deg, red, orange)",
        "color": "white"
    },
    {
        "message": "This one tests fallback colors, isn't that neat?"
    }
]
*/
