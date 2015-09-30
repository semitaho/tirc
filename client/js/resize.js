var $ = require('jquery');
module.exports = (function () {

  var doScroll = function (index, interval) {
    var elem = $('#tirc_screen_' + index);
    elem.scroll(function (ee) {

    });
    var height = $('#tirc_screen_' + index).height();
    var scrollHeight = elem.prop('scrollHeight');

    if (!interval) {
      elem.scrollTop(scrollHeight);
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
    if (lastHeight === undefined || !_.isNumber(lastHeight)) {
      lastHeight = 0;
    }
    var elem = $('#tirc_main_panel_middle_' + lastHeight);
    var tabpanel = $('#tab_panel_' + lastHeight);
    if (tabpanel.position() === null || tabpanel.position() == undefined) {
      return;
    }
    var tabpanelY = tabpanel.position().top;
    var startY = tabpanelY + tabpanel.height();
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


