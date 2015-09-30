var TircState = require('../TircStore'),
  Config = require('./ConfigService'),
  Parser = require('./Parser'),
  NotifyService = require('./NotificationService');

var TircBackend = (function () {


  var BASE_DOMAIN = location.hostname + ":" + location.port;
  if (BASE_DOMAIN === ':') {
    BASE_DOMAIN = 'localhost:8880';
  }
  var URL = "/backend/";

  var messagecallbacks = {
    onusers: function (data) {
      var arr = Parser.formatusers(data.users);
      TircState.onstatechange(TircState.setusers, arr);
    },
    ontircusers: function (data) {
      TircState.onstatechange(TircState.settircusers, data);
    },

    ontopic: function (data) {
      TircState.onstatechange(TircState.settopic, data);
    },
    receive: function (data) {
      if (data.type === 'comment' && 'TIRC' === data.source) {
        var text = data.line;
        var user = Config.loadUser();
        var nick = data.nick;
        if (!NotifyService.isFocus() && text.indexOf(user) > -1) {
          NotifyService.notify(nick, text, data.time);
        }
      }

      TircState.onstatechange(TircState.setmessage, data);
    }

  };

  var onlistenerror = function (error, id) {
    console.log('error on listening, retrieving with id: ' + id);
    TircBackend.listen(id, onmessage, onlistenerror);
  };

  var onmessage = function (data) {
    console.log('on message: ' + data.type);
    messagecallbacks[data.type].apply(this, [data.data]);
    TircBackend.listen(data.lastid, onmessage, onlistenerror);

  };

  var onconnectsuccess = function (data, callback) {
    var arr = Parser.formatusers(data.users.users);
    console.log('connecting with data:' + data);
    var stateobj = {
      currentdata: data.currentData,
      connectdata: data.logsData,
      topic: data.topic,
      users: arr,
      unread: 0,
      tircusers: data.tircusers
    };
    var state = {mainpanel: stateobj};

    TircState.onstatechange(TircState.setconnectdata, state);
    TircBackend.listen(data.id, onmessage, onlistenerror);
    if (callback) {
      callback();
    }
  };


  var _getMockedData = function () {
    var texts = [
      {
        type: 'logevent',
        line: '5.6.2015'
      },
      {
        nick: 'sysse',
        type: 'comment',
        time: '23:05:34',
        line: 'tasa-arvokysymys sekin. naiset pyörittää mitä vain nuorina seksuaalisen valtansa turvin, mutta sit alkaa biologinen kello tikittää'
      },
      {source: 'TIRC', type: 'comment', nick: 'mcw', line: 'taho, lue toi', time: '23:04:06'},
      {type: 'quit', nick: 'melfstro', time: '12:44', line: 'Ping timeout'},
      {
        line: '* tirc saapui paikalle nickillä: mcw (Chrome, Mobiili, Aleksis Kiven katu 30, 00510 Helsinki, Suomi)',
        type: 'join'
      },
      {time: '12:44', nick: 'melfstro', type: 'join'},
      {line: '00:00  -!- Irssi: Join to #test1 was synced in 1 secs', type: 'action'},
      {
        id: 1423869709846, lastId: "TircLine_1423869709846", line: "* semitaho on pettynyt...",
        nick: null, source: "ALL", time: "01:21:49", type: "action"
      },
      {
        time: '23:31:38',
        type: 'welcome',
        nick: 'mcw',
        line: '(Chrome, Itätuulentie, 02100 Espoo, Suomi) <a href="http://maps.googleapis.com/maps/api/staticmap?center=60.1743894,24.8073555&zoom=13&size=1280x250&markers=color:orange%7Clabel:T%7C60.1743894,24.8073555" target="_blank">Sijainti</a>',
        time: '13:11:21',
        type: 'comment',
        nick: 'taho',
        line: 'no vaikka tää: <a href="http://i.imgur.com/bMLx74p.jpg?1" target="_blank">linkki</a>'
      },
      {
        "id": 1424000158752,
        source: "ALL",
        nick: "taho",
        time: "13:35:58",
        type: "welcome",
        line: "(Chrome, Tontunmäentie 3, 02200 Espoo, Suomi) <a target=\"_blank\" href=\"http://maps.googleapis.com/maps/api/staticmap?size=1280x200&markers=color:orange%7Clabel:T%7C60.17491,24.777617199999998&path=color:blue%7C60.1749468,24.7776802%7C60.1749462,24.7776819%7C60.1749429,24.7776853%7C60.1749459,24.7776882%7C60.1749465,24.7776899%7C60.1749456,24.7776908%7C60.1749458,24.7776891%7C60.1749481,24.7776988%7C60.1749443,24.7777064%7C60.1749288,24.7776894%7C60.1749288,24.7776894%7C60.174939599999995,24.7776568%7C60.174935,24.7776219%7C60.174935,24.7776219%7C60.174935,24.7776219%7C60.1748675,24.777645399999997%7C60.1748675,24.777645399999997%7C60.1748675,24.777645399999997%7C60.1748675,24.777645399999997%7C60.1748675,24.777645399999997%7C60.1748675,24.777645399999997%7C60.1748729,24.777640299999998%7C60.1748729,24.777640299999998%7C60.1748707,24.777610799999998%7C60.174889500000006,24.777580099999998%7C60.17494980000001,24.777686499999998%7C60.1749935,24.7776297%7C60.174945599999994,24.777667899999997%7C60.174984300000006,24.777625999999998%7C60.17491,24.777617199999998\">linkki</a>"
      },
      {
        "id": 1424000158752,
        source: "ALL",
        nick: "taho",
        time: "13:35:58",
        type: "welcome",
        line: "(Chrome, Tontunmäentie 3, 02200 Espoo, Suomi) <a target=\"_blank\" href=\"http://maps.googleapis.com/maps/api/staticmap?size=1280x200&markers=color:orange%7Clabel:T%7C60.17491,24.777617199999998&path=color:blue%7C60.1749468,24.7776802%7C60.1749462,24.7776819%7C60.1749429,24.7776853%7C60.1749459,24.7776882%7C60.1749465,24.7776899%7C60.1749456,24.7776908%7C60.1749458,24.7776891%7C60.1749481,24.7776988%7C60.1749443,24.7777064%7C60.1749288,24.7776894%7C60.1749288,24.7776894%7C60.174939599999995,24.7776568%7C60.174935,24.7776219%7C60.174935,24.7776219%7C60.174935,24.7776219%7C60.1748675,24.777645399999997%7C60.1748675,24.777645399999997%7C60.1748675,24.777645399999997%7C60.1748675,24.777645399999997%7C60.1748675,24.777645399999997%7C60.1748675,24.777645399999997%7C60.1748729,24.777640299999998%7C60.1748729,24.777640299999998%7C60.1748707,24.777610799999998%7C60.174889500000006,24.777580099999998%7C60.17494980000001,24.777686499999998%7C60.1749935,24.7776297%7C60.174945599999994,24.777667899999997%7C60.174984300000006,24.777625999999998%7C60.17491,24.777617199999998\">linkki</a>"
      }


    ]
    var topic = '';
    var users = [{nick: 'semitaho', idleTime: 13}];
    var date = new Date();
    var date2 = new Date(date.getTime() + 222);
    var tircusers = [{nick: 'taho', time: date, state: 'connected'}, {
      nick: 'mcw',
      time: date2,
      state: 'fixing'
    }];

    var stateobj = {};
    stateobj.mainpanel = {
      topic: topic,
      connectdata: [],
      currentdata: texts,
      users: users,
      tircusers: tircusers,
      topic: 'tahotuskunto'
    };
    stateobj.text = 'ploodah';
    stateobj.users = [];
    return stateobj;
  };

  var onconnecterror = function () {
    var stateobj = _getMockedData();
    $(document).trigger('statechange', ['setconnectdata', stateobj]);
  };


  return {

    registerCallback: function (key, callback) {
      _callbacks[key].push(callback);
    },


    connect: function (nick, success) {
      $.ajax({
        url: URL + 'connect/' + nick,
        type: "GET"
      }).done(function (data) {
        onconnectsuccess(data, success);
      }).error(onconnecterror);
    },

    getMockedData: _getMockedData,


    say: function (nick, text, callback) {
      var target = null;
      if (TircState.getActiveName() !== 'tirc') {
        console.log('active is: ' + TircState.getActiveName());
        target = TircState.getActiveName();
      }

      var message = {
        nick: nick,
        text: text,
        target: target
      };
      $.ajax({
        type: "POST",
        url: URL + 'say',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(message),
        success: callback
      });
    },

    changeState: function (nick, state) {
      var body = {nick: nick, state: state};
      $.ajax({
        type: "POST",
        url: URL + 'changestate',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(body)
      });
    },

    sayWelcome: function (nick, location, success) {
      var message = {
        nick: nick
      };
      if (location !== null && location !== undefined) {
        message.location = location;
      }
      $.ajax({
        type: "POST",
        url: URL + 'saywelcome',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(message),
        success: success
      });
    },

    updateLocation: function (nick, location) {
      var message = {
        nick: nick
      };
      if (location !== null && location !== undefined) {
        message.location = location;
      }
      $.ajax({
        type: "POST",
        url: URL + 'updatelocation',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(message)
      });
    },

    sayGoodbye: function (nick) {
      var message = {
        nick: nick
      };

      $.ajax({
        type: "POST",
        url: URL + 'saygoodbye',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(message)
      });

    },

    changeNick: function (oldnick, newnick) {
      var message = {
        nickold: oldnick,
        nick: newnick
      };
      $.ajax({
        type: "POST",
        url: URL + 'changenick',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(message)
      });
    },

    listen: function (id, successCallback, errorCallback) {
      var subscriber = Config.loadUser();
      $.ajax({
        url: URL + 'listen/' + id + '/' + subscriber,
        crossDomain: true,
        type: "GET"
      }).done(successCallback).error(function (err) {
        errorCallback(err, id);
      });
    }

  };
})();
module.exports = TircBackend;