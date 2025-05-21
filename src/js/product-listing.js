import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const listElement = document.querySelector('.product-list');
const productData = new ProductData();
const category = getParam('category');

const productList = new ProductList(category, productData, listElement);
productList.init();

document.querySelector('.title.highlight').textContent = category.charAt(0).toUpperCase() + category.slice(1);