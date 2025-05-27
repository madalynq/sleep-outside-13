const baseURL = import.meta.env.VITE_SERVER_URL;

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
  constructor() {}

  /**
   * @param {String} category - path fragment used in search
   * @returns {Array} list of products
   * @description Uses `baseURL` and `category` to build a fetch request for items from the SleepOutside backend API
   */
  async getData(category) {
    const res = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(res);
    return data.Result;
  }

  /**
   * @param {String} id - ID of product to return
   * @returns {Object} found product data with given ID
   */
  async findProductById(id) {
    return (await convertToJson(await fetch(`${baseURL}product/${id}`))).Result;
  }
}
