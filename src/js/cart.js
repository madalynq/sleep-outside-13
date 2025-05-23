import { loadHeaderFooter } from './utils.mjs';
import { getLocalStorage } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

const shoppingCart = new ShoppingCart(
  document.querySelector('.product-list'),
  getLocalStorage('so-cart'),
);

loadHeaderFooter();

shoppingCart.init();

export default function updateCartCount() {
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

updateCartCount();
