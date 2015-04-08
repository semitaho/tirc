var Parser = (function(){ 

	var images = ['gif', 'jpg', 'jpeg', 'png','tiff', 'tif'];	
	return {
		parseNick : function(elem) {
			
			var tircNick = this.parseTircNick(elem);
			if (tircNick !== null){
				return tircNick;
			}
			var nick = elem.substring(elem.indexOf('<') + 1, elem.indexOf('>'));
			if (nick !== null && nick !== undefined && nick.length > 0)
				return nick;
			return null;
		},
		formatusers: function (users) {
			var arr = Object.keys(users).map(function (key) {
				return users[key]
			});
			arr.sort(function (a1, a2) {
				return a1.idleTime - a2.idleTime;
			});
			return arr;
		},
		parseTircNick : function(elem){
			var newElem = elem;
			var matchpattern = /.*tirc> (.*?) sanoo.*$/;
			if (!newElem.match(matchpattern)){
				return null;
			}
			var nickmatch = newElem.replace(/.*tirc> (.*?) sanoo.*$/, '$1');
			return nickmatch;
		},
		
		isComment : function(elem){
			var nick = this.parseNick(elem);
			return nick !== null && nick !== undefined;
		},
		
		  parseTime: function(elem){
	    	  var matcher = elem.match(/[0-9][0-9]:[0-9][0-9](:[0-9][0-9])?/g);
	    	  if (matcher && matcher[0]){
	    		  return matcher[0];
	    	  }
	    	  return '';
	      },
	   parseText : function(elem, nick){
	    	if (nick !== undefined && nick !== null){
	    		if (elem.indexOf(nick+' sanoo:') !== -1){
	    			var pattern = nick+ ' sanoo: ';
	    			return elem.substr(elem.indexOf(pattern)+pattern.length);
	    		} 	    		
	    		return elem.slice(elem.indexOf(nick)+nick.length+2);
	    	} 
	    	var time =  this.parseTime(elem);
	    	return elem.slice(elem.indexOf(time)+ time.length+2 );
	   },
	   
	   isPic : function(link){
	   	var found = false;
	   	$.each(images,function(index, ext){
	   		if (link.indexOf(ext) !== -1){
	   			found = true;
	   		}
	   	});
	   	return found;
	   }
	};
})();