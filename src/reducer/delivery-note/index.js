import Immutable from 'seamless-immutable';

const defaultState = Immutable.from({
  noteInfo: undefined
});

module.exports = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_DELIVERY_NOTE_INFO': 
      return state.set('noteInfo', payload)
    default:
      return state;
  }
};
