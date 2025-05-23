import { loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert.mjs';
import updateCartCount from './cart.js';

loadHeaderFooter();

const productData = new ProductData('tents');
const productList = new ProductList(
  'tents',
  productData,
  document.querySelector('.product-list'),
);

productList.init();

new Alert();

updateCartCount();
