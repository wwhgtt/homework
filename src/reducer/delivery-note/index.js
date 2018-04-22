import Immutable from 'seamless-immutable';

const defaultState = Immutable.from({
  noteInfo: undefined,
  saveStatus: false,
  errorMessage: undefined
});

module.exports = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_DELIVERY_NOTE_INFO': 
      return state.set('noteInfo', payload)
    case 'SAVE_SUCCESS':
      return state.set('saveStatus', true)
    case 'SET_ERROR_MSG':
      return state.set('errorMessage', payload)
    default:
      return state;
  }
};
