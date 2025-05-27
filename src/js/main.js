import { loadHeaderFooter } from './utils.mjs';
import Alert from './Alert.mjs';

const productData = new ProductData('tents');
const productList = new ProductList(
  'tents',
  productData,
  document.querySelector('.product-list'),
);

productList.init();

new Alert();

loadHeaderFooter();
