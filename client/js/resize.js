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
    var tircnicks = $('#tirc_nicks');
    if (tircnicks.position() === null || tircnicks.position() == undefined) {
      return;
    }
    var startY = tircnicks.offset().top + tircnicks.height();
    console.log('y', startY);

    var pos = elem.position();
    var box = $('#action_panel_' + lastHeight);
    var boxHeight = box.height();
    var currentHeight = $(window).height();
    elem.css('height', currentHeight - startY - boxHeight);
    scroll(lastHeight, interval);

  };

  $(window).resize(resize);


  return {
    resize: resize,
    scroll: scroll
  };
})();


