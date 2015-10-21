var React = require('react/addons');
module.exports = React.createClass({

  render: function () {

    var clazz = "spinner fadein";
    if (this.props.fadeout && this.props.fadeout === true){
      clazz = "spinner fadeout";
    }
    return (<div className={clazz}>
      <h2>Loading tIrc...</h2>

    </div>)


  }

});