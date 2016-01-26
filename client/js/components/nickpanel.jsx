var React = require('react/addons'),
  Config = require('../services/ConfigService.js');

module.exports = React.createClass({
  componentWillMount: function () {
    this.increaseIdle.bind(this);
    this.statemap = {typing: 'kirjoittaa...', fixing: 'korjaa...', connected: 'yhdistänyt', idle: 'idlaa'};

  },
  componentDidMount: function () {
    console.log('Nickpanel: mount');
    var that = this;
    this.interval = setInterval(that.increaseIdle, 1000);
  },

  increaseIdle: function () {
    var users = this.props.users;
    if (users.length === 0){
      return;
    }
    var that = this;
    var idleusers = users.map(function (user) {
      var newIdletime = user.idleTime + 1;
      var idle = that.formatToMinutes(newIdletime);
      user.idle = idle;
      user.idleTime = newIdletime;
      return user;
    });
    this.props.receiveUsers(idleusers);
  },


  formatToMinutes: function (time) {
    // Hours, minutes and seconds'
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0)
      ret += "" + hrs + "h " + (mins < 10 ? "0" : "");
    ret += "" + mins + " min " + (secs < 10 ? "0" : "");
    ret += "" + secs + " s";
    return ret;
  },
  componentWillUnmount: function () {
    console.log('unmount');
    clearInterval(this.interval);

  },

  fillIdletime: function (users) {
    var that = this;
    var idleusers = users.map(function (user) {
      var idle = that.formatToMinutes(user.idleTime);
      user.idle = idle;
      return user;
    });
    return idleusers;
   // $(document).trigger('statechange', ['setusers', idleusers]);


  },

  onuserclick: function (nick) {
    $(document).trigger('statechange', ['addtab', nick]);
  },


  render: function () {
    var users =  this.fillIdletime(this.props.users);
    var tircusers = this.props.tircusers;
    users = users.map(function (user) {
      return <div className="list-group-item">
        <h4 className="nick list-group-item-heading">{user.nick}</h4>
        <div className="idle small list-group-item-text">{user.idle}</div>
      </div>
    });


    var statemap = this.statemap;
    var that = this;
    var tircusers = tircusers.map(function (user) {
      var clazz = 'small idle  list-group-item-text';
      if ('connected' === user.state) {
        clazz = 'small connected';
      } else if ('typing' === user.state || 'fixing' === user.state) {
        clazz = 'small typing list-group-item-text';
      }
      var current = Config.loadUser();
      var stateclass = '';

      if (current !== user.nick) {
        return (<a className="tircuser list-group-item guest">
          <h3 className="nick list-group-item-heading" onClick={that.onuserclick.bind(that, user.nick)}
               title="Aloita privakeskustelu">{user.nick}</h3>
          <div className={clazz}>{statemap[user.state]}</div>
        </a>)
      }

      else {
        return (<a className="tircuser list-group-item active">
          <h3 className="nick list-group-item-heading">{user.nick}</h3>
          <div className={clazz}>{statemap[user.state]}</div>
        </a>)
      }
    });


    return <div className="tirc_info_panel panel-body col-md-2 hidden-xs hidden-sm">{
      tircusers.concat(<hr />).concat(users)
    }

    </div>

  }

});

