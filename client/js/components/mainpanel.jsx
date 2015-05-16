var React = require('react'),
    TopicPanel = require('./topicPanel'),
    TircScreen = require('./tircScreen.jsx'),
    Nickpanel = require('./nickpanel');
module.exports = React.createClass({

    componentDidMount: function () {
        console.log('mainScreen - mounted');
        $(window).unload(this.destroy);
    },

    destroy: function () {
        GeoService.unwatch();
        TircBackend.sayGoodbye(Config.loadUser('taho'));
    },


    onconnecterror: function (err) {
        console.log('error:' + JSON.stringify(err));
        this.produceMockdata();
    },


    render: function () {
        this.props.tircusers.sort(function (user1, user2) {
            return user2.time - user1.time;
        });
        var index = this.props.index;
        console.log('index: '+index);
        var idindex = 'tirc_main_panel_middle_'+index;

        var visible = this.props.visible;
        var clazz = 'hide';
        if (visible){
            clazz='';

        }

        return (
            <div id="tirc_main" className={clazz}>
                <div className="relative">
                    <TopicPanel topic={this.props.topic} index={index} />
                    <div className="tirc_main_panel_middle" id={idindex}>
                        <TircScreen index={index}  visible={visible} connectdata={this.props.connectdata} currentdata={this.props.currentdata} />
                        <Nickpanel users={this.props.users} tircusers={this.props.tircusers} />
                    </div>
                </div>
            </div> )

    }
});
