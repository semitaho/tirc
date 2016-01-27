var React = require('react'),
  Config = require('../services/ConfigService.js');

class Userselect extends React.Component {
  onconfigloaded(data) {
    $(document).trigger('statechange', ['setusersdata', data]);

  }

  render() {
    const onchange = (event) => {
      var newnick = event.target.value;
      Config.saveUser(event.target.value);
      this.props.changeUser(newnick);
      //$(document).trigger('statechange', ['setnick', newnick]);
      //$(document).trigger('backendcall', ['changeNick', oldnick, newnick]);
    };
    return (
      <div id="userselect" className="col-md-1 col-sm-3 col-xs-3 text-right">
        <select className="form-control" name="userlist" onChange={onchange} value={this.props.chosen}>
          {this.props.users.map(user => {
            return (<option key={user}>{user}</option>)
          })}
        </select>

      </div>)
  }
}

export default Userselect;
