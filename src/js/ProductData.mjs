/**
 * @description retrieves JSON from given fetch response; throws error if request failed
 * @param {Response} res - response from Fetch request
 * @returns {JSON} parsed JSON from response
 */
function convertToJson(res) {
    if (res.ok) return res.json();
    else throw new Error('Bad Response');
}

export default class ProductData {
    /**
     * @param {String} category - path fragment for JSON file
     */
    constructor(category) {
        this.category = category;
        this.path = `../json/${this.category}.json`;
    }

    /**
     * @returns {Array} list of products sourced from `this.path`
     */
    getData() {
        return fetch(this.path)
            .then(convertToJson)
            .then((data) => data);
    }

    /**
     * @param {String} id - ID of product to return
     * @returns {Object} found product data with given ID
     */
    async findProductById(id) {
        const products = await this.getData();
        return products.find((item) => item.Id === id);
    }
}
