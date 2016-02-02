import React from 'react';
import Resizer from './../resize.js';
import UIService from './../services/UIService.js';
class TircVideo extends React.Component{

  render(){
    let {src} = this.props;
    return <img className="img-responsive center-block" id="tirc-video"  src={src}/> 
  }

  componentDidMount(){
    console.log('video - did mount');
    let imageHeight = UIService.calculateVideoHeight();
   // $('#tirc-video').css('height', imageHeight);

  //  Resizer.resize(0, 1500);
  }

}

export default TircVideo;