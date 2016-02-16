var Config = require('./ConfigService'),
  Parser = require('./Parser'),
  NotifyService = require('./NotificationService');

class TircBackend {

  constructor() {
    this.URL = 'http://' + location.hostname + ':8880/backend/';
  }

  /*
   var BASE_DOMAIN = location.hostname + ":" + location.port;
   if (BASE_DOMAIN === ':') {
   BASE_DOMAIN = 'localhost:8880';
   }
   var URL = "/backend/";

   var messagecallbacks = {


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

   var onconnectsuccess = function (data) {
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
   };


   };

   var onconnecterror = function () {
   var stateobj = _getMockedData();
   $(document).trigger('statechange', ['setconnectdata', stateobj]);
   };
   */

  connect(nick, location) {
    var message = {
      nick: nick
    };
    if (location !== null && location !== undefined) {
      message.location = location;
    }
    return new Promise(resolve => {
      $.ajax({
        url: this.URL + 'connect',
        type: "POST",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(message)
      }).done(function (data) {
        //onconnectsuccess(data);
        resolve(data);
      }).error(function (status) {
        console.log("bad data, but still ok", status.statusText);
        //onconnecterror();
        resolve("ok");
      });
    });
  }

  say(nick, text, htmltext, target) {
    var message = {
      nick,
      text,
      htmltext,
      target
    };
    console.log('message', message);
    return $.ajax({
      type: "POST",
      url: this.URL + 'say',
      contentType: 'application/json;charset=UTF-8',
      data: JSON.stringify(message)
    });
  }

  toggleEmotion(user, id, like) {

    var emotion = {user, like, id};
    return $.ajax({
      type: "POST",
      url: this.URL + 'toggleemotion',
      contentType: 'application/json;charset=UTF-8',
      data: JSON.stringify(emotion)
    });

  }

  changeState(nick, state, text) {
    var body = {nick: nick, state: state, text};
    return $.ajax({
      type: "POST",
      url: this.URL + 'changestate',
      contentType: 'application/json;charset=UTF-8',
      data: JSON.stringify(body)
    });
  }

  submitLocation(nick, location) {
    let message = {
      nick: nick,
      location
    };
    console.log('message', message);
    return $.ajax({
      type: "POST",
      url: this.URL + 'submitlocation',
      contentType: 'application/json;charset=UTF-8',
      data: JSON.stringify(message)
    });
  }

  updateLocation(nick, location) {
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
  }

  sayGoodbye(nick) {
    var message = {
      nick: nick
    };

    return $.ajax({
      type: "POST",
      url: URL + 'saygoodbye',
      contentType: 'application/json;charset=UTF-8',
      data: JSON.stringify(message)
    });

  }

  changeNick(oldnick, newnick) {
    var message = {
      nickold: oldnick,
      nick: newnick
    };
    $.ajax({
      type: "POST",
      url: this.URL + 'changenick',
      contentType: 'application/json;charset=UTF-8',
      data: JSON.stringify(message)
    });
  }

  listen(id, subscriber) {
    return $.ajax({
      url: this.URL + 'listen/' + id + '/' + subscriber,
      crossDomain: true,
      type: "GET"
    });
  }
}

let tircBackend = new TircBackend;
export default tircBackend;