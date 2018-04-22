let apiBase;
let requestOptions;

switch (process.env.NODE_ENV) {
  case 'production':
    apiBase = `http://${process.env.PROD_HOST}`;
    requestOptions = {
      method: 'GET',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    };
    break;
  default:
    apiBase = `http://${process.env.DEV_HOST}:3001`;
    requestOptions = {
      method: 'GET', mod: 'cors',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    };
}

module.exports = {
  // API
  productListAPI: `${apiBase}/productList/all.json`,
  searchMenuAPI: `${apiBase}/productList/search.json`,
  productInfoAPI: `${apiBase}/productList/info.json`,
  saveProductInfoAPI: `${apiBase}/productList/update.json`,
  submitDeliveryNoteAPI: `${apiBase}/delivery/submit.json`,
  deliveryNoteAPI: `${apiBase}/delivery/detail.json`,
  requestOptions,
};
