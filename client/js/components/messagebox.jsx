var React = require('react'),
  Config = require('../services/ConfigService');

import UIService  from '../services/UIService.js';
module.exports = React.createClass({

  say: function () {
    console.log('text', this.props.text);
    var self = this;
    var selftext = this.props.text;
    if (UIService.hasLink(this.props.text)) {
      UIService.embedlyText(this.props.text, done => {
        this.props.sendText(selftext, done);
      });
    } else {
      this.props.sendText(selftext, selftext);
    }
    this.props.updateText('');
  },

  saysuccess: function () {
    console.log('success said.');
  },

  componentWillMount: function () {
    console.log('messagebox: willmount');
  },

  componentDidMount: function () {
    this.typestate = {time: new Date(), state: 'connected'};
    this.id = setInterval(this.onstateupdate, 500);
  },

  componentWillUnmount: function () {
    clearInterval(this.id);
  },

  onstateupdate: function () {
    if (this.typestate.state === 'typing' || this.typestate.state === 'fixing') {
      var currentTime = new Date();
      var millisecondsDiff = (currentTime.getTime() - this.typestate.time.getTime());
      if (millisecondsDiff > 1500) {
        this.statechange('idle');
      }
    } else if (this.typestate.state === 'connected') {
      var currentTime = new Date();
      var millisecondsDiff = (currentTime.getTime() - this.typestate.time.getTime());
      if (millisecondsDiff > 60000) {
        this.statechange('idle');
      }
    }
  },


  onPress: function (event) {
    if (event.which === 13) {
      this.say();
    } else if (event.which === 8 || event.which === 46) {
      this.statechange('fixing');
    } else {
      this.statechange('typing');
    }
  },

  statechange: function (state) {
    var previousState = this.typestate.state;
    this.typestate = {time: new Date(), state: state};
    if (state !== previousState) {
      this.props.changeState(state);
    }
  },

  onBlur: function (event) {
    this.statechange('idle');
  },

  updateText: function (event) {
    this.props.updateText(event.target.value);
  },
  render: function () {
    return (
      <div className="col-md-12">
        <input type="text" name="text" value={this.props.text} onChange={this.updateText} onBlur={this.onBlur}
               id="textline" className="input-lg form-control message_box"
               placeholder="say something..." onKeyUp={this.onPress}></input>
      </div>
    );
  }
});

