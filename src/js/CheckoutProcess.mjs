import ExternalServices from './ExternalServices.mjs';
import { setLocalStorage, alertMessage, clearAlerts } from './utils.mjs';
const externalServices = new ExternalServices();

const packageItems = (items) =>
  items.map((item) => ({
    id: item.Id,
    price: item.FinalPrice,
    name: item.Name,
    quantity: 1,
  }));

export default class CheckoutProcess {
  itemTotal = 0;
  subtotal = 0;
  tax = 0;
  shipping = 0;
  orderTotal = 0;

  constructor(cart, outputSelector) {
    this.cart = cart;

    this.itemCountEl = document.querySelector(`${outputSelector} #itemCount`);
    this.subtotalEl = document.querySelector(`${outputSelector} #subtotal`);
    this.taxEl = document.querySelector(`${outputSelector} #tax`);
    this.shippingEl = document.querySelector(`${outputSelector} #shipping`);
    this.orderTotalEl = document.querySelector(`${outputSelector} #orderTotal`);

    this.getItemCount();
    this.getSubtotal();
    this.getTax();
    this.displayTotals();
  }

  getItemCount = () => (this.itemTotal = this.cart.length);
  getSubtotal = () =>
    (this.subtotal = this.cart
      .map((item) => item.FinalPrice)
      .reduce((sum, item) => sum + item, 0));
  getTax = () => (this.tax = this.subtotal * 0.06);
  getShipping = () => (this.shipping = this.itemTotal * 2 + 8);

  getTotal() {
    this.orderTotal =
      parseFloat(this.subtotal) +
      parseFloat(this.tax) +
      parseFloat(this.shipping);
  }

  displayTotals(withShipping = false) {
    this.itemCountEl.textContent = this.itemTotal;
    this.taxEl.textContent = `$${this.tax.toFixed(2)}`;
    this.subtotalEl.textContent = `$${this.subtotal.toFixed(2)}`;
    if (withShipping) {
      this.shippingEl.textContent = `$${this.shipping.toFixed(2)}`;
      this.orderTotalEl.textContent = `$${this.orderTotal.toFixed(2)}`;
    }
  }

  updateTotal() {
    this.getShipping();
    this.getTotal();
    this.displayTotals(true);
  }

  async checkout() {
    const formData = new FormData(document.forms['checkout']);

    const order = {};
    formData.forEach((value, key) => (order[key] = value));

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.cart);

    try {
      const res = await externalServices.checkout(order);
      // Using window['console] as ESLint does not like console
      window['console'].log(res);
      setLocalStorage('so-cart', []);
      window.location.href = './success.html';
    } catch (e) {
      window['console'].error(e);
      clearAlerts();

      for (const message in e.message)
        alertMessage(e.message[message], true, '#000', '#f707');
    }
  }
}
