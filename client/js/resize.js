var $ = require('jquery');
module.exports = (function () {

  var doScroll = function (index) {
    console.log('do scroll');
    var elem = $('#tirc_screen_'+index);
    var height = $('#tirc_screen_'+index).height();
    console.log('elem height', height);
    console.log('scrolltop', elem.scrollTop());
    var scrollHeight = elem.prop('scrollHeight')
    console.log('scrollheight', scrollHeight);
    console.log('outerheight', elem.outerHeight());

    if (scrollHeight - elem.scrollTop() === elem.outerHeight() || elem.scrollTop() === 0){
      console.log('go bottom');
      elem.scrollTop(scrollHeight);
      }



  };
  var scroll = function (index) {
    setTimeout(function () {
      doScroll(index);
    }, 500);
  };


  var resize = function (lastHeight) {
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
    scroll(lastHeight);
  };

  $(window).resize(resize);

  $(window).scroll(function () {
    console.log('someone is scrolling...');

  });


  return {
    resize: resize,
    scroll: scroll
  };
})();


