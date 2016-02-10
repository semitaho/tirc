import React from 'react';

class Emotion extends React.Component {

  render() {
    let itememo = '';
    if (this.props.items && this.props.items.length > 0) {
      itememo = this.props.items.length;
    }
    return <div className="emotion"><i onClick={this.props.toggleEmotion} className={this.props.classNames}/> <small className="emo_count">{itememo}</small></div>
  }
}

export default Emotion;