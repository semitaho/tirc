describe('testing tab header', function () {
  var jsFilesPath = '../../../js';
  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons'),
      TestUtils = React.addons.TestUtils;
  });


  it('tests setting active tab class', function () {
    var tabs = [{name: 'mcw'}, {name: 'bb'}];
    var selected = 'bb';
    var Tabheader = require(jsFilesPath + '/components/tabheader.jsx');
    var renderedTabs = TestUtils.renderIntoDocument(<Tabheader items={tabs} selected={selected}/>);
    var activeRenderedTab = TestUtils.findRenderedDOMComponentWithClass(renderedTabs, 'active');
    expect(activeRenderedTab).toBeTruthy();
    expect(activeRenderedTab.getDOMNode().textContent).toEqual('bb');
  });

  it('setting class for unread and non-active', function(){
    var tabs = [{name: 'mcw', unread: 3}, {name: 'bb', unread: 0}, {name: 'melfstro', unread: 2}];
    var selected = 'bb';
    var Tabheader = require(jsFilesPath + '/components/tabheader.jsx');
    var renderedTabs = TestUtils.renderIntoDocument(<Tabheader items={tabs} selected={selected}/>);
    var renderedDOMs = TestUtils.scryRenderedDOMComponentsWithClass(renderedTabs, "tab");
    expect(renderedDOMs.length).toBe(3);
    var renderedDOMsWithUnread = TestUtils.scryRenderedDOMComponentsWithClass(renderedTabs, "unread");
    expect(renderedDOMsWithUnread.length).toBe(2);


  });
});