import { getLocalStorage } from './utils.mjs';

/**
 * @description retrieves cart items from localStorage and builds the corresponding HTML, then sets the relevent HTML
 */
function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
}

/**
 * @param {Object} item - cart item to build HTML for
 * @returns {String} string representation of relevent HTML
 * @description `item` object requires the following keys: 
 * - Image(String), 
 * - Name(String), 
 * - Colors(Array[Object])[0].ColorName(String), 
 * - FinalPrice(Number)
 */
function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
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

  return newItem;
}

renderCartContents();
