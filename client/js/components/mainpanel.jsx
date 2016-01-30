var React = require('react'),
  TopicPanel = require('./topicPanel.jsx'),
  TircScreen = require('./tircScreen.jsx'),
  TircBackend = require('../services/TircBackend.js');


import Webcam from 'react-webcam';
import $ from 'jquery';
module.exports = React.createClass({

  componentDidMount: function () {
    console.log('mainScreen - mounted');
    console.log('width: '+$('#video_container').width());

  },

  draw: function(v, back,bc, w, h) {
    bc.drawImage(v, 0, 0, w, h);
    // Grab the pixel data from the backing canvas
    var stringData=back.toDataURL();
    console.log('string', stringData);
    setTimeout(() => { this.draw(v,back, bc, w, h); });

  },




  render: function () {
    const streamMedia = e => {
      var video = document.getElementsByTagName('video')[0];
      console.log('width', video.offsetWidth);
      let canvasWidth = 640;
      let canvasHeight = 480;
      let back = document.getElementById('video-canvas');
      var backcontext = back.getContext('2d');
      this.draw(video, back, backcontext, video.offsetWidth, video.offsetHeight);

      console.log('on media',e);
    };

    this.props.tircusers.sort((user1, user2) => user2.time - user1.time);
    var index = this.props.index;
    var idindex = 'tirc_main_panel_middle_' + index;
    var clazz = 'tirc_main panel-default';
    let columns = !this.props.showvideo ? 'col-md-12' : 'col-md-10';
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
            {this.props.showvideo ?
              <div id="video_container" className="col-md-2">
                <canvas id="video-canvas" />
                 <Webcam  onUserMedia={streamMedia} />
              </div> : ''}
        </div>

      </div>
    )

  }
});
