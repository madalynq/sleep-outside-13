import { loadHeaderFooter, getLocalStorage } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const order = new CheckoutProcess(
  getLocalStorage('so-cart') || [],
  '.order-summary',
);

document
  .querySelector('#zip')
  .addEventListener('blur', order.updateTotal.bind(order));

document.getElementById('checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();
  order.checkout();
});
