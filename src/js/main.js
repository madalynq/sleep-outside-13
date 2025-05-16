import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert.mjs';

const dataSource = new ProductData('tents');
const productList = new ProductList(
  'tents',
  dataSource,
  document.querySelector('.product-list'),
);

productList.init();
new Alert();
