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
    const onScroll = () => {
      let domNode = ReactDOM.findDOMNode(this);
      let scrollActivated = Resizer.isScrollActivated(domNode);
      if (scrollActivated !== this.props.scroll){
        this.props.scroll(scrollActivated);
      }
    };

    var dataall = this.props.connectdata.concat(this.props.currentdata);
    var id = 0;
    var classStr = 'tirc_screen';
    var index = 0;
    var screenindex = 'tirc_screen_' + index;

    var mappedTextrowData = dataall.map(item => {
      id++;
      return ( <Textrow key={id} elem={item} toggleEmotion={this.props.toggleEmotion}  />)
    });

    var mappedPhantomrowData = this.props.activedata.map(item => <Phantomrow {...item} />);
    let mappedData = mappedTextrowData.concat(mappedPhantomrowData);

    return <div onScroll={onScroll} className={classStr} id={screenindex}>{mappedData}</div>

  },

  componentDidMount: function () {
    console.log('TircScreen: didMount');
    Resizer.resize();
    Resizer.scroll(0);
  },

  shouldComponentUpdate: function (nextProps, nextState) {    
    var currentTexts  =  _.omit (this.props, 'toggleEmotion');
    var nextTexts = _.omit(nextProps, 'toggleEmotion');
    var isEqual = _.isEqual(nextTexts, currentTexts);
      if (!isEqual) {
      return true;
    }
    return false;

  },


  componentDidUpdate: function (prevProps, prevState) {
    console.log('tircScreen - on did update', this.props.scrolling);
    var index = prevProps.index;
    let prevDataLength = prevProps.currentdata.length + prevProps.activedata.length;
    let currentDataLength = this.props.currentdata.length + this.props.activedata.length;

    if (this.props.scrolling === false){
      Resizer.scroll(0, 600); 
    }
  }


});

