var React = require('react/addons'),
  Textrow = require('./textrow.jsx'),
  Resizer = require('../resize.js'),
  UIService = require('../services/UIService.js');
module.exports = React.createClass({

  componentWillMount: function () {
    console.log('TircScreen: willMount');
  },

  render: function () {

    var dataall = this.props.connectdata.concat(this.props.currentdata);
    var id = 0;
    var visible = this.props.visible;
    var classStr = 'tirc_screen panel-body col-md-10 col-xs-12';
    var index = this.props.index;
    var screenindex = 'tirc_screen_'+index;

    return <div className={classStr} id={screenindex}>{  dataall.map(function (item) {

      id++;
      return ( <Textrow key={id} elem={item}/> )
    }) }</div>

  },

  componentDidMount: function () {
    console.log('TircScreen: didMount');
    var dom = $(this.getDOMNode());
    var link = dom.find('a').not($('.embed a'));
    var index = this.props.index;
    if (link.length > 0) {
      UIService.embedly(link, function () {
        console.log('resizible index: '+index);
        Resizer.resize(index);
        console.log('tircScreen - componentdidMount link embedly...');
        $(document).trigger('statechange', ["setvisibility", true]);
      });

    }

  },

  shouldComponentUpdate: function (nextProps, nextState) {
    var props = this.props;
    var isEqual =  _.isEqual(props, nextProps);
    if (!isEqual) {
      return true;
    }
    return false;
  },


  componentDidUpdate: function (prevProps, prevState) {
    console.log('tircScreen: on did update')
    var index = prevProps.index;
    console.log('TircScreen: didUpdate');
    console.log('resizible index update: '+index);

    var link = $(this.getDOMNode()).find('a').not($('.embed a'));
    if (link.length === 0) {
      Resizer.resize(index);
    }
    else {
      UIService.embedly(link, function () {
        {
          Resizer.resize(index);
        }
      });
    }
  }


});

