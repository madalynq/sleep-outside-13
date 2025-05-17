import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const listElement = document.querySelector('.product-list');
const productData = new ProductData('tents');
const productList = new ProductList('tents', productData, listElement);

productList.init();
