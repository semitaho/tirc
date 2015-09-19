var $ = require('jquery');
module.exports = (function () {
  return {
    embedly: function (link, success) {
      link.embedly({
        done: success
      });

    },

    fireBackendCall: function (paramArray) {
      $(document).trigger('backendcall', paramArray);
    },

    fireStateChange: function (paramArray) {
      $(document).trigger('statechange', paramArray);
    }

  };

})();
