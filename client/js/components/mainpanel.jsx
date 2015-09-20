var React = require('react/addons'),
  TopicPanel = require('./topicPanel.jsx'),
  TircScreen = require('./tircScreen.jsx'),
  Nickpanel = require('./nickpanel.jsx'),
  Resizer = require('../resize.js');
module.exports = React.createClass({

  componentDidMount: function () {
    console.log('mainScreen - mounted');
    $(window).unload(this.destroy);
  },

  destroy: function () {
    GeoService.unwatch();
    TircBackend.sayGoodbye(Config.loadUser('taho'));
  },


  onconnecterror: function (err) {
    console.log('error:' + JSON.stringify(err));
    this.produceMockdata();
  },


  render: function () {
    this.props.tircusers.sort(function (user1, user2) {
      return user2.time - user1.time;
    });
    var index = this.props.index;
    var idindex = 'tirc_main_panel_middle_' + index;

    var visible = this.props.visible;
    var clazz = 'tirc_main  panel-default';
    if (visible){
      //Resizer.resize(index);

    }

    return (
      <div className={clazz}>

          <TopicPanel topic={this.props.topic} index={index}/>

          <div className="tirc_main_panel_middle  row" id={idindex}>
            <TircScreen index={index} visible={visible} connectdata={this.props.connectdata}
                        currentdata={this.props.currentdata}/>
            <Nickpanel users={this.props.users} tircusers={this.props.tircusers}/>
          </div>

      </div>
    )

  }
});
