var React = require('react/addons');
var clazz = React.createClass({
  render: function () {
    var id = 'tab_panel_' + this.props.index;
    return <div className="row panel-header"> <div id={id} className="col-md-12 panel-title tab_panel panel-primary"><h3>{this.props.topic}</h3></div></div>
  }

});

module.exports = clazz;

