const initialstate = {
  userselect: {},
  users: [],
  tircusers: []
};


function userselect(state = userselectstate, action) {
  if (action.type === 'CHANGE_USER') {
    return Object.assign({}, state, {
      chosen: action.user
    });
  }

  if (action.type === 'RECEIVE_USER_LIST') {
    return Object.assign({}, state, {
      users: action.users
    });
  }

  return state;
}


export default function topicpanelreducer(state = initialstate, action) {
  switch (action.type) {
    case 'RECEIVE_SERVER_DATA':
      console.log('receiving server data...');
      return Object.assign({}, state, {
        users: action.serverdata.users,
        topic: action.serverdata.topic,
        tircusers: action.serverdata.tircusers
      });
    case 'CHANGE_USER':
      let userselectstate = userselect(state.userselect, action);
      return Object.assign({}, state, {
        userselect: userselectstate
      });
    case 'RECEIVE_USER_LIST':
      let receiveuserlist = userselect(state.userselect, action);
      return Object.assign({}, state, {
        userselect: receiveuserlist
      });
    case 'RECEIVE_USERS':
      return Object.assign({}, state, {
        users: action.users
      });
    case 'RECEIVE_TOPIC':
      return Object.assign({}, state, {
        topic: action.topic
      });
    case 'RECEIVE_TIRC_USERS':
      return Object.assign({}, state, {
        tircusers: action.tircusers
      });
    default:
      return state;
  }
  return state;

}

