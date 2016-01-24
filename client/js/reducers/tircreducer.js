import { combineReducers } from 'redux'
import tabsreducers from './tabsreducer.js';

let userselectstate = {
  chosen: 'taho',
  users: ['taho', 'melfstro', 'andon']
};


function userselectreducer(state=userselectstate, action){
  return state;
}

function tabreducers(state={}, action){
  switch (action.type){
    case 'RECEIVE_SERVER_DATA':

    default:
      return state;  
  }
  return state;
}

export default combineReducers({
  tabs: tabsreducers,
  userselect: userselectreducer,
  active: (state='tirc',action) => state,
  loading: (state=true, action) => {
    if (action.type === 'TOGGLE_LOADER'){
      return action.value;
    }
    return state;
  }
});
