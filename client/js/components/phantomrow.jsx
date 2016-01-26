import React from 'react';

class PhantomRow extends React.Component {
  render(){
    let {nick,state} = this.props;

    var str = nick;
    var clazz = 'col-md-12 ';
    if (state === 'fixing'){
      str += ' korjaa...';
      clazz += 'fixing'
    } else {
      clazz += 'typing';
      str += ' kirjoittaa...';
    }

    return (<div className="row">
        <div className={clazz}>{str}</div></div>);
  }
}

export default PhantomRow;