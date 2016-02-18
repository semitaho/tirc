import tircBackend from './../services/TircBackend.js';
import Parser from './../services/Parser.js';
import NotifyService from './../services/NotificationService.js';
import Config from './../services/ConfigService.js';
import GeoService from './../services/GeoService.js';

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

export function geocode(nick){
  return dispatch => {
    console.log('geocoding....', nick);
    GeoService.init().then(GeoService.reverseGeocode)
      .then(data => {
        console.log('got',data);
        return tircBackend.submitLocation(nick, data);
    });
  };
}

export function toggleEmotion(textid, type) {
  console.log('toggling');
  return (dispatch, getState) => {
    var user = getState().userselect.chosen;
    return tircBackend.toggleEmotion(user, textid, type);
  };

}

function formatReceiveData(data) {
  let formattedUsers = data.users.users;
  var arr = Parser.formatusers(formattedUsers);
  data.users = arr;
  return data;
}

export function updateText(index, text) {
  return {
    type: 'UPDATE_TEXT',
    index,
    text

  };
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
        case 'oncurrentdata':
          dispatch(receiveCurrentdata(data.data.data));
          break;
        default:
          break;
      }
      dispatch(listenBackend(data.lastid, subscriber));
    });

  };
}

function handleReceive(dispatch, getState, data) {
  if (data.type === 'comment' && 'TIRC' === data.source) {
    let text = data.line;
    var user = getState().userselect.chosen;
    var nick = data.nick;
    if (!NotifyService.isFocus() && text.indexOf(user) > -1) {
      NotifyService.notify(nick, text, data.time);
    }
  }
  handleMessage(dispatch, getState, data);
  //TircState.onstatechange(TircState.setmessage, data);
}

function handleUsers(dispatch, data) {
  var arr = Parser.formatusers(data.users);
  dispatch(receiveUsers(arr));
}

function handleTircUsers(dispatch, data) {
  dispatch(receiveTircUsers(data));
  let activeItems = data.filter(item => item.state === 'fixing' || item.state === 'typing');
  console.log('active', activeItems);
  dispatch(receiveActiveData(activeItems));
}

export function receiveActiveData(items) {
  return {
    type: 'RECEIVE_ACTIVE_DATA',
    items
  }
}

export function receiveUsers(users) {
  return {
    type: 'RECEIVE_USERS',
    users
  };
}

export function receiveTircUsers(tircusers) {
  return {
    type: 'RECEIVE_TIRC_USERS',
    tircusers
  }
}

export function receiveTopic(topic) {
  return {
    type: 'RECEIVE_TOPIC',
    topic
  }
}
export function receiveCurrentdata(data) {
  return {
    type: 'RECEIVE_CURRENTDATA',
    data
  };
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

function handleMessage(dispatch, getState, data) {
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
  console.log('change');
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
    return Config.loadFromDb().then(data => {
      console.log('has', data);
      let users = data[0].users;
      let chosen = Config.loadUser('taho');
      dispatch(receiveUserlist(users));
      dispatch(changeUser(chosen));
      return data;
    });

  };
}

export function connectBackend(user) {
  return dispatch => {
    return tircBackend.connect(user).then(data=> {
      console.log('got data', data);
      let formattedData = formatReceiveData(data);
      dispatch(toggleLoader(false));
      dispatch(receiveServerData(formattedData));
      return data;

    });
  };
}