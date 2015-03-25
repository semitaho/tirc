var Mainpanel = React.createClass({

    componentDidMount: function () {
        console.log('mainScreen - mounted');
        $(window).unload(this.destroy);
    },

    destroy: function () {
        GeoService.unwatch();
        var backend = this.props.backend;
        backend.sayGoodbye(Config.loadUser('taho'));
    },


    onconnecterror: function (err) {
        console.log('error:' + JSON.stringify(err));
        this.produceMockdata();
    },

    componentDidMount: function(){
        Resizer.resize();

    },

    render: function () {
        this.props.tircusers.sort(function (user1, user2) {
            return user2.time - user1.time;
        });
        return (
            <div id="tirc_main">
                <div className="relative">
                    <TopicPanel topic={this.props.topic} />
                    <div className="tirc_main_panel_middle">
                        <TircScreen connectdata={this.props.connectdata} currentdata={this.props.currentdata} />
                        <Nickpanel users={this.props.users} tircusers={this.props.tircusers} />
                    </div>
                </div>
            </div> )

    }
});
