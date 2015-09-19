var React = require('react/addons'),
  Tabheader = require('./tabheader.jsx'),
  Userselect = require('./userselect.jsx'),
  Mainpanel = require('./mainpanel.jsx'),
  Messagebox = require('./messagebox.jsx');

module.exports = React.createClass({


  render: function () {
    var tabs = this.props.data.tabs;
    var tircdata = this.props.data;
    var tabactive = tircdata.active;


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
          <Mainpanel index={id} topic={data.mainpanel.topic} tircusers={data.mainpanel.tircusers}
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
        <div>
          <header className="row tirc_header_panel">
            <Tabheader items={tabs} selected={tabactive.name}/>
            <Userselect users={tircdata.users} chosen={tircdata.chosen}/>
          </header>
        </div>
        {tabs.map(tabcontent) }
      </div>)

  }


});

