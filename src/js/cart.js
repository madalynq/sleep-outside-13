import { loadHeaderFooter } from './utils.mjs';
import { getLocalStorage } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

const shoppingCart = new ShoppingCart(
  document.querySelector('.product-list'),
  getLocalStorage('so-cart'),
);

loadHeaderFooter();

shoppingCart.init();
