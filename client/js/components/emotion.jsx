import React from 'react';

class Emotion extends React.Component{

  render(){
    return <div className="emotion"><i  className={this.props.classNames} /></div>
  }

}

export default Emotion;