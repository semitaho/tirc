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
import {connectBackend, listenBackend, changeState, sendText, updateText, receiveUsers, sayGoodbye, changeUser, loadUsers} from './../actions/tircactions.js';

class Tirc extends React.Component {
  destroy() {
    //GeoService.unwatch();
    this.props.dispatch(sayGoodbye(this.props.userselect.chosen));
  }

  render() {
    let {tabs, userselect, loading,active, dispatch} = this.props
    if (this.props.loading && this.props.loading === true) {
      return <Spinner  />
    }

    const tabcontent = (data, id) => {
      var isVisible = false;
      var className = "hidden col-md-12";
      if (data.name === active) {
        className = '';
        isVisible = true;
      }
      var actionpanelId = 'action_panel_' + id;
      return (
        <div className={className}>
          <Mainpanel index={id} {...data.mainpanel}
                     visible={isVisible}
                     receiveUsers={users => dispatch(receiveUsers(users))}/>

          <div className="tirc_action_panel row" id={actionpanelId}>
            <Messagebox {...data.messagebox} updateText={text => dispatch(updateText(id,text))}
                                             sendText={(text,formattedtext) => dispatch(sendText(this.props.userselect.chosen, text, formattedtext))}
                                             changeState={(newstate,text ) => dispatch(changeState(this.props.userselect.chosen,newstate, text))}/>
          </div>
        </div>
      )
    };

    return (
      <div className="tirc_content">
        {loading ? <Spinner fadeout={true}/> : ''}
        <div>
          <header className="row tirc_header_panel">
            <Tabheader items={tabs} selected={active}/>
            <Userselect {...userselect} changeUser={nick => dispatch(changeUser(nick))}/>
          </header>
        </div>
        {tabs.map(tabcontent) }
      </div>)

  }

  componentDidMount() {
    let dispatch = this.props.dispatch;
    console.log('tirc - doowing resize');
    $(window).unload(() =>  this.destroy());
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
    data: state.data,
    userselect: state.userselect,
    tabs: state.tabs,
    loading: state.loading,
    active: state.active
  };

}

export default connect(select)(Tirc);

