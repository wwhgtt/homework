require('es6-promise');
require('isomorphic-fetch');
const createAction = require('redux-actions').createAction;
const config = require('../../config');

const setErrorMsg = exports.setErrorMsg = createAction('SET_ERROR_MSG', error => error);
const setMenuData = createAction('SET_MENU_DATA', menuData => menuData);
const setSearchMenuData = createAction('SET_SEARCH_MENU_DATA', menuData => menuData);

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

exports.searchMenu = (name, code) => (dispatch, getStates) =>
  fetch(`${config.searchMenuAPI}?name=${name}&code=${code}`, config.requestOptions).
    then(res => {
      if (!res.ok) {
        dispatch(setErrorMsg('搜索信息失败...'));
      }
      return res.json();
    }).
    then(menuData => {
      dispatch(setSearchMenuData(menuData.data));
    }).
    catch(err => {
      dispatch(setErrorMsg('搜索信息失败...'));
    });