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

export function listenBackend(id, subscriber){
  return dispatch => {
    return tircBackend.listen(id,subscriber).then(data => {
      console.log('listen data', data);
      switch (data.type){
        case 'receive':
          handleReceive(dispatch, data.data);
          break;
      }
    });

  };
}

function handleReceive(dispatch, data){
  if (data.type === 'comment' && 'TIRC' === data.source) {
    let text = data.line;
    var user = Config.loadUser();
    var nick = data.nick;
    if (!NotifyService.isFocus() && text.indexOf(user) > -1) {
      NotifyService.notify(nick, text, data.time);
    }
  }
  handleMessage(data);
  //TircState.onstatechange(TircState.setmessage, data);
}

function handleMessage(data){
  
}

export function connectBackend(user){
  return dispatch => {
    console.log('connceting to backend', user);
    return tircBackend.connect(user).then(data=> {
      console.log('got data', data);
      let formattedData = formatReceiveData(data);
      dispatch(receiveServerData(formattedData));
      dispatch(toggleLoader(false));
      return data;
    });
  };
}