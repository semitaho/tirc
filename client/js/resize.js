var $ = require('jquery');
module.exports = (function () {

  var doScroll = function (index, interval) {

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


  var resize = function (lastHeight, interval, unmount) {
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
    console.log('action panel height', boxHeight);
    console.log('y', box.offset().top);
    let videoOuterHeight = videocontainer.outerHeight();
    if (unmount){
      videoOuterHeight = 0;
    }
    console.log('outer height', videoOuterHeight);

    var currentHeight = $(window).outerHeight();
    elem.css('height', currentHeight - startY - boxHeight- videoOuterHeight);
    scroll(lastHeight, interval);

  };

  $(window).resize(resize);


  return {
    resize: resize,
    scroll: scroll
  };
})();


