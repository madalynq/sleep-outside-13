import { loadHeaderFooter, getLocalStorage } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const cart = getLocalStorage("so-cart");
const order = new CheckoutProcess(cart, ".order-summary");

document.querySelector("#zip");
document.addEventListener("blur", order.totalCalculator.bind(order));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    order.checkout();
})
