import { createStore } from 'redux';

const initialState = {
  contacts: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: action.contacts
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
