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
import React from "react";
import { receiveUsers } from "../actions/topicpanelactions.js";
class Tirc extends React.Component {
  constructor() {
    super();
  }

  destroy() {
    //GeoService.unwatch();
    //this.props.dispatch(sayGoodbye(this.props.userselect.chosen));
  }

  render() {
    const topicpanel = {
      topic: 'Testi',
      users: [],
      tircusers: [],
      userselect: {
        users: [],
        chosen: ''
      }

    };
    let { tabs, userselect, loading, active, dispatch } =
      this.props;
    if (this.props.loading && this.props.loading === true) {
      return (
        <div className="col-md-12 col-xs-12 col-sm-12">
          <Spinner
            index={this.props.phraseindex}
            phrases={this.props.phrases}
          />
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
            index={this.props.phraseindex}
            phrases={this.props.phrases}
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
            toggleEmotion={(textid, type) =>
              dispatch(toggleEmotion(textid, type))
            }
          />

          <div className="tirc_action_panel row" id={actionpanelId}>
            <div className="col-md-12 col-sm-12 col-xs-12 full-width">
              <Messagebox
                updateText={(text) => dispatch(updateText(text))}
                sendText={(text, formattedtext) =>
                  dispatch(
                    sendText(this.props.userselect.chosen, text, formattedtext)
                  )
                }
                changeState={(newstate, text) =>
                  dispatch(
                    changeState(this.props.userselect.chosen, newstate, text)
                  )
                }
              />
            </div>
          </div>
        </div>
    );
  }

  componentDidMount() {
    let dispatch = this.props.dispatch;
    $(window).unload(() => this.destroy());
    const onmessage = (event) => {
      dispatch(receiveFrame(event.data));
    };
    // this.ws = new WebSocket("ws://" + location.hostname + ":8880/streaming");
    // this.ws.onmessage = onmessage;
    /*
    dispatch(loadUsers()).then((data) => {
      dispatch(geocode(this.props.userselect.chosen));

      dispatch(connectBackend(this.props.userselect.chosen)).then(
        (backenddata) => {
          dispatch(listenBackend(backenddata.id, this.props.userselect.chosen));
        }
      );
      
    });
    */
  }
}

function select(state) {
  return {
    userselect: state.topicpanel.userselect,
    data: state.data,
    topicpanel: {
      userselect: state.topicpanel.userselect,
      users: state.topicpanel.users,
      tircusers: state.topicpanel.tircusers,
      topic: state.topicpanel.topic,
    },
    tabs: state.tabs,
    loading: state.loading,
  };
}

export default Tirc;
