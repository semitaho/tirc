describe('topic panel with text', function () {
  var React, TestUtils;
  beforeEach(function(){
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });


  var Topicpanel = require('../../../js/components/topicPanel.jsx');
  var index="3";

  it('tests showing topic panal', function () {
    // render topicPanel
    var renderedPanel = TestUtils.renderIntoDocument(<Topicpanel topic="jouni tulee" index="3" />);
    var renderedTopicpanel = TestUtils.findRenderedDOMComponentWithClass(renderedPanel, 'tab_panel');
    expect(renderedTopicpanel).not.toBeNull();
    expect(renderedTopicpanel.getDOMNode().textContent).toEqual('jouni tulee');
    expect(renderedTopicpanel.getDOMNode().id).toEqual('tab_panel_3');
  });

  it('tests rendering html inside...', function(){
    // render topicPanel
    var renderedPanel = TestUtils.renderIntoDocument(<Topicpanel topic="<b>pahapaha</b>" index="3" />);
    var renderedTopicpanel = TestUtils.findRenderedDOMComponentWithClass(renderedPanel, 'tab_panel');
    expect(renderedTopicpanel.getDOMNode().textContent).toEqual('<b>pahapaha</b>');


  });


});
