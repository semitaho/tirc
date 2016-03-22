var React = require('react'),
  Tabheader = require('./tabheader.jsx'),
  Mainpanel = require('./mainpanel.jsx'),
  Messagebox = require('./messagebox.jsx'),
  Resizer = require('../resize.js'),
  Config = require('../services/ConfigService.js'),
  GeoService = require('../services/GeoService.js');

import {connect} from 'react-redux';
import Spinner from './spinner.jsx';
import Userselect from './userselect.jsx';
import TopicPanel from './topicPanel.jsx';
import {shareVideo, connectWebsocket, receiveFrame} from './../actions/videoactions.js';
import {
  connectBackend,
  listenBackend,
  geocode,
  changeState,
  topicpanel,
  sendText,
  updateText,
  toggleVideo,
  receiveUsers,
  sayGoodbye,
  changeUser,
  loadUsers,
  toggleEmotion,
  scroll
} from './../actions/tircactions.js';

class Tirc extends React.Component {

  constructor() {
    super();

  }

  destroy() {
    //GeoService.unwatch();
    this.props.dispatch(sayGoodbye(this.props.userselect.chosen));
  }

  render() {
    let {tabs, userselect, topicpanel, loading, active, dispatch} = this.props;
    if (this.props.loading && this.props.loading === true) {
      return <div className="col-md-12 col-xs-12 col-sm-12"><Spinner index={this.props.phraseindex} phrases={this.props.phrases} /></div>
    }
    let className = '';
    let isVisible = true;
    var actionpanelId = 'action_panel_0';
    return (
      <div className="tirc_content">
        {loading && loading === true  ? <Spinner fadeout={true}  index={this.props.phraseindex} phrases={this.props.phrases}  /> : ''}
        <div className={className}>
          <TopicPanel {...topicpanel} {...tabs} changeUser={(nick) => dispatch(changeUser(nick))}
                                                receiveUsers={users => dispatch(receiveUsers(users))}/>
          <Mainpanel shareVideo={id => dispatch(shareVideo(this.ws, id))} {...tabs} userselect={userselect}
                     scroll={(isScrolling) => dispatch(scroll(isScrolling))}
                     visible={isVisible}
                     toggleEmotion={(textid,type) => dispatch(toggleEmotion(textid, type))}/>

          <div className="tirc_action_panel row" id={actionpanelId}>
            <div className="col-md-12 col-sm-12 col-xs-12 full-width">

              <Messagebox {...tabs.messagebox} updateText={text => dispatch(updateText(text))}
                                               sendText={(text,formattedtext) => dispatch(sendText(this.props.userselect.chosen, text, formattedtext))}
                                               changeState={(newstate,text ) => dispatch(changeState(this.props.userselect.chosen,newstate, text))}/>
            </div>

          </div>
        </div>
      </div>)

  }

  componentDidMount() {
    let dispatch = this.props.dispatch;
    $(window).unload(() => this.destroy());
    const onmessage = (event) => {
      dispatch(receiveFrame(event.data));
    };
    // this.ws = new WebSocket("ws://" + location.hostname + ":8880/streaming");
    // this.ws.onmessage = onmessage;
    dispatch(loadUsers()).then(data => {
      dispatch(geocode(this.props.userselect.chosen));
      dispatch(connectBackend(this.props.userselect.chosen)).then(backenddata => {
        dispatch(listenBackend(backenddata.id, this.props.userselect.chosen));
      });

    });

  }
}

function select(state) {

  return {
    userselect: state.userselect,
    data: state.data,
    topicpanel: {
      userselect: state.userselect,
      users: state.tabs.users,
      tircusers: state.tabs.tircusers
    },
    tabs: state.tabs,
    loading: state.loading
  };

}

export default connect(select)(Tirc);

