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
    var idindex = 'tirc_main_panel_middle_' + index;
    var clazz = 'tirc_main panel-default';
    let columns = !this.props.showvideo && !this.props.srcframe ? 'col-md-12' : 'col-md-10';
    return (
      <div className={clazz}>

        <div className="tirc_main_panel_middle  row" id={idindex}>
          <div className={columns}>
            <div className="row">
              <div className="col-md-12">
                <TircScreen index={index} connectdata={this.props.connectdata}
                            currentdata={this.props.currentdata} activedata={this.props.activedata}/>
              </div>
            </div>
          </div>
          {this.props.showvideo || this.props.srcframe ?
            <div id="video_container" className="col-md-2">
              {this.props.srcframe ? <img src={this.props.srcframe}/> : ''}

              <canvas id="video-canvas"/>
              <Webcam audio={false} onUserMedia={streamMedia}/>
            </div> : ''}
        </div>

      </div>
    )

  }
});
