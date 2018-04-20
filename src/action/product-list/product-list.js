require('es6-promise');
require('isomorphic-fetch');
const createAction = require('redux-actions').createAction;
const config = require('../../config');

const setErrorMsg = exports.setErrorMsg = createAction('SET_ERROR_MSG', error => error);
const setMenuData = createAction('SET_MENU_DATA', menuData => menuData);
exports.setDemo = createAction('DEMO', viewHash => viewHash);

exports.fetchMenuList = () => (dispatch, getStates) =>
  fetch(config.productListAPI, config.requestOptions).
    then(res => {
      if (!res.ok) {
        dispatch(setErrorMsg('获取列表信息失败...'));
      }
      return res.json();
    }).
    then(menuData => {
      dispatch(setMenuData(menuData.data));
    }).
    catch(err => {
      dispatch(setErrorMsg('加载列表信息失败...'));
    });
