var React = require('react'),
  Config = require('../services/ConfigService.js');


import Emotion from './emotion.jsx';
module.exports = React.createClass({

  getClassName: function (text) {
    if (this.isJoinOrPart(text)) {
      return 'joinOrPart';
    }
    return '';
  },

  isJoinOrPart: function (input) {
    return input.indexOf("has joined #") !== -1
      || input.indexOf("has left #") !== -1;
  },

  isQuit: function (input) {
    return input.indexOf("has quit ") !== -1;

  },

  isMePart: function (input) {
    return input.indexOf(" * ") !== -1
      && input.indexOf(" has ") === -1
      && input.indexOf('<') === -1
      && input.indexOf('>') === -1;
  },


  isActionPart: function (input) {
    return input.indexOf("is known as") !== -1;
  },


  parseTime: function (elem) {
    return elem.match(/[0-9][0-9]:[0-9][0-9](:[0-9][0-9])?/g)[0];
  },


  format: function (parsedText) {
    var ytre = /(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/ig;
    var matchArray = parsedText.match(ytre);
    if (matchArray) {
      var that = this;
      $(matchArray).each(function (index, match) {
        if (Parser.isPic(match)) {
          var imglink = that.formatImage(match);
          parsedText = parsedText.replace(match, imglink);
        } else {
          var link = that.formatLink(match);
          parsedText = parsedText.replace(match, link);
        }
      });
    }
    return parsedText;
  },

  formatImage: function (match) {
    var imglink = '<a href="' + match + '" target="_blank"><img src="' + match + '" title="' + match + '" /></a>';
    return imglink;
  },

  formatLink: function (match) {
    var link = '<a href="' + match + '" target="_blank">' + match + '</a><div class="selector-wrapper"></div> ';
    return link;
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    var props = this.props;
    return !_.isEqual(props, nextProps);

  },


  rendercomment: function (item) {
    var textrowstyle = 'row comment textrow';
    if (item.nick === Config.loadUser('taho')) {
      textrowstyle += ' own';
    }
    console.log('item',item.date);
    return (<div className={textrowstyle}>
        <div className="nick columns col-md-3 col-xs-3 text-right">{item.nick}</div>
        <div className="nicktext col-md-9 col-xs-9">
          <div className="text">
            <span dangerouslySetInnerHTML={{__html: item.line }} />
            <Emotion toggleEmotion={() => this.props.toggleEmotion(item.date, true) }  classNames="glyphicon glyphicon-thumbs-up text-primary" />
            <Emotion toggleEmotion={() => this.props.toggleEmotion(item.date, false) } classNames="glyphicon glyphicon-thumbs-down text-danger" />
            <span className="time small"> - {item.time}</span>
          </div>  
        </div>
      </div>
    )
  },

  renderme: function (item) {
    return ( <div
      className="row textrow">
      <div
        className="action"
        dangerouslySetInnerHTML={
                {
                    __html: item.line + '<span class="time"> - ' + item.time + '</span>'
                }
                    }></div>
    </div>)
  },


  renderwelcome: function (item) {
    return ( <div
        className="row textrow">
        <div
          className="action col-md-12"
          dangerouslySetInnerHTML={
                {
                    __html: '<div class="thumbnail"><div class="caption" >'+ item.nick + ' saapui paikalle ' + item.line + '</div><span class="time small"> - ' + item.time + '</span></div>'
                }
                    }
          ></div>
      </div>
    )
  },

  renderaction: function (item) {
    return ( <div
        className="row textrow">
        <div
          className="star bg-warning col-md-12"
          dangerouslySetInnerHTML={
                {
                    __html: item.line + '<span class="time"> - ' + item.time + '</span>'
                }
                    }
          ></div>
      </div>
    )
  },

  renderquit: function (item) {
    return ( <div
        className="row textrow">
        <div
          className="bg-danger col-md-12 quit"> {item.nick} poistui
          kokonaan
          ircistä: {
            item.line
          }
          -{item.time
          }</div>

      </div>
    )
  },
  renderjoin: function (item) {
    return ( <div
        className="row textrow">
        <div
          className="col-md-12 bg-info quit">{item.nick} saapui kanavalle - {item.time}</div>

      </div>
    )
  },

  renderpart: function (item) {
    return ( <div
        className="row textrow">
        <div className="bg-warning col-md-12 quit"> {item.nick} jätti kanavan - {item.time}</div>
      </div>
    )
  },
  render: function () {
    if (this['render' + this.props.elem.type]) {
      return this['render' + this.props.elem.type](this.props.elem);
    } else {
      console.log('ERROR! method: render' + this.props.elem.type + ' cannot be found, row: ' + JSON.stringify(this.props.elem));
      return null;
    }
    return (
      <div
        className="action textrow"> {this.props.elem
      }
            <span
              className="time"> -{this.props.time
            }
            </span>
      </div> )
  },

  renderlogevent: function (item) {
    return (
      <div
        className="textrow row logevent alert-warning"><div className="col-md-12">{item.line
      }</div>
      </div> );
  }

});