const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) return res.json();
  else throw new Error('Bad Response');
}

export default class ProductData {
  constructor() {}
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
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
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await response.json();
    return data.Result;
  }
}
