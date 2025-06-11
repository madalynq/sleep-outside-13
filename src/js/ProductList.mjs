import { renderListWithTemplate, capitalizeAll } from './utils.mjs';

/**
 * @param {String} Id - product ID
 * @param {String} NameWithoutBrand - name without brand
 * @param {String} Name - brand with name
 * @param {String} Images - product image path
 * @param {String} Brand - brand without name
 * @param {Number} SuggestedRetailPrice - suggested retail price of product
 * @param {Number} FinalPrice - actual price of product
 * @returns {String} HTML string representation of product
 */
const productCardTemplate = ({
  Id,
  NameWithoutBrand,
  Name,
  Images,
  Brand,
  SuggestedRetailPrice,
  FinalPrice,
}) => `
<li class="product-card">
  <a href="../product_pages/?product=${Id}">
    <img src="${Images.PrimaryMedium}" alt="${Name}">
    <h3 class="card__brand">${Brand.Name}</h3>
    <h2 class="card__name">${NameWithoutBrand}</h2>
    <p class="product-card__price">$${FinalPrice}</p>${
      FinalPrice < SuggestedRetailPrice
        ? `
    <p>
      <span class="discount">$${SuggestedRetailPrice.toFixed(2)}</span>
      <span class="percent">${Math.round(
        ((SuggestedRetailPrice - FinalPrice) / SuggestedRetailPrice) * 100
      )}% off</span>
    </p>`
        : ''
    }
  </a>
</li>`;

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.sortSelect = document.getElementById('sort-options');
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData(this.category);
    const categoryCapitalized = capitalizeAll(
      this.category.split('-').join(' ')
    );
    document.getElementById('product-category').textContent = categoryCapitalized;
    document.title = document.title.replace('{{product-category}}', categoryCapitalized);

    // Initial render
    this.renderList(this.products);

    // Add listener for sort changes
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', () => {
        const sorted = this.getSortedProducts(this.sortSelect.value);
        this.renderList(sorted);
      });
    }
  }

  getSortedProducts(sortType) {
    const sorted = [...this.products];
    switch (sortType) {
      case 'price-asc':
        sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.FinalPrice - a.FinalPrice);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.NameWithoutBrand.localeCompare(a.NameWithoutBrand));
        break;
      default:
        return this.products;
    }
    return sorted;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, 'afterbegin', true);
  }
}