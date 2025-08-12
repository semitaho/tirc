const GeoService = (() => {
  var watchId = null;

  return {
    init: function () {

      var promise = new Promise(function (resolve, reject) {
        if (window.navigator.geolocation) {
          window.navigator.geolocation.getCurrentPosition(
            function (position) {
              resolve(position);
            }, function (error) {
              reject('Could not obtain geolocation due to', error);
            }, {
              enableHighAccuracy: true
            });
        } else {
          reject("Geolocation not available");
        }
      });
      return promise;
    },

    reverseGeocode(position){
      var geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude);
      return new Promise(function (resolve, reject) {
        geocoder.geocode(
          {
            'latLng': latlng,
            'language': 'fi'
          }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                var location = results[0].formatted_address;
                var locobject = {
                  lat: position.coords.latitude,
                  lon: position.coords.longitude,
                  location: location
                };
                resolve(locobject);
              }
            } else {
              reject('status not ok:' + status);
            }
          });
      });

    },

    unwatch: function () {
      if (watchId !== null) {
        window.navigator.geolocation.clearWatch(watchId);
      }
    },

    watch: function (successcallback) {
      watchId = window.navigator.geolocation.watchPosition(function (current) {
        console.log('location has changed...');
        currentPositionDone(current, successcallback);
      }, null, {enableHighAccuracy: true, maximumAge: 0});
    }
  }


});
export default GeoService;