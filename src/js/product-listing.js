import { loadHeaderFooter, getParam } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';

loadHeaderFooter();

const productList = new ProductList(
  getParam('category'),
  new ExternalServices(),
  document.querySelector('.product-list'),
);

productList.init();
