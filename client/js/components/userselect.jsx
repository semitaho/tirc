var React = require('react'),
  Config = require('../services/ConfigService.js');

class Userselect extends React.Component {
 
  render() {
    const onchange = (event) => {
      var newnick = event.target.value;
      Config.saveUser(event.target.value);
      this.props.changeUser(newnick);
    };
    return (
      <div id="userselect" className="text-right">
        <select className="form-control input-sm" name="userlist" onChange={onchange} value={this.props.chosen}>
          {this.props.users.map(user => {
            return (<option key={user}>{user}</option>)
          })}
        </select>

      </div>)
  }
}

export default Userselect;
