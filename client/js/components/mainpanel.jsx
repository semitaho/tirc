var React = require('react'),
  TopicPanel = require('./topicPanel.jsx'),
  TircScreen = require('./tircScreen.jsx'),
  Nickpanel = require('./nickpanel.jsx'),
  TircBackend = require('../services/TircBackend.js');

module.exports = React.createClass({

  componentDidMount: function () {
    console.log('mainScreen - mounted');
  },

  render: function () {
    this.props.tircusers.sort((user1, user2) => user2.time - user1.time);
    var index = this.props.index;
    var idindex = 'tirc_main_panel_middle_' + index;
    var clazz = 'tirc_main panel-default';
    return (
      <div className={clazz}>

        <TopicPanel topic={this.props.topic} index={index}/>

        <div className="tirc_main_panel_middle  row" id={idindex}>
            <div className="col-md-12">
              <Nickpanel users={this.props.users} receiveUsers={this.props.receiveUsers} tircusers={this.props.tircusers}/>

            </div>
            <div className="col-md-12">
              <TircScreen index={index} connectdata={this.props.connectdata}
                      currentdata={this.props.currentdata} activedata={this.props.activedata}/>
            </div>
        </div>

      </div>
    )

  }
});
