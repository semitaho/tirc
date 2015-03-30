var Tirc = React.createClass({



    render: function () {
        var tabs = this.props.data.tabs;
        var tircdata = this.props.data;
        var data = tircdata.active;
        return (<div className="tirc_content">
            <div className="table">
                <header className="row tirc_header_panel">
                    <Tabheader items={tabs} selected={data.name} />
                    <Userselect users={tircdata.users} chosen={tircdata.chosen} />
                </header>
            </div>
            <Mainpanel topic={data.mainpanel.topic} tircusers={data.mainpanel.tircusers}  users={data.mainpanel.users} connectdata={data.mainpanel.connectdata} currentdata={data.mainpanel.currentdata} />
            <footer className="tirc_action_panel" id="action_panel">
                <Messagebox text={data.text} />
            </footer>
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

