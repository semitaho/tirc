module.exports  =  (function(){
	
	var focus = true;
	window.onfocus = function () { 
		  focus = true; 
		}; 

		window.onblur = function () { 
			console.log('not focuses');
	  	focus = false; 
		}; 
	
// check for notifications support
// you can omit the 'window' keyword
	var notification = window.Notification || window.mozNotification || window.webkitNotification;

	if (notification) {
	  console.log("Notifications are supported!");
	//  var not = new Notification('aah', {body: 'ei näin'});
	// 0 means we have permission to display notifications
	//	if (notification.checkPermission() == 0) {
	//	    notification.createNotification();
	 //   } else {
	       notification.requestPermission();
	  //   }
	}
	else {
	  console.log("Notifications are not supported for this Browser/OS version yet.");
	}
	
	
	return {
		isFocus : function(){
			return focus;
		},
		
		notify : function(title, body, time){
			new Notification(title+ ' - ' +time, {body: body});
		}
		
	}
	
	
	
	
})();