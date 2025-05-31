import { loadHeaderFooter, getLocalStorage } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const cart = getLocalStorage('so-cart') || [];
if (!cart.length) location.href = '../cart/';

const order = new CheckoutProcess(cart, '.order-summary');

document
  .querySelector('#zip')
  .addEventListener('blur', (e) =>
    e.target.value * 1 > 9999 ? order.updateTotal() : void 0,
  );

document.getElementById('checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();

  if (chk_status) order.checkout();
});
