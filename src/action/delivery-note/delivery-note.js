require('es6-promise');
require('isomorphic-fetch');
const createAction = require('redux-actions').createAction;
const config = require('../../config');

const setErrorMsg = exports.setErrorMsg = createAction('SET_ERROR_MSG', error => error);
const getUrlParam = require('../../utils/util.js').getUrlParam;

exports.fetchProductInfo = () => (dispatch, getStates) =>
  fetch(`${config.productInfoAPI}?id=${infoId}`, config.requestOptions).
    then(res => {
      if (!res.ok) {
        dispatch(setErrorMsg('获取出货单信息失败...'));
      }
      return res.json();
    }).
    then(menuData => {
      dispatch(setProductInfo(menuData.data));
    }).
    catch(err => {
      dispatch(setErrorMsg('加载出货单信息失败...'));
    });

  