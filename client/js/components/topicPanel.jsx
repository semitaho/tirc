
var React = require('react/addons');
var clazz = React.createClass({
	 render : function(){
         var id = 'tab_panel_'+this.props.index;
		 return <div className="tab_panel  row" id={id}><div className="col-md-12 panel-header panel-primary">{this.props.topic}</div></div>
		 }      
  
});

module.exports = clazz;

