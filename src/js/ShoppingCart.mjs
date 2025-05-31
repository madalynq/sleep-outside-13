import {
  renderListWithTemplate,
  getLocalStorage,
  setLocalStorage,
  updateCartCount,
} from './utils.mjs';

// both used in ShoppingCart.changeItemQuantity
let mouseDown = false;
addEventListener('mouseup', () => (mouseDown = false));

/**
 * @param {Object} item - cart item to build HTML for
 * @param {String} item.Id - item id
 * @param {String} item.Name - item name
 * @param {Number} item.Quantity - quantity of items
 * @param {Number} item.FinalPrice - price of item
 * @param {Object} item.Images - object holding images
 * @param {String} item.Images.PrimarySmall
 * @param {Object[]} item.Colors - array holding colors
 * @param {String} item.Colors[].ColorName
 * @returns {String} string representation of relevant HTML
 */
const shoppingCartTemplate = (
  item,
) => `<li class='cart-card divider' data-product="${item.Id}">
  <button class="cart-card__remove" title="Remove item from cart" role="button">X</button>
  <a href='#' class='cart-card__image'>
    <img src='${item.Images.PrimarySmall}' alt='${item.Name}'>
  </a>
  <a href='#'><h2 class='card__name'>${item.Name}</h2></a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: ${item.Quantity ?? 1}
    <button role="button" title="increase item quantity by 1" class="cart-card__add1"><span>+</span></button>
    <button role="button" title="decrease item quantity by 1" class="cart-card__sub1"><span>-</span></button>
  </p>
  <p class='cart-card__price'>$${(item.FinalPrice * (item.Quantity || 1)).toFixed(2)}${item.Quantity > 1 ? ` ($${item.FinalPrice.toFixed(2)})` : ''}</p>
</li>`;

export default class ShoppingCart {
  /**
   * @param {HTMLElement} parent - parent element to append cart items to
   * @param {Object[]} cartItems - contents of cart to be rendered
   */
  constructor(parent, cartItems) {
    this.parent = parent;
    this.cartItems = cartItems;
    this.updateCartTotal();
  }

  /**
   * @description renders cart from template if there are items to render; otherwise displays empty cart message
   */
  init() {
    if (this.cartItems !== null && this.cartItems.length > 0) {
      renderListWithTemplate(
        shoppingCartTemplate,
        this.parent,
        this.cartItems,
        undefined,
        true,
      );

      // sets event listeners on the remove and quantity buttons
      this.parent.querySelectorAll('.cart-card').forEach((el) => {
        el.querySelector('.cart-card__remove').addEventListener(
          'click',
          this.removeFromCart.bind(this),
        );
        el.querySelector('.cart-card__add1').addEventListener(
          'mousedown',
          (e) => ((mouseDown = true), this.changeItemQuantity(e, 1)),
        );
        el.querySelector('.cart-card__sub1').addEventListener(
          'mousedown',
          (e) => ((mouseDown = true), this.changeItemQuantity(e, -1)),
        );
      });
    } else this.parent.innerHTML = `<h3>Your Cart is Empty</h3>`;
  }

  /**
   * @param {Event} e - mousedown event
   * @param {Number} change - ammount to change quantity by
   * @param {Number} delay [INTERNAL] how long to wait between repeat actions
   * @returns {void}
   * @description changes the quantity of a given cart item and repeats the action with increasing speed as long as the button is held down
   */
  changeItemQuantity(e, change, delay = 500) {
    // aborts action if button is no longer pressed I.E. after timeout
    if (!mouseDown) return;

    // could have clicked wither the button, or the span in the button - if it isn't the first, it is the other
    const id =
      e.target.parentElement.parentElement.dataset.product ||
      e.target.parentElement.parentElement.parentElement.dataset.product;

    this.cartItems = this.cartItems || getLocalStorage('so-cart');

    const targ = this.cartItems.find((i) => i.Id === id);

    // mainly for legacy cart items that lack a quantity property
    if (!targ.Quantity) targ.Quantity = 1;

    // you can't have an item with '0' quantity
    if (targ.Quantity + change === 0) return;
    targ.Quantity += change;

    this.updateEverything();

    // golden ratio go brr
    let newDelay = delay / 1.618;

    setTimeout(
      () =>
        this.changeItemQuantity(e, change, newDelay > delay ? 100 : newDelay),
      newDelay,
    );
  }

  /**
   * @param {String|Event} e - either ID of the product to remove, or a click event object from the remove from cart button
   */
  removeFromCart(e) {
    // if 'e' is a string, use it as the id; else treat it as an event to snag the id from
    const id =
      typeof e === 'string' ? e : e.target.parentElement.dataset.product;

    // filter the cart to remove the selected item based off the id
    this.cartItems = getLocalStorage('so-cart').filter((i) => i.Id !== id);

    this.updateEverything();
  }

  /**
   * @description updates total - hides total if cart is empty
   */
  updateCartTotal() {
    // reference html element
    const cartTotal = document.querySelector('.cart-total');

    // reduce prices of cart items; multiply individual prices by quantity
    const total = this.cartItems.reduce(
      (prev, curr) => prev + curr.FinalPrice * (curr.Quantity || 1),
      0,
    );

    // display total of cart on page
    cartTotal.textContent = `Cart Total: $ ${total.toFixed(2)}`;

    // display if items in cart
    cartTotal.parentElement.classList.toggle('hide', !total);
  }

  /**
   * @description updates localstorage, cart card list, cart total, and cart item count
   */
  updateEverything() {
    setLocalStorage('so-cart', this.cartItems);
    this.init();
    this.updateCartTotal();
    updateCartCount();
  }
}
