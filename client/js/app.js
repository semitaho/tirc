require('./components/tircScreen.jsx');
require('./components/mainpanel.jsx');
var backend = require('./services/TircBackend.js'),
    geoservice = require('./services/GeoService.js'),
    config = require('./services/ConfigService.js'),
    state = require('./TircStore.js');

// tilanmuutos kuuntelija
$(document).on('statechange', function(event,eventAction, data){
    console.log('receiving event: '+eventAction);
    state.onstatechange(state[eventAction], data);
});

backend.connect(config.loadUser());
geoservice.init(function (location) {
    backend.sayWelcome(config.loadUser(), location, function () {
        geoservice.watch(function (locationUpdated) {
            backend.updateLocation(config.loadUser('taho'), locationUpdated);
        });
    });
});

