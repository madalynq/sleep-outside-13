/**
 * @description wrapper for querySelector...returns matching element
 * @param {String} selector - CSS selector to query
 * @param {Element} parent - parent HTML Element to query from; root document of undefined
 * @returns {Element} found HTML element
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

/**
 * @description retrieve data from localstorage
 * @param {String} key - localStorage location to retrieve
 * @returns parsed item from localStorage
 */
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// or a more concise version if you are into that sort of thing:
// export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

/**
 * @description save data to local storage
 * @param {String} key - localStorage location to modify
 * @param {*} data - item to stringify and set
 */
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// or a more concise version if you are into that sort of thing:
// export const setLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

/**
 * @description set a listener for both touchend and click
 * @param {String} selector - CSS selector of intended element to listen for clicks on
 * @param {Function} callback - function to call on clicks
 */
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}
