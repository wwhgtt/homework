import Immutable from 'seamless-immutable';

const defaultState = Immutable.from({
  menuList: []
});

module.exports = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_MENU_DATA':
      return state.set('menuList', payload || []);
    default:
      return state;
  }
};
