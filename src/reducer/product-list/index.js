import Immutable from 'seamless-immutable';

const defaultState = Immutable.from({
  menuList: [],
  searchMenuList: [],
  searchStatus: false
});

module.exports = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_MENU_DATA':
      return state.set('menuList', payload || [])
              .set('searchStatus', false)
    case 'SET_SEARCH_MENU_DATA': 
      return state.set('searchMenuList', payload || [])
              .set('searchStatus', true)
    default:
      return state;
  }
};
