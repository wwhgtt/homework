import Immutable from 'seamless-immutable';

const defaultState = Immutable.from({
    productInfo: undefined
});

module.exports = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_PRODUCT_INFO':
      return state.set('productInfo', payload)
    default:
      return state;
  }
};
