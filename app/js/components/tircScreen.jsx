import React, { useEffect, useRef, useState } from "react";
import Phantomrow from "./phantomrow.jsx";
import { useMessages, usePhantomMessages } from "../hooks/messaging.hook.js";
import Textrow from "./textrow.jsx";
const TircScreen = () => {
  const containerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const { messages } = useMessages();
  const { phantomMessages } = usePhantomMessages();

  // autoscroll
  useEffect(() => {
    // if (isAtBottom) return;
    const elem = containerRef.current;
    console.log("scroll height:" + elem.scrollHeight);
    elem.scrollTop = elem.scrollHeight;
  }, [messages.length, phantomMessages.length]);
  var dataall = messages; //this.props.connectdata.concat(this.props.currentdata);
  var id = 0;
  var classStr = "tirc_screen";
  var index = 0;
  var screenindex = "tirc_screen_" + index;
  var mappedTextrowData = dataall.map((item) => {
    id++;
    return <Textrow key={id} elem={item} />;
  });

  var mappedPhantomrowData = phantomMessages.map((item,index) => <Phantomrow {...item} />);
  let mappedData = mappedTextrowData.concat(mappedPhantomrowData);
  return (
    <div ref={containerRef} className={classStr} id={screenindex}>
      {mappedData}
    </div>
  );
};

export default TircScreen;
