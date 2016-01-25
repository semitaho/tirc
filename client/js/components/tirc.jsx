var React = require('react'),
  Tabheader = require('./tabheader.jsx'),
  Userselect = require('./userselect.jsx'),
  Mainpanel = require('./mainpanel.jsx'),
  Messagebox = require('./messagebox.jsx'),
  Resizer = require('../resize.js'),
  Config = require('../services/ConfigService.js'),
  GeoService = require('../services/GeoService.js'),
  Spinner = require('./spinner.jsx');

import { connect } from 'react-redux';

import {connectBackend, listenBackend, changeState} from './../actions/tircactions.js';

class Tirc extends React.Component {
  destroy() {
    GeoService.unwatch();
    $(document).trigger('backendcall', ['sayGoodbye', Config.loadUser('taho')]);
  }

  render() {
    let {tabs, userselect, loading,active} = this.props
    if (this.props.loading && this.props.loading === true) {
      return <Spinner  />
    }

    const tabcontent = (data, id) =>  {
      var isVisible = false;
      var className = "hidden col-md-12";
      if (data.name === active) {
        className = '';
        isVisible = true;
      }
      var actionpanelId = 'action_panel_' + id;
      return (
        <div className={className}>
          <Mainpanel index={id} topic={data.mainpanel.topic} screenloaded={data.mainpanel.screenloaded}
                     tircusers={data.mainpanel.tircusers}
                     visible={isVisible} users={data.mainpanel.users}
                     connectdata={data.mainpanel.connectdata} currentdata={data.mainpanel.currentdata}/>

          <div className="tirc_action_panel row" id={actionpanelId}>
            <Messagebox {...data.messagebox} changeState={(id,newstate) => dispatch(changeState(id,newstate))} />
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
            <Userselect {...userselect} />
          </header>
        </div>
        {tabs.map(tabcontent) }
      </div>)

  }
  componentDidMount(){
    let dispatch = this.props.dispatch;
    console.log('tirc - doowing resize');
    $(window).unload(this.destroy);
    dispatch(connectBackend(this.props.userselect.chosen)).then(data => {
      dispatch(listenBackend(data.id, this.props.userselect.chosen));
    } );
  }
}

function select(state){

  return {
    data: state.data,
    userselect: state.userselect,
    tabs: state.tabs,
    loading: state.loading,
    active: state.active
  };

}


export default connect(select)(Tirc);

