var Resizer = (function(){
	
	var doScroll = function(index){
		var elem  =$('.tirc_screen')[index];
		elem.scrollTop = elem.scrollHeight;
	};
	var scroll = function(index){
		setTimeout(function(){
            doScroll(index);
        }, 500);
	};
	

	
	var resize = function(lastHeight){
		if (lastHeight === undefined || !_.isNumber(lastHeight)){
			lastHeight = TircState.getActiveIndex();
		}
		var elem  =$('#tirc_main_panel_middle_'+lastHeight);
		var tabpanel = $('#tab_panel_'+lastHeight);
		if (tabpanel.position() === null || tabpanel.position() == undefined){
			return;
		}
		var tabpanelY = tabpanel.position().top;
		var startY = tabpanelY + tabpanel.height();
		var pos = elem.position();
		elem.css('top', startY +'px');
		var box  =$('#action_panel_'+lastHeight);
		var currentHeight = $( window ).height();
		elem.css('bottom', (currentHeight-box.position().top)+'px');
		scroll(lastHeight);
	};
	
	$(window).resize(resize);

	return {
		resize: resize,
		scroll : scroll
	};
})();


