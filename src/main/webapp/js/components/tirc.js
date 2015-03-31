var Tirc = React.createClass({



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
            <div className={className} >
            <Mainpanel index={id} topic={data.mainpanel.topic} tircusers={data.mainpanel.tircusers}  users={data.mainpanel.users} connectdata={data.mainpanel.connectdata} currentdata={data.mainpanel.currentdata} />
            <footer  className="tirc_action_panel" id={actionpanelId}>
                <Messagebox text={data.text} />
            </footer>
                </div>
            )
        };
        return (
           <div className="tirc_content">
             <div className="table">
                <header className="row tirc_header_panel">
                    <Tabheader items={tabs} selected={tabactive.name} />
                    <Userselect users={tircdata.users} chosen={tircdata.chosen} />
                </header>
             </div>
             {tabs.map(tabcontent) }
           </div>)
        //.table
        // header.row.tirc_header_panel
        // h1.cell tIrc
        //				#userselect(class="cell")
//
        //      #tirc_main
        //    footer.tirc_action_panel(id="action_panel")
    }

});

