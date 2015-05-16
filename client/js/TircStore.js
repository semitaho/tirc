var React = require('react'),
    Tirc = require('./components/tirc.jsx'),
    Config = require('./services/ConfigService.js');


module.exports = (function () {
    var _state = {tabs: [{name: 'tirc'}]};
    _state.active = _state.tabs[0];

    $(document).on('onstatechange', function(data){
       console.log('kuunnellaas...:'+data);
    });
    return {
        getInitialState: function () {
            return _state;
        },

        getActiveName: function () {
            return _state.active.name;
        },

        getActiveIndex: function () {
            var index = -1;
            var activeName = this.getActiveName();
            _.find(_state.tabs, function (tab, ind) {
                if (tab.name === activeName) {
                    index = ind;
                }
            });
            return index;

        },

        onstatechange: function (callback, val) {
            callback(val);
            console.log('rendering react...');

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
            var selectedtab = _state.tabs[0];
            if (data.target !== null && data.target !== undefined) {
                console.log('suunnattu keskusteluviesti...')
                var foundTab = _.find(_state.tabs, function (tab) {
                    return tab.name === data.target || tab.name === data.nick;
                });
                if (foundTab) {
                    selectedtab = foundTab;
                } else {
                    console.log('new private conv has started with: ' + data.nick);
                    var mainpanel = {
                        topic: 'privakeskustelu: ' + data.nick,
                        tircusers: [{nick: Config.loadUser()}, {nick: data.nick}],
                        users: [],
                        connectdata: [],
                        currentdata: []
                    };
                    foundTab = {name: data.nick, mainpanel: mainpanel};
                    _state.tabs.push(foundTab);
                    _state.active = foundTab;
                    selectedtab = foundTab;
                }
            }

            var newCurrentData = selectedtab.mainpanel.currentdata.slice();
            newCurrentData.push(data);
            selectedtab.mainpanel.currentdata = newCurrentData;
        },

        setconnectdata: function (data) {
            for (key in data)
                _state.tabs[0][key] = data[key];
            _state.users = [];
            var date = new Date();
            var date2 = new Date();
            //
            _state.active = _state.tabs[0];
        },

        setusersdata: function (data) {
            var users = data[0].users;
            _state.users = users;
            _state.chosen = Config.loadUser('taho');
        }
        ,

        settext: function (value) {
            _state.active.text = value;
        }
        ,
        setnick: function (newnick) {
            _state.chosen = newnick;
        }
        ,

        addtab: function (nick) {
            var foundTab = _.find(_state.tabs, function (tab, index) {
                return (tab.name === nick);
            });
            if (foundTab === null || foundTab === undefined) {
                console.log('creating new tab...');
                var mainpanel = {
                    topic: 'privakeskustelu: ' + nick,
                    tircusers: [{nick: Config.loadUser()}, {nick: nick}],
                    users: [],
                    connectdata: [],
                    currentdata: []
                };
                foundTab = {name: nick, mainpanel: mainpanel};
                _state.tabs.push(foundTab);

            }
            _state.active = foundTab;
        }
        ,

        selecttab: function (nick) {
            var foundTab = _.find(_state.tabs, function (tab, index) {
                return (tab.name === nick);
            });
            _state.active = foundTab;
        },

        setvisibility: function (visible) {
            var activetab = _state.active;
            activetab.mainpanel.visible = true;
        }

    }

})();
