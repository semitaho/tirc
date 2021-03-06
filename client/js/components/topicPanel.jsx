
import Userselect from './userselect.jsx';
import Tabheader from './tabheader.jsx';
import Nickpanel from './nickpanel.jsx';

var React = require('react/addons');
var clazz = React.createClass({
  render: function () {
    var id = 'tab_panel_0';
    return <div className="row panel-title">
                <div className="col-md-12 full-width">
                  <div className="row topic-panel">
                    <div className="col-md-4 col-sm-10 col-xs-9 topic">
                        <h3>{this.props.topic}</h3>
                    </div>
                    <div className="col-md-6 hidden-xs hidden-sm overflow-scroll">
                     <Nickpanel users={this.props.users} receiveUsers={this.props.receiveUsers} tircusers={this.props.tircusers}/>
                    </div>
                    <div className="col-md-2 col-sm-2 col-xs-3">
                      <Userselect {...this.props.userselect} changeUser={this.props.changeUser}/>
                    </div>
                  </div>
                </div>
            </div>
  }

});

module.exports = clazz;

