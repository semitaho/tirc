angular.module('tirc-filters',[]).
	filter('sortNicks', function(){
		return function(input){
			var array = [];
		    for(var objectKey in input) {
		        array.push(input[objectKey]);
		    }
		    array.sort(function(a,b){
		    	return a.idleTime - b.idleTime;
		    });
		    
			return array;
		};
		
	}).filter('format', function($sce){
		
		String.prototype.replaceAll = function (find, replace) {
		    var str = this;
		    return str.replace(new RegExp(find, 'g'), replace);
		};
		        
		
		var formatFilters = [ 
		                     

		      function(input){
		    	  return input.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
		       },
		      
		      function(input){
		    	  return input.replaceAll('moi', '<img src="images/moi.gif" height="20" width="39" />');
		      },
		      function(input){
		    	  return input.replaceAll(':D', '<img src="images/laugh.GIF" height="20" width="20" />');
		      },
		      
		           
		                 
		      function(input){
		    	  return input.replace(/(http[s]{0,1}:\/\/[A-zA-Z0-9\-\.]+[a-zA-Z]{2,3}(\S*)?)/, '<a href="$1" target="_blank>$1</a>');
		      }
		];
		
		return function(input){
			var text = input;
			for (var i = 0; i < formatFilters.length; i++){
				var filterFunction = formatFilters[i];
				text = filterFunction(text);
				
			}
			return text;
		};
		
	} ).filter('toTimeunit', function(){
		
		
		var formatToMinutes = function(time){
			
			// Hours, minutes and seconds
			var hrs = ~~(time / 3600);
			var mins = ~~((time % 3600) / 60);
			var secs = time % 60;

			// Output like "1:01" or "4:03:59" or "123:03:59"
			ret = "";

			if (hrs > 0)
			    ret += "" + hrs + "h " + (mins < 10 ? "0" : "");

			ret += "" + mins + " min " + (secs < 10 ? "0" : "");
			ret += "" + secs + " s";			

			return ret;
		};
		
		return function(input){
			return formatToMinutes(input);
		};
	})
	
	;