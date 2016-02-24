var React = require('react'),
  TopicPanel = require('./topicPanel.jsx'),
  TircScreen = require('./tircScreen.jsx'),
  TircBackend = require('../services/TircBackend.js'),
  Resizer = require('../resize.js');

import TircWebcam from './tircwebcam.jsx';
import TircVideo from './tircvideo.jsx';
import uiService from './../services/UIService.js';
import $ from 'jquery';
module.exports = React.createClass({

  componentDidMount: function () {
    console.log('mainScreen - mounted');
  },

  render: function () {
    const streamMedia = e => {
      this.props.shareVideo('video');
    };

    this.props.tircusers.sort((user1, user2) => user2.time - user1.time);
    var index = this.props.index;
    var idindex = 'tirc_main_panel_middle_0';
    var clazz = '';
    let height =  uiService.calculateVideoHeight();
    let columns = 'col-md-12 tirc_main panel-default full-width' ;
    return (

        <div className="tirc_main_panel_middle  row" id={idindex}>
          {this.props.showvideo || this.props.srcframe ?
            <div id="video_container" className="col-md-6 col-xs-6 col-sm-6 text-center col-xs-offset-3 col-md-offset-3 col-sm-offset-3">
              {this.props.srcframe ? <TircVideo src={this.props.srcframe} /> : ''}
              {this.props.showvideo  && this.props.showvideo === true?
               <TircWebcam audio={false} width="ff" height={height} onUserMedia={streamMedia}/> : ''}
            </div> : ''}
          <div className={columns}>
                <TircScreen scrolling={this.props.scrolling} scroll={this.props.scroll} toggleEmotion={this.props.toggleEmotion} index={index} connectdata={this.props.connectdata}
                            currentdata={this.props.currentdata} activedata={this.props.activedata}/>
          </div>
            
          

        </div>

    )

  }
});
