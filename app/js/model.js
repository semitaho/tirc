angular.module('tirc-models',[]).
	factory('tircLogs', function(){
		
		return {
			
			KEY_PREFIX : 'tirclogs_',
			
			isWebStorageSupported: function(){
				return typeof(Storage) !== "undefined";
			},
			
			getLogs : function(day){
				if (this.isWebStorageSupported() && localStorage.getItem(this.KEY_PREFIX+day) !== null){
					return  JSON.parse(localStorage.getItem(this.KEY_PREFIX+day));
				}
				return null;
			},
			
			saveLogs : function(day, logs){
				if (this.isWebStorageSupported()){
					localStorage.setItem(this.KEY_PREFIX+day,JSON.stringify(logs));
				}
			}
		};
		
		
	});