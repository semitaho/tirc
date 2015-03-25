var TircState = (function () {
    var _state = {};

    return {
        getInitialState: function () {
            return _state;
        },

        onstatechange: function (callback, val) {
            callback(val);
            React.render(
                React.createElement(Tirc, {data: _state}),
                document.getElementById('tirc_content')
            );

        },

        setusers: function (data) {
            _state.mainpanel.users = data;
        },
        settircusers: function (data) {
            _state.mainpanel.tircusers = data;

        },

        settopic: function (data) {
            _state.mainpanel.topic = data;
        },

        setmessage: function (data) {
            console.log('setting message...');
            var newCurrentData = _state.mainpanel.currentdata.slice();
            newCurrentData.push(data);
            _state.mainpanel.currentdata = newCurrentData;
        },

        setconnectdata: function (data) {
            for (key in data)
                _state[key] = data[key];
            _state.users = [];
        },

        setusersdata: function (data) {
            var users = data[0].users;
            _state.users = users;
            _state.chosen = Config.loadUser('taho');
        },

        settext: function (value) {
            _state.messagebox.text = value;
        },
        setnick: function (newnick) {
            _state.chosen = newnick;
        },
        settext: function (newtext) {
            _state.text = newtext;
        }

    }

})();