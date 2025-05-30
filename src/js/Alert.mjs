import { renderListWithTemplate } from './utils.mjs';

/**
 * @param {Object} alert - alert object
 * @param {String} [alert.message] - text content of alert
 * @param {String} [alert.background] - alert background. May be a background image. Should be valid CSS
 * @param {String} [alert.color] - alert text color. Should be valid CSS
 * @returns {String} HTML string representation of alert. Empty string if message is undefined. Includes button to clear alert
 * @example 
 * const alert1 = {
        message: "This is only a test.",
        background: "darkblue",
        color: "white"
    };
    alertTemplate(alert1);
    // <p style="background: darkblue; color: white;">This is only a test.<button onClick="this.parentElement.remove()">X</button></p>

    const alert2 = {
        message: "This, however, is a test.",
        background: "linear-gradient(45deg, red, orange)",
        color: "white"
    };
    alertTemplate(alert2);
    // <p style="background: linear-gradient(45deg, red, orange); color: white;">This, however, as a test.<button onClick="this.parentElement.remove()">X</button></p>

    const alert3 = {
        message: "This one tests fallback colors, isn't that neat?"
    };
    alertTemplate(alert3);
    // <p style="">This one tests fallback colors, isn't that neat?<button onClick="this.parentElement.remove()">X</button></p>
 */
const alertTemplate = ({ message, background, color }) =>
  message === undefined
    ? ''
    : `<p class="alert" style="${background ? `background: ${background};` : ''}${color ? `color: ${color};` : ''}">${message}<button onClick="this.parentElement.remove()">X</button></p>`;

export default class Alert {
  /**
   * @description gets alerts and returns if none. Else calls buildBox and populates alertBox with alerts
   */
  async init() {
    this.alerts = await this.getAlerts();

    // early exit if there are no alerts
    if (this.alerts.length < 1) return;
    this.renderAlerts();
  }

  /**
   * @description renders any stored alerts
   */
  renderAlerts(alerts = this.alerts) {
    if (!this.alertsBox) this.buildBox();
    renderListWithTemplate(alertTemplate, this.alertsBox, alerts);
  }

  renderAlert(alert) {
    if (!this.alertsBox) this.buildBox();
    renderListWithTemplate(alertTemplate, this.alertsBox, [alert]);
  }

  /**
   * @description builds alertBox and prepends it to main HTML element
   */
  buildBox() {
    this.alertsBox = document.querySelector('.alert-list');

    if (!this.alertsBox) {
      this.alertsBox = document.createElement('section');
      this.alertsBox.classList.add('alert-list');
      document.querySelector('main').prepend(this.alertsBox);
    }
  }

  /**
   * @returns {Array} contents of alerts.json or empty array
   */
  async getAlerts() {
    try {
      const res = await fetch('../json/alerts.json');
      if (res.ok) return this.getJson(res);
    } catch (e) {
      throw new Error('Error whilst getting alerts.json:', e);
    }
  }

  /**
   * @param {Promise<Response>} data - Fetch response object to retrieve JSON from
   * @returns {Array} parsed array from data. Empty array if invalid
   * @description returns different results based on provided data:
   * - parsed & is array => array of data
   * - parsed & not array => empty array
   * - fails to parse => empty array
   */
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
