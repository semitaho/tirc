var React = require('react/addons'),
  Tirc = require('./components/tirc.jsx'),
  Config = require('./services/ConfigService.js'),
  Spinner = require('./components/spinner.jsx');


module.exports = (function () {

  var _state = {tabs: [{name: 'tirc'}]};
  var _convkey = 'CONVERSATIONS';

  var store = function () {
    if (localStorage) {
      console.log('storing conversations...');
      var data = [];

      for (var i = 1; i < _state.tabs.length; i++) {
        var tab = _state.tabs[i];
        data.push(tab);
      }
      localStorage.setItem(_convkey, JSON.stringify(data));
    }

  };


  var load = function () {
    if (localStorage) {
      console.log('loading conversations...');
      var openTabs = JSON.parse(localStorage.getItem(_convkey));
      if (!openTabs) {
        return;
      }
      for (var i = 0; i < openTabs.length; i++) {
        _state.tabs[i + 1] = openTabs[i];
      }
    }
  };

  var isActive = function (tab) {
    return _.isEqual(_state.active.name, tab.name);
  };


  _state.active = _state.tabs[0];

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

    initload: function (load) {
      console.log('valueis'+load);
      _state.loading = load;

    },

    settopic: function (data) {
      _state.tabs[0].mainpanel.topic = data;
    },


    setmessage: function (data) {
      console.log('setting message...');
      var selectedtab = _state.tabs[0];
      if (data.target !== null && data.target !== undefined) {
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
            screenloaded: true,
            connectdata: [],
            currentdata: [],
            unread: 0
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
      if (!isActive(selectedtab)) {
        selectedtab.unread += 1;
      }
      store();
    },

    setconnectdata: function (data) {
      for (key in data)
        _state.tabs[0][key] = data[key];
      _state.users = [];

      _state.active = _state.tabs[0];

      _state.loading = false;
      load();
    },

    setusersdata: function (data) {
      var users = data[0].users;
      _state.users = users;
      _state.chosen = Config.loadUser('taho');
    },

    settext: function (value) {
      _state.active.text = value;
    },
    setnick: function (newnick) {
      _state.chosen = newnick;
    },


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
          screenloaded: true,
          connectdata: [],
          currentdata: [],
        };
        foundTab = {name: nick, mainpanel: mainpanel, unread: 0};
        _state.tabs.push(foundTab);

      }
      _state.active = foundTab;
    }
    ,

    selecttab: function (nick) {
      var foundTab = _.find(_state.tabs, function (tab, index) {
        return (tab.name === nick);
      });
      foundTab.unread = 0;
      _state.active = foundTab;
    },

    setvisibility: function (visible) {
      var activetab = _state.active;
      activetab.mainpanel.visible = true;
      activetab.mainpanel.screenloaded = true;
    }

  }

})();
