
var date = new Date();
var date2 = new Date(date.getTime() + 222);
const initTabState = [
    {
      name: 'tirc',
      mainpanel: {
        screenloaded: true,
        topic: 'tIrc redux is here',
        users: [],
        tircusers: [
          {nick: 'taho', time: date, state: 'connected'}, 
          {nick: 'mcw', time: date2, state: 'fixing'}
        ],
        connectdata: [],
        currentdata: [ 
          {
            nick: 'sysse',
            type: 'comment',
            time: '23:05:34',
            line: 'tasa-arvokysymys sekin. naiset pyörittää mitä vain nuorina seksuaalisen valtansa turvin, mutta sit alkaa biologinen kello tikittää'
          }
        ]
      },
      messagebox: {
        text: 'joo tällänen se on'
      }
    }
];

export default function tabsreducer(state=[], action){

  switch (action.type){
    case 'RECEIVE_TOPIC':
      let newmainpanel = Object.assign({}, state[0].mainpanel, {
        topic: action.topic
      });
      let newmain = Object.assign({},state[0], {
        mainpanel: newmainpanel
      });
      return [newmain, ...state.slice(1)];

    case 'RECEIVE_SERVER_DATA':
      return [...state.slice(0,0),
      Object.assign({}, state[0], {
        name: 'tirc',
        mainpanel: {
          connectdata: action.serverdata.logsData,
          currentdata: action.serverdata.currentData,
          topic: action.serverdata.topic,
          users: action.serverdata.users,
          tircusers: action.serverdata.tircusers,
        },
        messagebox: ''

      }), ...state.slice(1)
      ];
    default: 
      return state;
  }
  return state;
}
 