var Tirc = React.createClass({displayName: "Tirc",



    render: function () {
        var tabs = this.props.data.tabs;
        var tircdata = this.props.data;
        var tabactive = tircdata.active;

        var tabcontent = function(data, id){
            var className="hidden";
            if (data.name === tabactive.name){
                className = '';
            }
            var actionpanelId = 'action_panel_'+id;
            return (
            React.createElement("div", {className: className}, 
            React.createElement(Mainpanel, {index: id, topic: data.mainpanel.topic, tircusers: data.mainpanel.tircusers, visible: data.mainpanel.visible, users: data.mainpanel.users, connectdata: data.mainpanel.connectdata, currentdata: data.mainpanel.currentdata}), 
            React.createElement("footer", {className: "tirc_action_panel", id: actionpanelId}, 
                React.createElement(Messagebox, {text: data.text})
            )
                )
            )
        };
        return (
           React.createElement("div", {className: "tirc_content"}, 
             React.createElement("div", {className: "table"}, 
                React.createElement("header", {className: "row tirc_header_panel"}, 
                    React.createElement(Tabheader, {items: tabs, selected: tabactive.name}), 
                    React.createElement(Userselect, {users: tircdata.users, chosen: tircdata.chosen})
                )
             ), 
             tabs.map(tabcontent) 
           ))
        //.table
        // header.row.tirc_header_panel
        // h1.cell tIrc
        //				#userselect(class="cell")
//
        //      #tirc_main
        //    footer.tirc_action_panel(id="action_panel")
    }

});

