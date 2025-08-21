import TircScreen from "./tircScreen.jsx";

const MainPanel = (props) => {
  props.tircusers.sort((user1, user2) => user2.time - user1.time);
  var index = props.index;
  var idindex = "tirc_main_panel_middle_0";
  var clazz = "";
  let columns = "col-md-12 tirc_main panel-default full-width";

  return (
    <div className="tirc_main_panel_middle  row" id={idindex}>
    
        <TircScreen
          scrolling={props.scrolling}
          scroll={props.scroll}
          toggleEmotion={props.toggleEmotion}
          index={index}
          connectdata={props.connectdata}
          currentdata={props.currentdata}
          activedata={props.activedata}
        />
    </div>
  );
};

export default MainPanel;
