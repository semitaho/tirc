import {combineReducers} from 'redux';
import tabsreducers from './tabsreducer.js';
import topicpanelreducer from './topicpanelreducer.js';

export default combineReducers({
  tabs: tabsreducers,
  topicpanel: topicpanelreducer,
  active: (state = 'tirc', action) => state,
  loading: (state = true, action) => {
    if (action.type === 'TOGGLE_LOADER') {
      return action.value;
    }
    return state;
  }
});
