var React = require('react'),
  Tabheader = require('./tabheader.jsx'),
  Mainpanel = require('./mainpanel.jsx'),
  Messagebox = require('./messagebox.jsx'),
  Resizer = require('../resize.js'),
  Config = require('../services/ConfigService.js'),
  GeoService = require('../services/GeoService.js'),
  Spinner = require('./spinner.jsx');

import { connect } from 'react-redux';
import Userselect from './userselect.jsx';
import TopicPanel from './topicPanel.jsx';
import {shareVideo, connectWebsocket, receiveFrame} from './../actions/videoactions.js';
import {connectBackend, listenBackend, changeState, topicpanel,sendText, updateText, toggleVideo,receiveUsers, sayGoodbye, changeUser, loadUsers, clickEmotion} from './../actions/tircactions.js';

class Tirc extends React.Component {

  constructor() {
    super();

  }

  destroy() {
    //GeoService.unwatch();
    this.props.dispatch(sayGoodbye(this.props.userselect.chosen));
  }

  render() {
    let {tabs, userselect, topicpanel,loading,active, dispatch} = this.props
    if (this.props.loading && this.props.loading === true) {
      return <Spinner  />
    }
    let className = '';
    let isVisible = true;
    var actionpanelId = 'action_panel_0';
    return (
      <div className="tirc_content">
        {loading ? <Spinner fadeout={true}/> : ''}
        <div className={className}>
          <TopicPanel {...topicpanel} {...tabs} receiveUsers={users => dispatch(receiveUsers(users))}/>
          <Mainpanel shareVideo={id => dispatch(shareVideo(this.ws, id))} {...tabs} userselect={userselect}
                     visible={isVisible} clickEmotion={(type,textid) => dispatch(clickEmotion(type,textid))} />

          <div className="tirc_action_panel row" id={actionpanelId}>
            <div className="col-md-11 col-sm-10 col-xs-8">

              <Messagebox {...tabs.messagebox} updateText={text => dispatch(updateText(text))}
                                               sendText={(text,formattedtext) => dispatch(sendText(this.props.userselect.chosen, text, formattedtext))}
                                               changeState={(newstate,text ) => dispatch(changeState(this.props.userselect.chosen,newstate, text))}/>
            </div>
            <div className="col-md-1 col-sm-2 col-xs-4 video-toggle text-right">
              {tabs.showvideo === true ? <button className="btn btn-md btn-default " onClick={() => dispatch(toggleVideo(false))}>Lopeta jako</button> : ''}
              {!tabs.showvideo  || tabs.showvideo === false ? <button className="btn btn-md btn-default " onClick={() => dispatch(toggleVideo(true))}>Jaa video</button> : ''}

            </div>
          </div>
        </div>
      </div>)

  }

  componentDidMount() {
    let dispatch = this.props.dispatch;
    console.log('tirc - doowing resize');
    $(window).unload(() =>  this.destroy());

    if (!"WebSocket" in window) {
      alert('WebSocket not supported');
    }
    const onmessage = (event) => {
      console.log('onmessage', event);
      dispatch(receiveFrame(event.data));

    };
    this.ws = new WebSocket("ws://" + location.hostname + ":8880/streaming");
    this.ws.onmessage = onmessage;
    dispatch(loadUsers()).then(data => {
      dispatch(connectBackend(this.props.userselect.chosen)).then(backenddata => {
        console.log('backend fired...', backenddata);
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

