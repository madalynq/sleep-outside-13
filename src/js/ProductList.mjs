import { renderListWithTemplate } from './utils.mjs';

const productCardTemplate = ({
  Id,
  NameWithoutBrand,
  Name,
  Image,
  Brand,
  FinalPrice,
}) => `
<li class="product-card">
  <a href="product_pages/?product=${Id}">
    <img src="${Image}" alt="${Name}">
    <h3 class="card__brand">${Brand.Name}</h3>
    <h2 class="card__name">${NameWithoutBrand}</h2>
    <p class="product-card__price">$${FinalPrice}</p>
  </a>
</li>`;

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
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
