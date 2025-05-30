import {
  loadHeaderFooter,
  getParam,
  cartAnimation,
  updateTheCartNum,
} from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ExternalServices('tents');
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);

product.init();

loadHeaderFooter();

const addToCart = document.querySelector('#addToCart');

addToCart.addEventListener('click', () => {
  updateTheCartNum();
  cartAnimation();
});
