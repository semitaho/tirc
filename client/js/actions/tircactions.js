import tircBackend from './../services/TircBackend.js';
import Parser from './../services/Parser.js';

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

export function connectBackend(user){
  return dispatch => {
    console.log('connceting to backend', user);
    tircBackend.connect(user).then(data=> {
      console.log('got data', data);
      let formattedData = formatReceiveData(data);
      dispatch(receiveServerData(formattedData));
      dispatch(toggleLoader(false));

    });
  };
}