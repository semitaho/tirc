import React, { useEffect, useRef, useState } from "react";

import UIService from "../services/UIService.js";
import { useMessages, sendMessage } from "../hooks/messaging.hook.js";
import ConfigService from "../services/ConfigService.js";
import useGPT from "../hooks/gpt.hook.js";
const MessageBox = (props) => {
  let id = null;
  const { prompt } = useGPT();
  const inputRef = useRef(null);

  const [typestate, setTypestate] = useState({
    time: new Date(),
    state: "connected",
  });
  function onstateupdate() {
    if (typestate.state === "typing" || typestate.state === "fixing") {
      var currentTime = new Date();
      var millisecondsDiff = currentTime.getTime() - typestate.time.getTime();
      if (millisecondsDiff > 1500) {
        setTypestate({ time: new Date(), state: "idle" });
      }
    } else if (typestate.state === "connected") {
      var currentTime = new Date();
      var millisecondsDiff = currentTime.getTime() - typestate.time.getTime();
      if (millisecondsDiff > 60000) {
        setTypestate({ time: new Date(), state: "idle" });
      }
    }
  }

  function onPress(event) {
    event.preventDefault();
    if (event.which === 13) {
      if (event.target.value.indexOf("tirc") === 0) {
        sayGpt(event.target.value);
      }
      {
        say(event.target.value);
      }
      event.target.blur();
      inputRef.current.focus();
      clearText(event.target);
    } else if (event.which === 8 || event.which === 46) {
      statechange("fixing");
    } else {
      statechange("typing");
    }
  }

  function statechange(state) {
    var previousState = typestate.state;
    /*
      this.typestate = { time: new Date(), state };
      if (state !== previousState) {
        this.props.changeState(state);
      }
        */
  }
  function onBlur(event) {
    statechange("idle");
  }
  function say(text) {
    var self = this;
    var selftext = text;
    if (UIService.hasLink(text)) {
      UIService.embedlyText(text, (done) => {
        // this.props.sendText(selftext, done);
      });
    } else {
      sendMessage(ConfigService.loadUser(), "comment", text);
      // this.props.sendText(selftext, selftext);
    }
    statechange("idle");
  }

  function sayGpt(text) {
    prompt(text).then((response) => {
      console.log("response", response);
      if (response) {
        sendMessage("tirc-tekoäly", "comment", response);
      }
    });
  }

  function clearText(targetDOM) {
    targetDOM.value = "";
  }

  useEffect(() => {
    id = setInterval(onstateupdate, 500);
    inputRef?.current.focus();
    return () => {
      console.log("MessageBox: componentWillUnmount");
      clearInterval(id);
    };
  }, []);

  return (
    <input
      type="text"
      name="text"
      ref={inputRef}
      defaultValue=""
      onBlur={onBlur}
      id="textline"
      className="input-lg form-control message_box"
      placeholder="say something..."
      onKeyUp={onPress}
    ></input>
  );
};

export default MessageBox;
