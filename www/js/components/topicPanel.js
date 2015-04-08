var TopicPanel = React.createClass({displayName: "TopicPanel",
    

	 render : function(){
         var id = 'tab_panel_'+this.props.index;
		 return React.createElement("div", {className: "tab_panel", id: id}, React.createElement("div", null, this.props.topic))
		 }      
  
});

