var React = require('react/addons');
class Spinner extends React.Component {

  constructor(){
    super();
    this.texts = ['Kisu harjoittaa', 'ät kynae 11D', 'Vain yksi tietää totuuden', '!sillöM', '<melfstro> 16,7 km', 'Menöö muttei tuloo', 'Inex Andons saapuu paikalle', 'Pätää oottaa vielä jonkun aikaa'];
  }
  componentWillMount(){
    this.setState({index: Math.floor(Math.random() * this.texts.length)});
  }
  render() {

    var clazz = "center-block spinner fadein";
    if (this.props.fadeout && this.props.fadeout === true){
      clazz = "center-block spinner fadeout";
    }
    return (<div className={clazz}>
      <h2>Loading tIrc...</h2>
      <small className="text-center">{this.texts[this.state.index]}</small>

    </div>)


  }

}

export default Spinner;
