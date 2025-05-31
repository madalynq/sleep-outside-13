import { getLocalStorage, setLocalStorage, updateCartCount } from './utils.mjs';

/**
 * @param {Object} product - product object
 * @description `product` must contain the following keys:
 * - Brand(Object).Name(String),
 * - NameWithoutBrand(String),
 * - Image(String),
 * - FinalPrice(Number),
 * - Colors(Array[Object])[0].ColorName(String),
 * - DescriptionHtmlSimple(String)
 */
function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('productPrice').textContent =
    `$${product.FinalPrice}`;
  document.getElementById('productColor').textContent =
    product.Colors[0].ColorName;
  document.getElementById('productDesc').innerHTML =
    product.DescriptionHtmlSimple;
  document.getElementById('addToCart').dataset.id = product.Id;

  document.title = `Sleep Outside | ${product.NameWithoutBrand}`;
}

export default class ProductDetails {
  /**
   * @param {String} productId - ID for given product
   * @param {ExternalServices} dataSource - ExternalServices for given product
   */
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  /**
   * @description retrieves requested product from dataSource, then renders the relevant HTML
   */
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  /**
   * @description retrieves cart from localStorage and checks if the given item is already present. If yes: add 1 to item quantity; else: set quantity to 1 and add it to cart; finally: returns cart to localStorage
   *
   */
  addToCart() {
    const cartItems = getLocalStorage('so-cart') || [];
    let inCart = false;

    for (const item of cartItems)
      if (item.Id === this.productId) {
        if (!item.Quantity) item.Quantity = 1;
        item.Quantity++;
        inCart = true;
      }

    if (!inCart) {
      this.product.Quantity = 1;
      cartItems.push(this.product);
    }

    setLocalStorage('so-cart', cartItems);
    updateCartCount();
  }

  /**
   * @description calls productDetailsTemplate with stored product
   */
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}
