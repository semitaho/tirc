var Resizer = (function(){
	
	var doScroll = function(){
		var elem  =$('.tirc_screen')[0];
		console.log('scroll height: '+elem.scrollHeight);
		elem.scrollTop = elem.scrollHeight;
	};
	var scroll = function(last){
		var elem  =$('.tirc_screen');
		doScroll();    	
	};
	

	
	var resize = function(lastHeight){
		var elem  =$('.tirc_main_panel_middle');
		var tabpanel = $('.tab_panel');
		if (tabpanel.position() === null || tabpanel.position() == undefined){
			return;
		}
		var tabpanelY = tabpanel.position().top;
		var startY = tabpanelY + tabpanel.height();
  
		var pos = elem.position();
		elem.css('top', startY +'px');
		var box  =$('#action_panel');
		var currentHeight = $( window ).height();
		elem.css('bottom', (currentHeight-box.position().top)+'px');
		scroll(lastHeight);
	};
	
	$(window).resize(resize);

	return {
		resize: resize,
		scroll : doScroll
	};
})();


