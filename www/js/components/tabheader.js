var Tabheader = React.createClass({displayName: "Tabheader",


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
             React.createElement("a", {className: className, onClick: that.selectTab.bind(that, item.name), href: "#"}, item.name)
         )
       };

       var header = items.map(itemFunction);
       return React.createElement("div", {className: "tabs"}, header);

   }
});
