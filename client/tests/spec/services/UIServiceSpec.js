describe('UIService tests', function () {
  var jsFilesPath = '../../../js', uiService;

  beforeEach(function () {
    uiService = require(jsFilesPath + '/services/UIService.js');

  });

  it('test haslink function with different vals', function () {


    var commentArray = ['hei tsiikaa tää mcw http://www.pesis.fi', 'nojjoo http://www.paska.fi ja https://www.imnfgr.a/jrrtr']
    commentArray.forEach(function(comment){
      expect(uiService.hasLink(comment)).toBeTruthy();

    });

  });


});
