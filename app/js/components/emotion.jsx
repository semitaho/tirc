import React from 'react';

class Emotion extends React.Component {

  render() {
    let itememo = '';
    let titletext = '';
    if (this.props.items && this.props.items.length > 0) {
      itememo = this.props.items.length;
      titletext = this.props.items.join(', ');
    }
    return <div className="emotion"><i title={titletext} onClick={this.props.toggleEmotion} className={this.props.classNames}/> <small className="emo_count">{itememo}</small></div>
  }
}

export default Emotion;