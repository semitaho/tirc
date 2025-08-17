import React from 'react';
import { loadUser } from '../services/ConfigService.js';

class NickPanel extends React.Component {
  constructor() {
    super();
    this.statemap = {typing: 'kirjoittaa...', fixing: 'korjaa...', connected: 'yhdistänyt', idle: 'idlaa'};
  }

  componentDidMount() {
    console.log('Nickpanel: mount');
  }

  render() {
    var users = this.fillIdletime(this.props.users);
    var tircusers = this.props.tircusers;
    
    users = users.map(function (user, index) {
      return <li key={index}>
        <h4 className="nick">{user.nick}</h4>
        <div className="idle small list-group-item-text">{user.idle}</div>
      </li>
    });


    var statemap = this.statemap;
    var that = this;
    var tircusers = tircusers.map(function (user,index) {
      var clazz = 'small idle  list-group-item-text';
      var current = loadUser();
      var stateclass = '';

      if (current !== user.nick) {
        return (<li className="tircuser guest">
          <h4 className="nick">{user.nick}</h4>
        </li>)
      }

      else {
        return (<li className="tircuser  active">
          <h4 className="nick">{user.nick}</h4>
        </li>)
      }
    });


    return (
      <ul id="tirc_nicks" className="tirc_info_panel list-inline">{
        tircusers.concat(users)
      }

      </ul>)

  }

  formatToMinutes(time) {
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
  }

  fillIdletime(users) {
    var that = this;
    var idleusers = users.map(user => {
      var idle = that.formatToMinutes(user.idleTime);
      user.idle = idle;
      return user;
    });
    return idleusers;
  }


  componentWillUnmount() {
    console.log('unmount');
  }

}


export default NickPanel;

