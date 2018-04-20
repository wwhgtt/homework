require('es6-promise');
require('isomorphic-fetch');
const createAction = require('redux-actions').createAction;
const config = require('../../config');

const setErrorMsg = exports.setErrorMsg = createAction('SET_ERROR_MSG', error => error);
const setProductInfo = createAction('SET_PRODUCT_INFO', info => info);

exports.fetchProductInfo = (id) => (dispatch, getStates) =>
  fetch(`${config.productInfoAPI}?id=${id}`, config.requestOptions).
    then(res => {
      if (!res.ok) {
        dispatch(setErrorMsg('获取商品信息失败...'));
      }
      return res.json();
    }).
    then(menuData => {
      dispatch(setProductInfo(menuData.data));
    }).
    catch(err => {
      dispatch(setErrorMsg('加载商品信息失败...'));
    });