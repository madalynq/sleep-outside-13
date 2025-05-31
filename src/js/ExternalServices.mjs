const baseURL = import.meta.env.VITE_SERVER_URL;

/**
 * @description retrieves JSON from given fetch response; throws error if request failed
 * @param {Response} res - response from Fetch request
 * @returns {JSON} parsed JSON from response
 */
async function convertToJson(res) {
  const json = await res.json();
  if (res.ok) return json;
  else throw { name: 'servicesError', message: json };
}

export default class ExternalServices {
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

  async checkout(data) {
    return await convertToJson(
      await fetch(`${baseURL}checkout/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    );
  }
}
