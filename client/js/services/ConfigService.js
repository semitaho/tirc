//var embedly = require('embed');
module.exports = (function () {

  var KEY = 'tircnick';
  var users = [];
 // embedly.key('65fac812c50542dfb026115c52cff16a');

  /*
  $.embedly.defaults.query =  {
    chars: 400,
    autoplay: false
  }
  */
  var API_KEY = 'eOp9LjtwzApDNb-TbPbCEZ2V74XTSwrV';

  return {
    saveUser: function (nick) {
      if (localStorage) {
        localStorage.setItem(KEY, nick);
        console.log('user saved: ' + nick);
      }
    },

    loadUser: function () {
      if (localStorage !== undefined && localStorage.getItem(KEY) !== null) {
        return localStorage.getItem(KEY);
      }
      return 'taho';
    },

    loadFromDb: function () {
      var qCriteria = {_id: 'client'};
      var REST_URI = 'https://api.mongolab.com/api/1/databases/tirc/collections/configuration?q=' + JSON.stringify(qCriteria) + '&l=1&apiKey=' + API_KEY;
      return $.ajax({
        type: "GET",
        url: REST_URI,
        contentType: 'application/json;charset=UTF-8'
      });

    }
  };


})();