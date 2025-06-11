import { loadHeaderFooter, getParam } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';

loadHeaderFooter();

const category = getParam('category') || 'tents'; // fallback
console.log('Category from URL:', getParam('category'));
console.log('Resolved category:', category);

const productList = new ProductList(
  category,
  new ExternalServices(),
  document.querySelector('.product-list')
);

productList.init();

console.log('Category from URL:', getParam('category'));
console.log('Resolved category:', category);