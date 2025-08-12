import tircBackend from '../services/TircBackend.js';
import Parser from '../services/Parser.js';
import NotifyService from '../services/NotificationService.js';
import { loadFromDb, loadUser } from '../services/ConfigService.js';
import GeoService from '../services/GeoService.js';
import {receiveUsers, receiveTircUsers, receiveTopic} from './topicpanelactions.js';

function receiveServerData(serverdata) {
  return {
    type: 'RECEIVE_SERVER_DATA',
    serverdata
  };
}

function toggleLoader(value) {
  return {
    type: 'TOGGLE_LOADER',
    value
  }
}

export function geocode(nick) {
  return dispatch => {
    GeoService.init().then(GeoService.reverseGeocode)
      .then(data => {
        return tircBackend.submitLocation(nick, data);
      });
  };
}

export function toggleEmotion(textid, type) {
  return (dispatch, getState) => {
    var user = getState().topicpanel.userselect.chosen;
    return tircBackend.toggleEmotion(user, textid, type);
  };

}

function formatReceiveData(data) {
  let formattedUsers = data.users ?  data.users.users: {};
  var arr = Parser.formatusers(formattedUsers);
  data.users = arr;
  return data;
}



export function sayGoodbye(user) {
  return (dispatch, getState) => {
    return tircBackend.sayGoodbye(user);
  };
}

export function listenBackend(id, subscriber) {
  return (dispatch, getState) => {
    return tircBackend.listen(id, subscriber).then(data => {
      switch (data.type) {
        case 'receive':
          handleReceive(dispatch, getState, data.data);
          break;
        case 'onusers':
          handleUsers(dispatch, data.data);
          break;
        case 'ontircusers':
          handleTircUsers(dispatch, data.data);
          break;
        case 'ontopic':
          dispatch(receiveTopic(data.data));
          break;
        default:
          break;
      }
      dispatch(listenBackend(data.lastid, subscriber));
    }, error => {
      console.log('error',error);
    });

  };
}

function hasRowChanged(getState, data) {
  let currentData = getState().tabs.currentdata;
  let index = -1;
  currentData.forEach((item, id) => {
    if (item.date === data.date && item.line === data.line) {
      index = id;
    }
  });
  return index;

}

function handleReceive(dispatch, getState, data) {
  var index = hasRowChanged(getState, data);
  if (index > -1) {
    return dispatch(handleChangeMessage(data, index));
  }

  if (data.type === 'comment' && 'TIRC' === data.source) {

    let text = data.line;
    var user = getState().topicpanel.userselect.chosen;
    var nick = data.nick;
    if (!NotifyService.isFocus() && text.indexOf(user) > -1) {
      NotifyService.notify(nick, text, data.time);
    }
  }
  handleNewMessage(dispatch, getState, data);
}

function handleChangeMessage(data, index) {
  return {
    type: 'RECEIVE_TEXTCHANGE',
    index,
    data
  };
}

function handleUsers(dispatch, data) {
  var arr = Parser.formatusers(data.users);
  dispatch(receiveUsers(arr));
}

function handleTircUsers(dispatch, data) {
  dispatch(receiveTircUsers(data));
  let activeItems = data.filter(item => item.state === 'fixing' || item.state === 'typing');
  dispatch(receiveActiveData(activeItems));
}

export function receiveActiveData(items) {
  return {
    type: 'RECEIVE_ACTIVE_DATA',
    items
  }
}

export function receiveMessage(index, message, isunread) {
  return {
    type: 'RECEIVE_MESSAGE',
    index,
    message,
    isunread
  };

}

export function toggleVideo(show) {
  return {
    type: 'TOGGLE_VIDEO',
    show
  };
}

function handleNewMessage(dispatch, getState, data) {
  let selectedtab = 0;
  let state = getState();
  if (data.target === null || data.target === undefined) {
    // viesti tarkoitettu tircciin
    let isunread = state.active !== 'tirc';
    dispatch(receiveMessage(selectedtab, data, isunread));
  }
  //if (data.target !== null && data.target !== undefined) {
  // kohdistettu
  // }
  // state.tabs.find

}

export function changeState(user, newstate, text) {
  return dispatch => {
    return tircBackend.changeState(user, newstate, text);
  };
}

export function sendText(user, text, formatted) {
  return (dispatch, getState) => {
    let target = null;
    if (getState().active !== 'tirc') {
      target = getState().active;
    }
    return tircBackend.say(user, text, formatted, target);
  }
}

export function updateText(text) {
  return {
    type: 'UPDATE_TEXT',
    text
  };
}
export function changeUser(user) {
  return {
    type: 'CHANGE_USER',
    user
  };
}

export function receiveUserlist(users) {
  return {
    type: 'RECEIVE_USER_LIST',
    users
  };
}

export function loadUsers() {
  return dispatch => {
    return loadFromDb().then(data => {
      let users = data[0].users;
      let chosen = loadUser('taho');
      dispatch(receiveUserlist(users));
      dispatch(changeUser(chosen));
      return data;
    });

  };
}

export function scroll(scrolling) {
  return {
    type: 'SCROLL',
    scrolling
  };
}

export function connectBackend(user) {
  return dispatch => {
    return tircBackend.connect(user).then(data=> {
      let formattedData = formatReceiveData(data);
      dispatch(toggleLoader(false));
      dispatch(receiveServerData(formattedData));
      return data;

    });
  };
}
