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
      return <li>
        <h4 className="nick">{user.nick}</h4>
        <div className="idle small list-group-item-text">{user.idle}</div>
      </li>
    });


    var statemap = this.statemap;
    var that = this;
    var tircusers = tircusers.map(function (user) {
      var clazz = 'small idle  list-group-item-text';
      var current = Config.loadUser();
      var stateclass = '';

      if (current !== user.nick) {
        return (<li className="tircuser guest">
          <h4 className="nick" onClick={that.onuserclick.bind(that, user.nick)}
               title="Aloita privakeskustelu">{user.nick}</h4>
          <div className={clazz}>{statemap[user.state]}</div>
        </li>)
      }

      else {
        return (<li className="tircuser  active">
          <h4 className="nick">{user.nick}</h4>
          <div className={clazz}>{statemap[user.state]}</div>
        </li>)
      }
    });


    return <div className="col-md-12">
      <ul id="tirc_nicks" className="tirc_info_panel list-inline">{
      tircusers.concat(users)
      }

    </ul></div>

  }

});

