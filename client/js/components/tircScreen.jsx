var React = require('react/addons'),
  Textrow = require('./textrow.jsx'),
  Resizer = require('../resize.js'),
  UIService = require('../services/UIService.js');

import Phantomrow from './phantomrow.jsx';
module.exports = React.createClass({


  componentWillMount: function () {
    console.log('TircScreen: willMount');
  },

  render: function () {

    var dataall = this.props.connectdata.concat(this.props.currentdata);
    var id = 0;
    var classStr = 'tirc_screen panel-body';
    var index = 0;
    var screenindex = 'tirc_screen_' + index;

    var mappedTextrowData = dataall.map(item => {

      id++;
      return ( <Textrow key={id} elem={item}/> )
    });

    var mappedPhantomrowData = this.props.activedata.map(item => <Phantomrow {...item} />);
    let mappedData = mappedTextrowData.concat(mappedPhantomrowData);

    return <div className={classStr} id={screenindex}>{mappedData}</div>

  },

  componentDidMount: function () {
    console.log('TircScreen: didMount');
    Resizer.resize(this.props.index, 700);
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    var props = this.props;
    var isEqual = _.isEqual(props, nextProps);
    if (!isEqual) {
      return true;
    }
    return false;
  },


  componentDidUpdate: function (prevProps, prevState) {
    console.log('tircScreen: on did update', this.scrolling)
    var index = prevProps.index;
    console.log('TircScreen: didUpdate');
    console.log('resizible index update: ' + index);

    Resizer.resize(index);

  }


});

