import { loadHeaderFooter } from './utils.mjs';
import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import updateCartCount from './cart.js';

loadHeaderFooter();

const dataSource = new ProductData('tents');
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);

product.init();

updateCartCount();
