require('./components/tircScreen.jsx');
require('./components/mainpanel.jsx');
var backend = require('./services/TircBackend.js'),
  geoservice = require('./services/GeoService.js'),
  config = require('./services/ConfigService.js'),
  state = require('./TircStore.js');

// tilanmuutos kuuntelija
$(document).on('statechange', function (event, eventAction, data) {
  state.onstatechange(state[eventAction], data);
});

// backend kuuntelija
$(document).on('backendcall', function (event, method, data1, data2, callback) {
  console.log('receiving backend call: ' + method);
  console.log('data: ', data1);
  if (data1 && data2) {
    backend[method](data1, data2, callback);
  } else {
    backend[method](data1, callback);

  }
});

backend.connect(config.loadUser(), function () {
  geoservice.init(function (location) {
    backend.sayWelcome(config.loadUser(), location, function () {
      geoservice.watch(function (locationUpdated) {
        backend.updateLocation(config.loadUser(), locationUpdated);
      });
    });
  });
});


