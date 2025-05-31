import Alert from './Alert.mjs';

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
// export const getLocalStorage = key => JSON.parse(localStorage.getItem(key));

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

/**
 * @param {String} param - URL query string to retrieve data from
 * @returns {String|Null} contents of requested URL query string. Null if query is not found
 */
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
// or a more concise version if you are into that sort of thing:
// export const getParam = param => new URLSearchParams(window.location.search).get(param);

/**
 * @param {Function} templateFn - function to map list items with
 * @param {Element} parentElement HTML element to parent list items to
 * @param {Array} list - items to list
 * @param {'beforebegin'|'afterbegin'|'beforeend'|'afterend'} position - where to place list HTML. See https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML#parameters for details
 * @param {Boolean} clear - whether to remove existing HTML from parent element. true: remove; false: keep
 */
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false,
) {
  if (clear) parentElement.innerHTML = '';
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}
// or a more "concise" version if you are into that sort of thing:
// export const renderListWithTemplate = (templateFn, parentElement, list, position = 'afterbegin', clear = false) => ((clear ? parentElement.innerHTML = '' : void 0), parentElement.insertAdjacentHTML(position, list.map(templateFn).join('')));

/**
 * @param {String} template - HTML as a string to render
 * @param {Element} parentElement HTML element to append template to
 * @param {*} data? - arguments for callback function
 * @param {Function} callback? - callback function to execute
 */
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML('afterbegin', template);
  if (callback) callback(data);
}
// or a more concise version if you are into that sort of thing:
// export const renderWithTemplate = (template, parentElement, data, callback) => (parentElement.insertAdjacentHTML('afterbegin', template), callback ? callback(data) : void 0);

/**
 * @param {String} path - path to template
 * @returns {String} template HTML as string
 */
export async function loadTemplate(path) {
  const res = await fetch(path);
  if (res.ok) return await res.text();
}

/**
 * @description loads the header and footer for each page from the template files in `public/partials/{header|footer}.html`
 */
export async function loadHeaderFooter() {
  for (const part of ['header', 'footer']) {
    const template = await loadTemplate(`../partials/${part}.html`);
    const element = document.getElementById(`main-${part}`);
    renderWithTemplate(template, element);
  }
  updateCartCount();
}

// Moved to utils as importing from cart caused the header to be loaded twice
/**
 * @description gets the count of items in a users cart and displays it by the cart icon. hidden if cart is empty
 */
function updateCartCount() {
  const cartItems = getLocalStorage('so-cart') || [];
  const itemCount = cartItems.length; // Or sum quantity if quantity varies

  const cartCount = document.querySelector('.cart-count');

  if (itemCount > 0) {
    cartCount.textContent = itemCount;
    cartCount.style.display = 'inline-block';
  } else {
    cartCount.style.display = 'none';
  }
}

export function updateCartTotal() {
  const cartItems = getLocalStorage('so-cart') || [];
  const cartTotal = document.querySelector('.cart-total'); // reference html element
  let runningTotal = 0; // create variable to hold running total

  // loop through cart items and add FinalPrice to running total
  for (let i = 0; i < cartItems.length; i++) {
    runningTotal += cartItems[i].FinalPrice; //add price of item to running total
  }

  const total = runningTotal.toFixed(2); // create variable to display total to the hundredths
  cartTotal.textContent = `Cart Total: $ ${total}`; // display total of cart on page

  // display if items in cart

  cartTotal.parentElement.classList.toggle('hide', !cartItems.length);
}

/**
 * @param {String} text - piece of text to capitalize the first letter of
 * @returns {String} Capitalized text
 */
export const capitalize = (text) =>
  text.replace(/^[a-z]/, (l) => l.toUpperCase());

/**
 * @param {String} text - piece of text to capitalize the first letters of each word in
 * @returns {String} Capitalized text
 */
export const capitalizeAll = (text) =>
  text.replace(/\b[a-z]/g, (l) => l.toUpperCase());

const alert = new Alert();

export function alertMessage(
  message,
  scroll = true,
  color = '#000',
  bgColor = '#f707',
) {
  alert.renderAlert({ message, color, background: bgColor });
  if (scroll) scrollTo(0, 0);
}

export function alertMessages(alerts, scroll = true) {
  alert.renderAlerts(alerts);
  if (scroll) scrollTo(0, 0);
}

export const clearAlerts = () =>
  document.querySelectorAll('.alert').forEach((a) => a.remove());

export function alertMessage(message, scroll = true) {
  const main = document.querySelector('main');

  // Create alert container
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `
    <span>${message}</span>
    <button class="close" aria-label="Close alert">&times;</button>
  `;

  // Add close button event
  alert.querySelector('.close').addEventListener('click', () => {
    alert.remove();
  });

  // Add alert to top of main
  main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);
}

export function cartAnimation() {
  const cartCount = document.querySelector('.cart-count');
  if (!cartCount) return;

  cartCount.classList.remove('cart-pop');
  void cartCount.offsetWidth;
  cartCount.classList.add('cart-pop');
}

export function updateTheCartNum() {
  const cartItems = getLocalStorage('so-cart') || [];
  const cartCountEl = document.querySelector('.cart-count');
  if (!cartCountEl) return;

  const count = cartItems.length;
  cartCountEl.textContent = count;

  if (count === 0) {
    cartCountEl.style.display = 'none';
  } else {
    cartCountEl.style.display = 'inline-block';
  }
}
