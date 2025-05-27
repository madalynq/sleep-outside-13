import {
  renderListWithTemplate,
  getLocalStorage,
  setLocalStorage,
  updateCartTotal,
} from './utils.mjs';

/**
 * @param {Object} item - cart item to build HTML for
 * @returns {String} string representation of relevant HTML
 * @description `item` object requires the following keys:
 * - Image(String),
 * - Name(String),
 * - Colors(Array[Object])[0].ColorName(String),
 * - FinalPrice(Number)
 */
const shoppingCartTemplate = (
  item,
) => `<li class='cart-card divider' data-product="${item.Id}">
  <button class="cart-card__remove" title="Remove item from cart" role="button">X</button>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

export default class ShoppingCart {
  /**
   * @param {HTMLElement} parent - parent element to append cart items to
   * @param {Object[]} cartItems - contents of cart to be rendered
   */
  constructor(parent, cartItems) {
    this.parent = parent;
    this.cartItems = cartItems;
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
      this.parent
        .querySelectorAll('.cart-card__remove')
        .forEach((el) =>
          el.addEventListener('click', this.removeFromCart.bind(this)),
        );
    } else this.parent.innerHTML = `<h3>Your Cart is Empty</h3>`;
  }

  /**
   * @param {String|Event} e - either ID of the product to remove, or a click event object from the remove from cart button
   */
  removeFromCart(e) {
    const id =
      typeof e === 'string' ? e : e.target.parentElement.dataset.product;
    this.cartItems = getLocalStorage('so-cart').filter((i) => i.Id !== id);
    setLocalStorage('so-cart', this.cartItems);
    this.init();
    updateCartTotal();
  }
}
