import MainPanel from "./mainpanel.jsx";
import Messagebox from "./messagebox.jsx";
import GeoService from "../services/GeoService.js";
import Spinner from "./spinner.jsx";
import TopicPanel from "./topicPanel.jsx";
import { shareVideo, receiveFrame } from "../actions/videoactions.js";
import {
  connectBackend,
  listenBackend,
  geocode,
  changeState,
  sendText,
  updateText,
  sayGoodbye,
  changeUser,
  loadUsers,
  toggleEmotion,
  scroll,
} from "../actions/tircactions.js";
import React, { useEffect } from "react";
import { receiveUsers } from "../actions/topicpanelactions.js";
import { useMessages } from "../hooks/messaging.hook.js";
import ConfigService from "../services/ConfigService.js";
const Tirc = (props) => {
  const { sendMessage } = useMessages();

  useEffect(() => {
    const handleBlur = () => {
    //  sendMessage(ConfigService.loadUser(), "quit", "");
    };
    window.addEventListener("blur", handleBlur);
  }, []);

  const topicpanel = {
    topic: "Testi",
    users: [],
    tircusers: [],
    userselect: {
      users: [],
      chosen: "",
    },
  };
  let { tabs, userselect, loading, active, dispatch } = props;
  if ( loading &&  loading === true) {
    return (
      <div className="col-md-12 col-xs-12 col-sm-12">
        <Spinner index={props.phraseindex} phrases={props.phrases} />
      </div>
    );
  }
  let isVisible = true;
  var actionpanelId = "action_panel_0";
  return (
    <div className="tirc_content">
      {loading && loading === true ? (
        <Spinner
          fadeout={true}
          index={props.phraseindex}
          phrases={props.phrases}
        />
      ) : (
        ""
      )}
      <TopicPanel
        {...topicpanel}
        changeUser={(nick) => dispatch(changeUser(nick))}
        receiveUsers={(users) => dispatch(receiveUsers(users))}
      />
      <MainPanel
        {...tabs}
        users={[]}
        tircusers={[]}
        userselect={userselect}
        connectdata={[]}
        currentdata={[]}
        activedata={[]}
        index={0}
        //  scroll={(isScrolling) => dispatch(scroll(isScrolling))}
        visible={isVisible}
        toggleEmotion={(textid, type) => dispatch(toggleEmotion(textid, type))}
      />

      <div className="tirc_action_panel row" id={actionpanelId}>
        <div className="col-md-12 col-sm-12 col-xs-12 full-width">
          <Messagebox
          
          />
        </div>
      </div>
    </div>
  );
};

export default Tirc;
