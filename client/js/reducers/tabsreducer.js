var date = new Date();
var date2 = new Date(date.getTime() + 222);
const initTabState = 
  {
    name: 'tirc',
    showvideo: false,
    screenloaded: true,
    topic: 'tIrc redux is here',
    users: [],
    tircusers: [
        {nick: 'taho', time: date, state: 'connected'},
        {nick: 'mcw', time: date2, state: 'fixing'}
    ],
    connectdata: [],
    currentdata: [{
          nick: 'sysse',
          type: 'comment',
          time: '23:05:34',
          line: 'tasa-arvokysymys sekin. naiset pyörittää mitä vain nuorina seksuaalisen valtansa turvin, mutta sit alkaa biologinen kello tikittää'
        }
    ],
    activedata: [{}, {}],
    messagebox: {
      text: 'joo tällänen se on'
    }
  };

export default function tabsreducer(state = initTabState, action) {
  let newmain, newmainpanel;

  switch (action.type) {

    case 'RECEIVE_MESSAGE':
    let currentdata = [...state.currentdata, action.message];
    return Object.assign({},state, {
      currentdata
    }); 
    case 'RECEIVE_USERS':
      return Object.assign({},state, {
        users:action.users
      }); 
      
    case 'RECEIVE_ACTIVE_DATA':
      return Object.assign({},state, {
        activedata:action.items
      }); 
    case 'RECEIVE_TIRC_USERS':
      return Object.assign({},state, {
        tircusers:action.tircusers
      }); 

    case 'UPDATE_TEXT':
      let messagebox = {text: action.text};
      return Object.assign({},state, {
        messagebox
      }); 
    case 'RECEIVE_TOPIC':
      return Object.assign({},state, {
        topic:action.topic
      }); 
    case 'TOGGLE_VIDEO':
     return Object.assign({},state, {
        showvideo:action.show
      }); 
    
    case 'RECEIVE_SERVER_DATA':
      return Object.assign({}, state, {
          name: 'tirc',
          connectdata: action.serverdata.logsData,
          currentdata: action.serverdata.currentData,
          topic: action.serverdata.topic,
          users: action.serverdata.users,
          tircusers: action.serverdata.tircusers,
          activedata: [],
          messagebox: {}
        });
    default:
      return state;
  }
  return state;
}
 