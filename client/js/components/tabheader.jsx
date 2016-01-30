var React = require('react/addons');
module.exports = React.createClass({


  selectTab: function (nick) {
    console.log('selecting tab: ' + nick);
    $(document).trigger('statechange', ['selecttab', nick]);
  },

  render: function () {
    let badgeStr = '';
    let className = 'tab btn active';
    return (<div className="tabs col-md-11 col-xs-9 col-sm-9 btn-group">
                <a className={className} href="#">{this.props.name}</a>
            </div>);

  }
});
