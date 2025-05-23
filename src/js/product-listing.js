import { loadHeaderFooter, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

loadHeaderFooter();

const productList = new ProductList(
  getParam('category'),
  new ProductData(),
  document.querySelector('.product-list'),
);

productList.init();
