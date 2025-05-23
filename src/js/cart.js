import {
  loadHeaderFooter,
  getLocalStorage,
  updateCartCount,
} from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

const shoppingCart = new ShoppingCart(
  document.querySelector('.product-list'),
  getLocalStorage('so-cart'),
);

shoppingCart.init();

await loadHeaderFooter();
updateCartCount();
