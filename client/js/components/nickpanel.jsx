var React = require('react'),
    Config = require('../services/ConfigService.js');

module.exports = React.createClass({
    componentWillMount: function () {
        this.statemap = {typing: 'kirjoittaa...', fixing: 'korjaa...', connected: 'yhdistänyt', idle: 'idlaa'};

    },
    componentDidMount: function () {
        console.log('Nickpanel: mount');
        var that = this;
        this.interval = setInterval(this.increaseIdle, 1000);
    },

    increaseIdle: function () {
        var users = this.props.users;
        var that = this;
        var idleusers = users.map(function (user) {
            var newIdletime = user.idleTime + 1;
            var idle = that.formatToMinutes(newIdletime);
            user.idle = idle;
            user.idleTime = newIdletime;
            return user;
        });
        $(document).trigger('statechange', ['setusers', idleusers]);
    },


    formatToMinutes: function (time) {
        // Hours, minutes and seconds'
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        ret = "";
        if (hrs > 0)
            ret += "" + hrs + "h " + (mins < 10 ? "0" : "");
        ret += "" + mins + " min " + (secs < 10 ? "0" : "");
        ret += "" + secs + " s";
        return ret;
    },
    componentWillUnmount: function () {
        console.log('unmount');
        clearInterval(this.interval);

    },

    componentWillReceiveProps: function (nextProps) {

        var users = nextProps.users;
        var tircusers = nextProps.tircusers;
        var that = this;
        var idleusers = users.map(function (user) {
            var idle = that.formatToMinutes(user.idleTime);
            user.idle = idle;
            return user;
        });
        var state = {};
        // if (tircusers !== null && tircusers.length > 0){
        // 	state.tircusers = tircusers;
        // }
        // if (idleusers !== null && idleusers.length > 0){
        // 	state.users = idleusers;
        // }
        // this.setState(state);

    },

    onuserclick : function(nick){
        console.log('on click: '+nick);
        TircState.onstatechange(TircState.addtab, nick);
    },


    render: function () {
        var users = this.props.users;
        var tircusers = this.props.tircusers;
        var users = users.map(function (user) {
            return <div>
                <div className="nick">{user.nick}</div>
                <div className="idle">{user.idle}</div>
            </div>
        });


        var statemap = this.statemap;
        var that = this;
        var tircusers = tircusers.map(function (user) {
            var clazz = 'idle';
            if ('connected' === user.state) {
                clazz = 'connected';
            } else if ('typing' === user.state || 'fixing' === user.state) {
                clazz = 'typing';
            }
            var current = Config.loadUser();
            var stateclass = '';

            if (current !== user.nick){
                return (<div className="tircuser guest">
                    <div className="nick" onClick={that.onuserclick.bind(that, user.nick)} title="Aloita privakeskustelu">{user.nick}</div>
                    <div className={clazz}>{statemap[user.state]}</div>
                </div>)
            }

            else {
                return (<div className="tircuser">
                    <div className="nick">{user.nick}</div>
                    <div className={clazz}>{statemap[user.state]}</div>
                </div>)
            }
        });


        return <div className="tirc_info_panel">{
            tircusers.concat(<hr />).concat(users)
            }

        </div>

    }

});

