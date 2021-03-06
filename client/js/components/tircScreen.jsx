var React = require('react/addons'),
  Textrow = require('./textrow.jsx'),
  Resizer = require('../resize.js'),
  UIService = require('../services/UIService.js'),
  ReactDOM = require('react-dom');

import Phantomrow from './phantomrow.jsx';
module.exports = React.createClass({


  componentWillMount: function () {
    console.log('TircScreen: willMount');
  },

  render: function () {
    var dataall = this.props.connectdata.concat(this.props.currentdata);
    var id = 0;
    var classStr = 'tirc_screen';
    var index = 0;
    var screenindex = 'tirc_screen_' + index;
    var mappedTextrowData = dataall.map(item => {
      id++;
      return ( <Textrow key={id} elem={item} toggleEmotion={this.props.toggleEmotion}  />)
    });

    var mappedPhantomrowData = this.props.activedata.map((item,index) => <Phantomrow {...item} />);
    let mappedData = mappedTextrowData.concat(mappedPhantomrowData);
    return <div  className={classStr} id={screenindex}>{mappedData}</div>

  },

  componentDidMount: function () {
    console.log('TircScreen: didMount');
    Resizer.resize(0, 400);
  },
  componentDidUpdate: function(){
    Resizer.resize(0,600);
  },
  

});

