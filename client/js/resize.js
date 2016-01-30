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


  var resize = function (lastHeight, interval) {
    if (lastHeight === undefined || isNaN(lastHeight)) {
      lastHeight = 0;
    }
    var elem = $('#tirc_screen_' + lastHeight);
    var tircnicks = $('.topic-panel');
    if (tircnicks.position() === null || tircnicks.position() == undefined) {
      return;
    }
    var startY = tircnicks.offset().top + tircnicks.outerHeight();
    console.log('tircnicks height', tircnicks.height());
    console.log('tircnicks outer height', tircnicks.outerHeight());

    var pos = elem.position();
    var box = $('#action_panel_' + lastHeight);
    var boxHeight = box.outerHeight();
    console.log('action panel height', boxHeight);
    console.log('y', box.offset().top);

    var currentHeight = $(window).outerHeight();
    elem.css('height', currentHeight - startY - boxHeight);
    scroll(lastHeight, interval);

  };

  $(window).resize(resize);


  return {
    resize: resize,
    scroll: scroll
  };
})();


