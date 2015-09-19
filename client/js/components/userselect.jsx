var React = require('react/addons'),
  Config = require('../services/ConfigService.js');

module.exports = React.createClass({

  onchange: function (event) {
    var oldnick = Config.loadUser('taho');
    var newnick = event.target.value;
    Config.saveUser(event.target.value);
    $(document).trigger('statechange', ['setnick', newnick]);
    TircBackend.changeNick(oldnick, newnick);
  },

  componentDidMount: function () {
    Config.loadFromDb(this.onconfigloaded);
  },

  onconfigloaded: function (data) {
    $(document).trigger('statechange', ['setusersdata', data]);


  },

  render: function () {
    var that = this;
    return (
      <div id="userselect" className="col-md-1 text-right">
        <select className="form-control" name="userlist" onChange={this.onchange} value={this.props.chosen}>
          {this.props.users.map(function (user) {
            return (<option key={user}>{user}</option>)
          })
          }
        </select>

      </div>)
  }
});
