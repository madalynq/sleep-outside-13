import { renderListWithTemplate, capitalizeAll } from './utils.mjs';

/**
 * @param {String} Id - product ID
 * @param {String} NameWithoutBrand - name without brand
 * @param {String} Name - brand with name
 * @param {String} Images - product image path
 * @param {String} Brand - brand without name
 * @param {Number} FinalPrice - price of product
 * @returns {String} HTML string representation of product
 */
const productCardTemplate = ({
  Id,
  NameWithoutBrand,
  Name,
  Images,
  Brand,
  FinalPrice,
}) => `
<li class="product-card">
  <a href="../product_pages/?product=${Id}">
    <img src="${Images.PrimaryMedium}" alt="${Name}">
    <h3 class="card__brand">${Brand.Name}</h3>
    <h2 class="card__name">${NameWithoutBrand}</h2>
    <p class="product-card__price">$${FinalPrice}</p>
  </a>
</li>`;

export default class ProductList {
  /**
   * @param {String} category - category of the products
   * @param {ProductData} dataSource - ProductData class holding relevant data
   * @param {Element} listElement - HTML element to parent list items to
   */
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  /**
   * @description retrieves products to render as a list from the dataSource, then calls this.renderList
   */
  async init() {
    const list = await this.dataSource.getData(this.category);
    const categoryCapitalized = capitalizeAll(
      this.category.split('-').join(' '),
    );
    document.getElementById('product-category').textContent =
      categoryCapitalized;
    document.title = document.title.replace(
      '{{product-category}}',
      categoryCapitalized,
    );
    this.renderList(list);
  }

  /**
   * @param {Array} list - items used in list
   */
  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      'afterbegin',
      true,
    );
  }
}
