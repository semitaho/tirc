var React = require('react/addons'),
  Config = require('../services/ConfigService'),
  TircBackend = require('../services/TircBackend'),
  TircState = require('../TircStore'),
  UIService = require('../services/UIService.js');

module.exports = React.createClass({

  say: function () {
   // UIService.fireBackendCall(['say', Config.loadUser('taho'), this.props.text, this.saysuccess]);
    $(document).trigger('backendcall',['say', Config.loadUser('taho'), this.props.text, this.saysuccess]);
    $(document).trigger('statechange', ['settext', '']);

//    UIService.fireStateChange(['settext', '']);

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
      $(document).trigger('backendcall',['changeState', Config.loadUser(), state]);
    }
  },

  onBlur: function (event) {
    console.log('bluur');
    this.statechange('idle');
  },

  updateText: function (event) {
    console.log('said', event.target.value);
    $(document).trigger('statechange', ['settext', event.target.value]);
   // UIService.fireStateChange(['settext', event.target.value]);
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

