module.exports = (function () {
  var KEY = '65fac812c50542dfb026115c52cff16a';
  $.embedly.defaults.key = KEY;
  $.embedly.defaults.query = {
    chars: 400,
    autoplay: false
  };
  var urlRe = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  return {
    embedly: function (link, success) {
    },

    embedlyText: function (text, success) {
      var formattedText = text.replace(urlRe, function (url) {
        return '<a  href="' + url + '" target="_blank">' + url + '</a>';
      });
      var embeddedHTML = $('<span>' + formattedText + '</span>');
      $(embeddedHTML).embedly({
        done: function () {
          success(embeddedHTML.html());
        }
      });


    },


    fireBackendCall: function (paramArray) {
      $(document).trigger('backendcall', paramArray);
    }

    ,

    fireStateChange: function (paramArray) {
      console.log('ui firer', paramArray);
      $(document).trigger('statechange', paramArray);
    }
    ,

    hasLink: function (text) {
      if (urlRe.test(text)) {
        return true;
      }
      return false;

    }


  };

})();
