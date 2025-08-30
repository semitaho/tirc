import Config from "../services/ConfigService.js";
import React from "react";
import Emotion from "./emotion.jsx";
import useUi from "../hooks/ui.hook.js";
class Textrow extends React.Component {
  getClassName(text) {
    if (this.isJoinOrPart(text)) {
      return "joinOrPart";
    }
    return "";
  }

  isJoinOrPart(input) {
    return (
      input.indexOf("has joined #") !== -1 || input.indexOf("has left #") !== -1
    );
  }

  isQuit(input) {
    return input.indexOf("has quit ") !== -1;
  }

  isMePart(input) {
    return (
      input.indexOf(" * ") !== -1 &&
      input.indexOf(" has ") === -1 &&
      input.indexOf("<") === -1 &&
      input.indexOf(">") === -1
    );
  }

  isActionPart(input) {
    return input.indexOf("is known as") !== -1;
  }

  parseTime(elem) {
    return elem.match(/[0-9][0-9]:[0-9][0-9](:[0-9][0-9])?/g)[0];
  }

  format(parsedText) {
    var ytre =
      /(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/gi;
    var matchArray = parsedText.match(ytre);
    if (matchArray) {
      var that = this;
      $(matchArray).each(function (index, match) {
        if (Parser.isPic(match)) {
          var imglink = that.formatImage(match);
          parsedText = parsedText.replace(match, imglink);
        } else {
          var link = that.formatLink(match);
          parsedText = parsedText.replace(match, link);
        }
      });
    }
    return parsedText;
  }

  formatImage(match) {
    var imglink =
      '<a href="' +
      match +
      '" target="_blank"><img src="' +
      match +
      '" title="' +
      match +
      '" /></a>';
    return imglink;
  }

  formatLink(match) {
    var link =
      '<a href="' +
      match +
      '" target="_blank">' +
      match +
      '</a><div class="selector-wrapper"></div> ';
    return link;
  }

  generateEmotionStyle(likes, dislikes) {
    var styleSize = 0;
    if (likes && likes.length > 0) {
      styleSize += likes.length * 10;
    }
    if (dislikes && dislikes.length > 0) {
      styleSize -= dislikes.length * 10;
    }
    return "size-" + (100 + styleSize);
  }

  handleText(line) {
    if (line.indexOf("lol") > -1) {
      let replaced =
        ' <span class="icon" style="background-position: 65% 42.5%;"></span> ';
      let newLine = line.replace("lol", replaced);
      return newLine;
    }
    let newText = line;
    return newText;
  }

  rendercomment(item, t, em) {
    var textrowstyle = "row comment textrow";
    if (item.nick === Config.loadUser("taho")) {
      textrowstyle += " own";
    }
    textrowstyle += " " + this.generateEmotionStyle(item.likes, item.dislikes);
    if (item.active) {
      textrowstyle += " active";
    }
      if (item.first) {
      textrowstyle += " first";
    }
    return (
      <div className={textrowstyle}>
        <div className="nick columns col-md-3 col-xs-3 text-right">
          {item.nick}
        </div>
        <div className="nicktext col-md-9 col-xs-9">
          <div className="text">
            <span dangerouslySetInnerHTML={{ __html: em(item.line) }} />
            <Emotion
              items={item.likes}
              toggleEmotion={() => this.props.toggleEmotion(item.date, true)}
              classNames="glyphicon glyphicon-thumbs-up text-primary"
            />
            <Emotion
              items={item.dislikes}
              toggleEmotion={() => this.props.toggleEmotion(item.date, false)}
              classNames="glyphicon glyphicon-thumbs-down text-danger"
            />
            <span className="time small"> - {t(item.time)}</span>
          </div>
        </div>
      </div>
    );
  }

  renderme(item) {
    return (
      <div className="row textrow">
        <div
          className="action"
          dangerouslySetInnerHTML={{
            __html:
              item.line + '<span class="time"> - ' + item.time + "</span>",
          }}
        ></div>
      </div>
    );
  }

  renderwelcome(item, t) {
    return (
      <div className="row textrow">
        <div
          className="action col-md-12 thumbnail"
          dangerouslySetInnerHTML={{
            __html:
              '<div><div class="caption" >' +
              item.nick +
              " saapui paikalle " +
              item.line +
              '</div><span class="time small"> - ' +
              t(item.time) +
              "</span></div>",
          }}
        ></div>
      </div>
    );
  }

  renderaction(item) {
    return (
      <div className="row textrow">
        <div
          className="star bg-warning col-md-12"
          dangerouslySetInnerHTML={{
            __html:
              item.line + '<span class="time"> - ' + item.time + "</span>",
          }}
        ></div>
      </div>
    );
  }

  renderquit(item, t) {
    return (
      <div className="row textrow">
        <div className="bg-danger col-md-12 quit">
          {" "}
          {item.nick} poistui kokonaan ircistä: {item.line}
          {t(item.time)}
        </div>
      </div>
    );
  }
  renderjoin(item, t) {
    return (
      <div className="row textrow">
        <div className="col-md-12 bg-info quit">
          {item.nick} saapui kanavalle - {t(item.time)}
        </div>
      </div>
    );
  }

  renderpart(item) {
    return (
      <div className="row textrow">
        <div className="bg-warning col-md-12 quit">
          {" "}
          {item.nick} jätti kanavan - {item.time}
        </div>
      </div>
    );
  }
  render() {
    const { t, em } = useUi();
    if (this["render" + this.props.elem.type]) {
      return this["render" + this.props.elem.type](this.props.elem, t, em);
    } else {
      console.log(
        "ERROR! method: render" +
          this.props.elem.type +
          " cannot be found, row: " +
          JSON.stringify(this.props.elem)
      );
      return null;
    }
    return (
      <div className="action textrow">
        {" "}
        {this.props.elem}
        <span className="time"> -{this.props.time}</span>
      </div>
    );
  }

  renderlogevent(item) {
    return (
      <div className="textrow row logevent alert-warning">
        <div className="col-md-12">{item.line}</div>
      </div>
    );
  }
}

export default Textrow;
