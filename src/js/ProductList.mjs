import { renderListWithTemplate } from './utils.mjs';

/**
 * @param {Object} product - product to build HTML for
 * @returns {String} HTML string representation of product
 */
function productCardTemplate(product) {
    return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
                <img src="${product.Image}" alt="Image of ${product.Name}">
                <h2 class="card__brand">${product.Brand.Name}</h2>
                <h3 class="card__name">${product.Name}</h3>
                <p class="product-card__price">${product.FinalPrice}</p>
            </a>
        </li>`;
}

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
     * @description retireves products to render as a list from the dataSource, then calls this.renderList
     */
    async init() {
        const list = await this.dataSource.getData();
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
