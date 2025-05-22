import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  const discountPercent =
    ((product.SuggestedRetailPrice - product.FinalPrice) /
      product.SuggestedRetailPrice) *
    100;

  if (product.FinalPrice.toFixed(2) < product.SuggestedRetailPrice.toFixed(2))
    return `<li class="product-card">
              <a href="../product_pages/?product=${product.Id}">
                  <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
                  <h2 class="card__brand">${product.Brand.Name}</h2>
                  <h3 class="card__name">${product.Name}</h3>
                  <p class="product-card__price" id="sale">$${product.FinalPrice.toFixed(2)}</p>
                  <p>
                    <span id="discount">$${product.SuggestedRetailPrice.toFixed(2)}</span>
                    <span class="percent">${discountPercent.toFixed(0)}% off</span>
                  </p>
              </a>
          </li>`;
  else
    return `<li class="product-card">
              <a href="../product_pages/?product=${product.Id}">
                  <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
                  <h2 class="card__brand">${product.Brand.Name}</h2>
                  <h3 class="card__name">${product.Name}</h3>
                  <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
              </a>
          </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

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

