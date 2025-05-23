import { loadHeaderFooter, updateCartCount } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert.mjs';

const productData = new ProductData('tents');
const productList = new ProductList(
  'tents',
  productData,
  document.querySelector('.product-list'),
);

productList.init();

new Alert();

await loadHeaderFooter();
updateCartCount();
