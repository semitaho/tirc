var React = require('react/addons'),
  Tabheader = require('./tabheader.jsx'),
  Userselect = require('./userselect.jsx'),
  Mainpanel = require('./mainpanel.jsx'),
  Messagebox = require('./messagebox.jsx'),
  Resizer = require('../resize.js'),
  Config = require('../services/ConfigService.js'),
  GeoService = require('../services/GeoService.js'),
  Spinner = require('./spinner.jsx');

module.exports = React.createClass({

  destroy: function () {
    GeoService.unwatch();
    $(document).trigger('backendcall', ['sayGoodbye', Config.loadUser('taho')]);
  },

  render: function () {
    var tabs = this.props.data.tabs;
    var tircdata = this.props.data;
    var tabactive = tircdata.active;
    if (this.props.data.loading && this.props.data.loading === true) {
      return <Spinner  />
    }

    var tabcontent = function (data, id) {
      var isVisible = false;
      var className = "hidden col-md-12";
      if (data.name === tabactive.name) {
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
            <Messagebox text={data.text}/>
          </div>
        </div>
      )
    };

    return (
      <div className="tirc_content">
        <Spinner fadeout={true}/>

        <div>
          <header className="row tirc_header_panel">
            <Tabheader items={tabs} selected={tabactive.name}/>
            <Userselect users={tircdata.users} chosen={tircdata.chosen}/>
          </header>
        </div>
        {tabs.map(tabcontent) }
      </div>)

  },
  componentDidMount(){
    console.log('tirc - doowing resize');
    $(window).unload(this.destroy);
  }

});

