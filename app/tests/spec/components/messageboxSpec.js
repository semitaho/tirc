describe('messagebox input tests', function () {
  var jsFilesPath = '../../../js';

  var React, TestUtils, uiService;

  beforeEach(function () {
    React = require('react/addons'),
      TestUtils = React.addons.TestUtils,
      uiService = require(jsFilesPath+'/services/UIService.js');
  });

  it('tests rendering messagebox and initial state', function () {
    var Messagebox = require('../../../js/components/messagebox.jsx');
    var renderedbox = TestUtils.renderIntoDocument(<Messagebox />);
    expect(TestUtils.isCompositeComponent(renderedbox)).toBeTruthy();
    expect(renderedbox.typestate.state).toEqual('connected');
  });

  it('wait messagebox state to idle...', function () {
    var Messagebox = require('../../../js/components/messagebox.jsx');
    var renderedbox = TestUtils.renderIntoDocument(<Messagebox />);
    expect(renderedbox.typestate.state).toEqual('connected');
    // sets time so that state should come to idle
    var statetime = new Date();
    statetime.setHours(statetime.getHours() - 1);
    renderedbox.typestate.time = statetime;
    renderedbox.onstateupdate();
    expect(renderedbox.typestate.state).toEqual('idle');
  });

  it('sets messagebox state to typing...', function () {
    var Messagebox = require('../../../js/components/messagebox.jsx');
    var renderedbox = TestUtils.renderIntoDocument(<Messagebox />);
    var domInput = TestUtils.findRenderedDOMComponentWithTag(renderedbox, "input");
    TestUtils.Simulate.change(domInput, {target: {value: 'uusi teksti'}});

  });

  it('posts message with messagebox and verify that backend has been called', function () {
    var configService = require('../../../js/services/ConfigService.js'),
      TircBackend = require('../../../js/services/TircBackend.js');
    configService.loadUser = jest.genMockFunction();

    var Messagebox = require('../../../js/components/messagebox.jsx');
    var mockFunctionBackend = jest.genMockFunction();
    var mockFunctionStateChange = jest.genMockFunction();

    uiService.fireBackendCall = mockFunctionBackend;
    uiService.fireStateChange =mockFunctionStateChange;

    var renderedbox = TestUtils.renderIntoDocument(<Messagebox text="kukkaa kakassa"/>);
    var domInput = TestUtils.findRenderedDOMComponentWithTag(renderedbox, "input");
    TestUtils.Simulate.keyUp(domInput, {which: 13});
    expect(mockFunctionBackend).toBeCalled();
    expect(mockFunctionStateChange).toBeCalled();

  });
});
