module.exports  = (function(){
	var watchId = null;
	var currentPositionDone = function(position, successcallback, error){
		var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(
			position.coords.latitude,
		    position.coords.longitude);
		geocoder.geocode( 
			{'latLng' : latlng,
			'language' : 'fi'
			 },function(results,status) {
			 	if (status == google.maps.GeocoderStatus.OK) {
			 		if (results[0]) {
			 			var location = results[0].formatted_address;
			 			var locobject = {lat: position.coords.latitude, 
			 				lon: position.coords.longitude, 
			 				location: location};
			 				successcallback(locobject);
			 			}
			 		} else {
			 			error();
			 		}
			 	});
	};
	
	return {
		init: function(successcallback, error){
			if (window.navigator.geolocation){
				window.navigator.geolocation.getCurrentPosition(
					function(position) {
						currentPositionDone(position,successcallback,error);
		              }, error, {
		                 enableHighAccuracy : true
		              });
		   } else {
			   error();
		   }
			
		}, 

		unwatch : function(){
			if (watchId !== null){
				window.navigator.geolocation.clearWatch(watchId);
			}
		},

		watch: function(successcallback){
			watchId =  window.navigator.geolocation.watchPosition(function(current){
				console.log('location has changed...');
				currentPositionDone(current,successcallback);
			}, null, {enableHighAccuracy : true, maximumAge:0});
		}
	}
	

	
})();