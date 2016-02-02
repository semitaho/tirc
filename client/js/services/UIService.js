const KEY = '65fac812c50542dfb026115c52cff16a';
$.embedly.defaults.key = KEY;
$.embedly.defaults.query = {
  chars: 400,
    autoplay: false
  };
const urlRe = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
class UIService {
  embedly(link, success) {
  }

  embedlyText(text, success) {
    var formattedText = text.replace(urlRe, function (url) {
        return '<a  href="' + url + '" target="_blank">' + url + '</a>';
      });
    var embeddedHTML = $('<span>' + formattedText + '</span>');
    $(embeddedHTML).embedly({
      done: function () {
        success(embeddedHTML.html());
      }
    });
  }

  calculateVideoHeight(){
    let elem = $('.tirc_main_panel_middle');
    return elem.outerHeight() / 2;
  }

  hasLink(text) {
    if (urlRe.test(text)) {
      return true;
    }
    return false;

  }
}

let uiService  = new UIService;
export default uiService;
