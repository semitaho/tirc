var React = require('react/addons');
module.exports = React.createClass({


  selectTab: function (nick) {
    console.log('selecting tab: ' + nick);
    $(document).trigger('statechange', ['selecttab', nick]);
  },

  render: function () {
    var items = this.props.items;
    var active = this.props.selected;

    var that = this;
    var itemFunction = function (item) {
      var badgeStr = '';
      var className = 'tab btn';
      if (item.name === active) {
        className += ' active';
      }
      if (item.unread && item.unread > 0){
      badgeStr = <span className="badge">{item.unread}</span>
      }

      return (
        <a className={className} onClick={that.selectTab.bind(that, item.name)}
           href="#">{item.name} {badgeStr}</a>
      )
    };

    var header = items.map(itemFunction);
    return <div className="tabs col-md-11 col-xs-9 col-sm-9 btn-group">{header}</div>;

  }
});
