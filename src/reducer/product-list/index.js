import Immutable from 'seamless-immutable';

const defaultState = Immutable.from({
  menuList: [],
  searchMenuList: [],
  searchStatus: false,
  delivery_note_id: '',
  errorMessage: undefined
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
    case 'SET_DELIVERY_NOTE_ID': 
      return state.set('delivery_note_id', payload)
    case 'SET_ERROR_MSG':
      return state.set('errorMessage', payload)
    default:
      return state;
  }
};
