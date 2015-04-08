var TopicPanel = React.createClass({
    

	 render : function(){
         var id = 'tab_panel_'+this.props.index;
		 return <div className="tab_panel" id={id}><div>{this.props.topic}</div></div>
		 }      
  
});

