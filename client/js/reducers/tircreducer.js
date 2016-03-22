import { combineReducers } from 'redux'
import tabsreducers from './tabsreducer.js';

let userselectstate = {
  users: []
};

function userselectreducer(state = userselectstate, action) {
  if (action.type === 'CHANGE_USER') {
    return Object.assign({}, state, {
      chosen: action.user
    });
  }

  if (action.type === 'RECEIVE_USER_LIST'){
    return Object.assign({}, state, {
      users: action.users
    });
  }
  return state;
}

export default combineReducers({
  tabs: tabsreducers,
  userselect: userselectreducer,
  active: (state = 'tirc', action) => state,
  loading: (state = true, action) => {
    if (action.type === 'TOGGLE_LOADER') {
      return action.value;
    }
    return state;
  }
});
