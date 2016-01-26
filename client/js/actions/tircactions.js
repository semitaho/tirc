import tircBackend from './../services/TircBackend.js';
import Parser from './../services/Parser.js';
import NotifyService from './../services/NotificationService.js';
function receiveServerData(serverdata){
  return {
    type: 'RECEIVE_SERVER_DATA',
    serverdata
  };
}


function toggleLoader(value){
  return {
    type: 'TOGGLE_LOADER',
    value
  }
}

function formatReceiveData(data){
  let formattedUsers = data.users.users;
  var arr = Parser.formatusers(formattedUsers);
  data.users = arr;
  return data;
}

export function updateText(index,text){
  return {
    type: 'UPDATE_TEXT',
    index,
    text

  };
}

export function sayGoodbye(user){
  return dispatch => {
    return tircBackend.sayGoodbye(user);
  };
}

export function listenBackend(id, subscriber){
  return (dispatch,getState) => {
    return tircBackend.listen(id,subscriber).then(data => {
      switch (data.type){
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
    });

  };
}



function handleReceive(dispatch, getState, data){
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

function handleUsers(dispatch, data){
   var arr = Parser.formatusers(data.users);
   dispatch(receiveUsers(arr));
}

function handleTircUsers(dispatch, data){
  dispatch(receiveTircUsers(data));
  let activeItems =  data.filter(item => item.state === 'fixing' || item.state === 'typing');
  console.log('active', activeItems); 
  dispatch(receiveActiveData(activeItems));
}

export function receiveActiveData(items){
  return {
    type: 'RECEIVE_ACTIVE_DATA',
    items
  }
}

export function receiveUsers(users){
  return {
    type: 'RECEIVE_USERS',
    users
  };
}

export function receiveTircUsers(tircusers){
  return {
    type: 'RECEIVE_TIRC_USERS',
    tircusers
  }
}

export function receiveTopic(topic){
  return {
    type: 'RECEIVE_TOPIC',
    topic
  }
}
export function receiveMessage(index,message, isunread){
  return {
    type: 'RECEIVE_MESSAGE',
    index,
    message,
    isunread
  };

}


function handleMessage(dispatch, getState, data){
  let selectedtab = 0;
  let state = getState();
  if (data.target === null || data.target === undefined){
    // viesti tarkoitettu tircciin
    let isunread = state.active !== 'tirc';
    dispatch(receiveMessage(selectedtab, data, isunread));
  }
  //if (data.target !== null && data.target !== undefined) {
    // kohdistettu
 // }
 // state.tabs.find
  
}

export function changeState(user, newstate){
  return dispatch => {
    return tircBackend.changeState(user, newstate);
  };
}

export function sendText(user, text, formatted){
  return (dispatch, getState) => {
    let target = null;
    if (getState().active !== 'tirc'){
      target = getState().active;
    }
    return tircBackend.say(user, text, formatted, target);
  }
} 

export function updateText(index, text){
  return {
    type: 'UPDATE_TEXT',
    index,
    text
  };
}

export function connectBackend(user){
  return dispatch => {
    return tircBackend.connect(user).then(data=> {
      console.log('got data', data);
      let formattedData = formatReceiveData(data);
      dispatch(receiveServerData(formattedData));
      dispatch(toggleLoader(false));
      return data;
    });
  };
}