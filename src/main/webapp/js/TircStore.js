var TircState = (function () {
    var _state = {tabs: [{name: 'tirc'}]};
    _state.active = _state.tabs[0];
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
            _state.tabs[0].mainpanel.users = data;
        },
        settircusers: function (data) {
            _state.tabs[0].mainpanel.tircusers = data;

        },

        settopic: function (data) {
            _state.tabs[0].mainpanel.topic = data;
        },

        setmessage: function (data) {
            console.log('setting message...');
            var newCurrentData = _state.tabs[0].mainpanel.currentdata.slice();
            newCurrentData.push(data);
            _state.tabs[0].mainpanel.currentdata = newCurrentData;
        },

        setconnectdata: function (data) {
            for (key in data)
                _state.tabs[0][key] = data[key];
            _state.users = [];
            console.log('tab data:'+JSON.stringify(_state));
        },

        setusersdata: function (data) {
            var users = data[0].users;
            _state.tabs[0].users = users;
            _state.chosen = Config.loadUser('taho');
        },

        settext: function (value) {
            _state.tabs[0].text = value;
        },
        setnick: function (newnick) {
            _state.chosen = newnick;
        },

        addtab: function(nick){
            var index = -1;
            var foundTab = _.find(_state.tabs, function(tab, index) {
                return (tab.name === nick);
            });
            if (foundTab === null || foundTab === undefined){
                console.log('creating new tab...');
                var mainpanel = {topic: 'privakeskustelu: '+nick, tircusers: [{nick: Config.loadUser()},{nick: nick}], users: [], connectdata: [], currentdata: []};
                foundTab = {name: nick, mainpanel:mainpanel};
                _state.tabs.push(foundTab);

            }
            _state.active = foundTab;
        },

        selecttab : function(nick){
            var foundTab = _.find(_state.tabs, function(tab, index) {
                return (tab.name === nick);
            });
            _state.active = foundTab;
        }

    }

})();