import React from 'react';

class PhantomRow extends React.Component {
  render(){
    let {nick,state, text} = this.props;

    var str = nick;
    var clazz = 'col-md-9 col-md-offset-3 ';
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

  shouldComponentUpdate(nextProps, nextState) { 
    return !_.isEqual(this.props, nextProps);
  }



}

export default PhantomRow;