var date = new Date();
var date2 = new Date(date.getTime() + 222);
const initTabState =
{
  name: 'tirc',
  showvideo: false,
  screenloaded: true,
  topic: 'tIrc redux is here',
  users: [],
  scrolling: false,
  tircusers: [
    {nick: 'taho', time: date, state: 'connected'},
    {nick: 'mcw', time: date2, state: 'fixing'}
  ],
  phrases: [],
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
      return Object.assign({}, state, {
        currentdata
      });
    case 'SCROLL': 
      return Object.assign({}, state, {scrolling: action.scrolling});
    case 'RECEIVE_FRAME':
      return Object.assign({}, state, {
        srcframe: action.data
      });
    case 'RECEIVE_ACTIVE_DATA':
      return Object.assign({}, state, {
        activedata: action.items
      });

    case 'RECEIVE_TEXTCHANGE':
      let current = [...state.currentdata.slice(0, action.index), action.data, ...state.currentdata.slice(action.index+1)];
      return Object.assign({}, state, {
        currentdata:current
      });

    case 'RECEIVE_PHRASES':
      console.log('in receive phrases',action.phrases);
      return Object.assign({}, state, {
        phrases: action.phrases,
        phraseindex: action.index
      });

    case 'UPDATE_TEXT':
      let messagebox = {text: action.text};
      return Object.assign({}, state, {
        messagebox
      });
    case 'TOGGLE_VIDEO':
      return Object.assign({}, state, {
        showvideo: action.show
      });

    case 'RECEIVE_SERVER_DATA':
      return Object.assign({}, state, {
        name: 'tirc',
        connectdata: action.serverdata.logsData,
        currentdata: action.serverdata.currentData,
        scrolling:false,
        activedata: [],
        messagebox: {}
      });
    default:
      return state;
  }
  return state;
}
 