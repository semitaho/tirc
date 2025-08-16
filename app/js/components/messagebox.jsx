import React, { useEffect, useState } from "react";

import UIService from "../services/UIService.js";
import { useMessages, sendMessage } from "../hooks/messaging.hook.js";
const MessageBox = (props) => {

    let id = null;
    const [typestate, setTypestate] = useState(
      { time: new Date(), state: "connected" }
    );
    function onstateupdate() {
      if (typestate.state === "typing" || typestate.state === "fixing") {
        var currentTime = new Date();
        var millisecondsDiff =
          currentTime.getTime() - typestate.time.getTime();
        if (millisecondsDiff > 1500) {
          setTypestate({time: new Date(), state: "idle"});
        }
      } else if (typestate.state === "connected") {
        var currentTime = new Date();
        var millisecondsDiff =
          currentTime.getTime() - typestate.time.getTime();
        if (millisecondsDiff > 60000) {
          setTypestate({ time: new Date(), state: "idle" } );
        }
      }
    }

    function onPress(event) {
      event.preventDefault();
      if (event.which === 13) {
        say(event.target.value);
        event.target.blur();
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
        sendMessage('Andon', 'comment', text);
       // this.props.sendText(selftext, selftext);
      }
      statechange("idle");
    }

    function clearText(targetDOM) {
      targetDOM.value = "";
    }

    useEffect(() => {
      id = setInterval(onstateupdate, 500);
      console.log("MessageBox: componentDidMount");
      return () => {
        console.log("MessageBox: componentWillUnmount");
        clearInterval(id);
      };
    });

    return (
      <input
        type="text"
        name="text"
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
