
import React from 'react';
import Phantomrow from './phantomrow.jsx';
import { useMessages } from '../hooks/messaging.hook.js';
import Textrow from './textrow.jsx';
const TircScreen = () => {

   const { latestMessages } =   useMessages();
   console.log("TircScreen latestMessages:", latestMessages);
    var dataall = latestMessages; //this.props.connectdata.concat(this.props.currentdata);
    var id = 0;
    var classStr = 'tirc_screen';
    var index = 0;
    var screenindex = 'tirc_screen_' + index;
    var mappedTextrowData = dataall.map(item => {
      id++;
      return ( <Textrow key={id} elem={item}   />)
    });

    var mappedPhantomrowData = []; //this.props.activedata.map((item,index) => <Phantomrow {...item} />);
    let mappedData = mappedTextrowData.concat(mappedPhantomrowData);
    return <div  className={classStr} id={screenindex}>{mappedData}</div>

  }

export default TircScreen;

