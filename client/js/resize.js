var $ = require('jquery');
module.exports = (function () {


  var _isScrollActivated = function(domNode){
    let elem = $(domNode);
    if(elem.scrollTop() + elem.height() >= elem[0].scrollHeight) {
       return false;
    }
    return true;
  };
  var doScroll = function (index, interval) {
    console.log('do scroll');

    var elem = $('#tirc_screen_' + index);

    var height = $('#tirc_screen_' + index).height();
    var scrollHeight = elem.prop('scrollHeight');

    if (!interval) {
      console.log('no intervall...');
      elem.scrollTop(scrollHeight)
    } else {
      setTimeout(function () {
        elem = $('#tirc_screen_' + index);
        scrollHeight = elem.prop('scrollHeight');
        elem.scrollTop(scrollHeight);
      }, interval);

    }


  };
  var scroll = function (index, intervall) {
    doScroll(index, intervall);
  };


  var resize = function (lastHeight, interval) {
    console.log('do resize');

    if (lastHeight === undefined || isNaN(lastHeight)) {
      lastHeight = 0;
    }
    var elem = $('#tirc_screen_' + lastHeight);
    var tircnicks = $('.topic-panel');
    if (tircnicks.position() === null || tircnicks.position() == undefined) {
      return;
    }
    let videocontainer = $('#video_container');
    var startY = tircnicks.offset().top + tircnicks.outerHeight();

    var pos = elem.position();
    var box = $('#action_panel_' + lastHeight);
    var boxHeight = box.outerHeight();
    var currentHeight = $(window).outerHeight();
    elem.css('height', currentHeight - startY - boxHeight- 0);
    scroll(lastHeight, interval);

  };

  $(window).resize(() => {
    resize(0);
  });


  return {
    resize: resize,
    scroll: scroll,
    isScrollActivated: _isScrollActivated
  };
})();


