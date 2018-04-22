import Immutable from 'seamless-immutable';

const defaultState = Immutable.from({
    productInfo: undefined,
    changeInfoStatus: false,
    errorMessage: undefined
});

module.exports = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_PRODUCT_INFO':
      return state.set('productInfo', payload)
    case 'CHANGE_INFO_SUCCESS': 
      return state.set('changeInfoStatus', true)
    case 'SET_ERROR_MSG':
      return state.set('errorMessage', payload)
    default:
      return state;
  }
};
