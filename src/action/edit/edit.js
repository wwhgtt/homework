require('es6-promise');
require('isomorphic-fetch');
const createAction = require('redux-actions').createAction;
const config = require('../../config');

const setErrorMsg = exports.setErrorMsg = createAction('SET_ERROR_MSG', error => error);
const setProductInfo = createAction('SET_PRODUCT_INFO', info => info);
const changeInfoSuccess = createAction('CHANGE_INFO_SUCCESS');
const getUrlParam = require('../../utils/util.js').getUrlParam;

const infoId = getUrlParam('id');

exports.fetchProductInfo = () => (dispatch, getStates) =>
  fetch(`${config.productInfoAPI}?id=${infoId}`, config.requestOptions).
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

exports.saveProductInfo = (name, codes) => (dispatch, getStates) => {
    const requestOptions = Object.assign({}, config.requestOptions, { method: 'POST' });
    let data = {
        code: codes,
        name: name
    };
    requestOptions.body = JSON.stringify(data);
    console.log(requestOptions);
    fetch(config.saveProductInfoAPI, requestOptions).
        then(res => {
            if (!res.ok) {
            dispatch(setErrorMsg('更新商品信息失败...'));
            }
            return res.json();
        }).
        then(() => {
            dispatch(changeInfoSuccess());
        }).
        catch(err => {
            dispatch(setErrorMsg('更新商品信息失败...'));
        });
}
  