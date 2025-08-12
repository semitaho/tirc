
import React from 'react';
import Phantomrow from './phantomrow.jsx';
class TircScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.render = this.render.bind(this);
  }

  render() {
    var dataall = this.props.connectdata.concat(this.props.currentdata);
    var id = 0;
    var classStr = 'tirc_screen';
    var index = 0;
    var screenindex = 'tirc_screen_' + index;
    var mappedTextrowData = dataall.map(item => {
      id++;
      return ( <Textrow key={id} elem={item} toggleEmotion={this.props.toggleEmotion}  />)
    });

    var mappedPhantomrowData = this.props.activedata.map((item,index) => <Phantomrow {...item} />);
    let mappedData = mappedTextrowData.concat(mappedPhantomrowData);
    return <div  className={classStr} id={screenindex}>{mappedData}</div>

  }

  componentDidMount() {
    console.log('TircScreen: didMount');
    //Resizer.resize(0, 400);
  }
  componentDidUpdate(){
   // Resizer.resize(0,600);
  }
  

}
export default TircScreen;

