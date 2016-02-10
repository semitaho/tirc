import React from 'react';

class Emotion extends React.Component{

  render(){
    return <div className="emotion"><i onClick={this.props.toggleEmotion} className={this.props.classNames} /></div>
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }


}

export default Emotion;