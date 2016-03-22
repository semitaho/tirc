var React = require('react/addons');
class Spinner extends React.Component {

  constructor() {
    super();
  }

  render() {
    var clazz = "center-block spinner fadein";
    if (this.props.fadeout && this.props.fadeout === true) {
      clazz = "center-block spinner fadeout";
    }
    return (<div className={clazz}>
      <h2>Loading tIrc...</h2>
      {this.props.phrases.length > 0 ? <small className="text-center">{this.props.phrases[this.props.index]}</small> : ''}
    </div>)


  }

}

export default Spinner;
