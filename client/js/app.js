var backend = require('./services/TircBackend.js'),
  geoservice = require('./services/GeoService.js'),
  config = require('./services/ConfigService.js'),
  state = require('./TircStore.js');

// tilanmuutos kuuntelija
$(document).on('statechange', function (event, eventAction, data) {
  state.onstatechange(state[eventAction], data);
});

// backend kuuntelija
$(document).on('backendcall', function (event, method, data1, data2, data3, callback) {
  if (data1 && data2 && data3) {
    console.log('data3', callback);
    backend[method](data1, data2, data3, callback);

  }

  else if (data1 && data2) {
    backend[method](data1, data2, callback);
  } else {
    backend[method](data1, callback);

  }
});
$(document).trigger('statechange', ['initload', true]);

geoservice.init()
  .then(geoservice.reverseGeocode)
  .then(function (location) {
    return backend.connect(config.loadUser(), location);
  }).catch(function (err) {
    console.log('on err', err);
    return backend.connect(config.loadUser());
  });


