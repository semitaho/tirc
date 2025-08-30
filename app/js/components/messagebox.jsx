import React, { useEffect, useRef, useState } from "react";

import { usePhantomMessages, sendMessage } from "../hooks/messaging.hook.js";
import ConfigService from "../services/ConfigService.js";
import useGPT from "../hooks/gpt.hook.js";

const MILLISECONDS_TO_TICK = 1000;
const MessageBox = (props) => {
  const { savePhantomMessage } = usePhantomMessages();

  const [typestate, setTypestate] = useState({
    time: new Date(),
    state: "idle",
  });

  const typestateRef = useRef(typestate);
  // keep the ref in sync with React state
  useEffect(() => {
    setRealtimeState(typestate.state);
  }, [typestate]);

  let id = null;
  const { prompt } = useGPT();
  const inputRef = useRef(null);

  function setRealtimeState(state) {
    typestateRef.current = {
      state,
      time: new Date(),


    }
  }
  function statechange(state) {
    const newState = { time: new Date(), state };
    var previousState = typestateRef.current?.state;
    setRealtimeState(state);
    if (state !== previousState) {
      setTypestate(newState);
      savePhantomMessage(newState.state, ConfigService.loadUser());
    }
  }

  function isFixing(event) {
    return event.which === 8 || event.which === 46;
  }
  function onstatetick() {
    const currentState = typestateRef.current; // 👈 always latest
    if (currentState.state === "typing" || currentState.state === "fixing") {
      var currentTime = new Date();
      var millisecondsDiff = currentTime.getTime() - typestateRef.current?.time.getTime();
      if (millisecondsDiff > MILLISECONDS_TO_TICK) {
        setTypestate({ time: new Date(), state: "idle" });
        savePhantomMessage("idle", ConfigService.loadUser());
      }
    }
  }

  function onPress(event) {
    event.preventDefault();
    if (event.which === 13) {
      if (event.target.value.indexOf("tirc") === 0) {
        // sayGpt(event.target.value);
      } else {
        say(event.target.value);
      }
      event.target.blur();
      inputRef.current.focus();
      clearText(event.target);
    } else if (isFixing(event)) {
      statechange("fixing");
    } else {
      statechange("typing");
    }
  }

  function onBlur(event) {
    statechange("idle");
  }
  function say(text) {
    var self = this;
    var selftext = text;

    sendMessage(ConfigService.loadUser(), "comment", text);
    statechange("idle");
  }

  function sayGpt(text) {
    prompt(text).then((response) => {
      if (response) {
        sendMessage("tirc-tekoäly", "comment", response);
      }
    });
  }

  function clearText(targetDOM) {
    targetDOM.value = "";
  }

  useEffect(() => {
    id = setInterval(onstatetick, 3000);
    inputRef?.current.focus();
    return () => {
      clearInterval(id);
      savePhantomMessage('idle', ConfigService.loadUser());

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
