import Immutable from 'seamless-immutable';

const defaultState = Immutable.from({
  
});

module.exports = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'DEMO':
      return state.set('childView', payload || '');
    default:
      return state;
  }
};
