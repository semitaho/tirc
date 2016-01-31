var React = require('react'),
  TopicPanel = require('./topicPanel.jsx'),
  TircScreen = require('./tircScreen.jsx'),
  TircBackend = require('../services/TircBackend.js');

import Webcam from 'react-webcam';
import $ from 'jquery';
module.exports = React.createClass({

  componentDidMount: function () {
    console.log('mainScreen - mounted');
    console.log('width: ' + $('#video_container').width());

  },

  render: function () {
    const streamMedia = e => {
      this.props.shareVideo('video');
    };

    this.props.tircusers.sort((user1, user2) => user2.time - user1.time);
    var index = this.props.index;
    var idindex = 'tirc_main_panel_middle_0';
    var clazz = '';
    let columns = 'col-md-12 tirc_main panel-default' ;
    return (

        <div className="tirc_main_panel_middle  row" id={idindex}>
          {this.props.showvideo || this.props.srcframe ?
            <div id="video_container" className="col-md-6 col-xs-6 col-sm-6 text-center col-xs-offset-3 col-md-offset-3 col-sm-offset-3">
              {this.props.srcframe ? <img className="img-responsive"  src={this.props.srcframe}/> : ''}
              {this.props.showvideo ?
               <Webcam audio={false} onUserMedia={streamMedia}/> : ''}
            </div> : ''}
          <div className={columns}>
                <TircScreen index={index} connectdata={this.props.connectdata}
                            currentdata={this.props.currentdata} activedata={this.props.activedata}/>
          </div>
            
          

        </div>

    )

  }
});
