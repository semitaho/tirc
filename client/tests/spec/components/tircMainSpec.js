$ = require('jquery');

var jsFilesPath = '../../../js',
  tircBackend = require(jsFilesPath + '/services/TircBackend.js');
var React, TestUtils;
window.localStorage = {getItem: jest.genMockFunction()};
//jest.mock(jsFilesPath+'/resize.js');


describe('tirc main component tests', function () {

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    var uiService = require(jsFilesPath+'/services/UIService.js');
    uiService.embedly = jest.genMockFunction().mockImplementation(function(param, done){
      done();
    });
  });
  it('should render normal page with minimum data', function () {

    var Tirc = require(jsFilesPath + '/components/Tirc.jsx');
    var mindata = {
      users: ['markku', 'taho'], chosen: 'taho', tabs: [{
        mainpanel: {
          topic: 'hei sun heiluvilles', connectdata: [], currentdata: [{
            time: '23:31:38',
            type: 'welcome',
            nick: 'mcw',
            line: '(Chrome, Itätuulentie, 02100 Espoo, Suomi) <a href="http://maps.googleapis.com/maps/api/staticmap?center=60.1743894,24.8073555&zoom=13&size=1280x250&markers=color:orange%7Clabel:T%7C60.1743894,24.8073555" target="_blank">Sijainti</a>',
            time: '13:11:21',
            type: 'comment',
            nick: 'taho',
            line: 'no vaikka tää: <a href="http://i.imgur.com/bMLx74p.jpg?1" target="_blank">linkki</a>'
          }], users: [], tircusers: []
        }
      }], active: '#test1', mainpanel: {topic: 'hei sun heiluvilles'}
    };
    var renderedPanel = TestUtils.renderIntoDocument(<Tirc data={mindata}/>);

    var renderedTopicpanel = TestUtils.findRenderedDOMComponentWithClass(renderedPanel, 'tab_panel');
    expect(renderedTopicpanel.getDOMNode().textContent).toEqual('hei sun heiluvilles');

    var renderedNickPanel  =TestUtils.findRenderedDOMComponentWithClass(renderedPanel, "tirc_info_panel");
    expect(TestUtils.isCompositeComponent(renderedNickPanel)).toBeTruthy();

    // user select
    var renderedUserselectPanel = TestUtils.findRenderedDOMComponentWithClass(renderedPanel, 'cell');
    expect(TestUtils.isCompositeComponent(renderedUserselectPanel)).toBeTruthy();
    var renderedDOMs = TestUtils.scryRenderedDOMComponentsWithTag(renderedUserselectPanel, "option");
    expect(renderedDOMs.length).toBe(2);
    expect(renderedDOMs[0].getDOMNode().textContent).toEqual('markku');
    expect(renderedDOMs[1].getDOMNode().textContent).toEqual('taho');






  })

});
