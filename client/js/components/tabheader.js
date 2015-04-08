var Tabheader = React.createClass({


   selectTab : function(nick){
       console.log('selecting tab: '+nick);
       TircState.onstatechange(TircState.selecttab, nick);


   },

   render: function(){
       var items = this.props.items;
       var active =this.props.selected;

       var that = this;
       var itemFunction = function(item){
         var className = 'tab';
         if (item.name === active){
             className += ' active';
         }
         return (
             <a className={className} onClick={that.selectTab.bind(that, item.name)} href="#">{item.name}</a>
         )
       };

       var header = items.map(itemFunction);
       return <div className="tabs">{header}</div>;

   }
});
