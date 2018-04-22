require('es6-promise');
require('isomorphic-fetch');
const createAction = require('redux-actions').createAction;
const config = require('../../config');

const setErrorMsg = exports.setErrorMsg = createAction('SET_ERROR_MSG', error => error);
const setDeliveryNoteInfo = createAction('SET_DELIVERY_NOTE_INFO', info => info);
const saveSuccess = createAction('SAVE_SUCCESS');
const getUrlParam = require('../../utils/util.js').getUrlParam;

const noteId = getUrlParam('noteId');

exports.fetchDeliveryInfo = () => (dispatch, getStates) =>
  fetch(`${config.getDeliveryNoteInfoAPI}?id=${noteId}`, config.requestOptions).
    then(res => {
      if (!res.ok) {
        dispatch(setErrorMsg('获取出货单信息失败...'));
      }
      return res.json();
    }).
    then(menuData => {
      dispatch(setDeliveryNoteInfo(menuData.data));
    }).
    catch(err => {
      console.log(err)
      dispatch(setErrorMsg('加载出货单信息失败...'));
    });

exports.saveDeliveryNote = (noteInfo) => (dispatch, getStates) => {
  let requestOptions = Object.assign({}, config.requestOptions, {method: "POST"});
  requestOptions.body = JSON.stringify(noteInfo);
  return fetch(config.saveDeliveryNoteAPI, requestOptions).
    then(res => {
      if (!res.ok) {
        dispatch(setErrorMsg('保存出货单信息失败...'));
      }
      return res.json();
    }).
    then(menuData => {
      dispatch(saveSuccess());
    }).
    catch(err => {
      dispatch(setErrorMsg('保存出货单信息失败...'));
    });
}

exports.clearErrorMsg = () => (dispatch, getState) =>
  dispatch(setErrorMsg(null));
