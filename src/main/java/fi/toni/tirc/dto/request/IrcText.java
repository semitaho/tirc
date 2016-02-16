package fi.toni.tirc.dto.request;

import java.io.Serializable;

/**
 * Created by taho on 16/02/16.
 */
public class IrcText implements Serializable {

  private String nick;

  private String text;

  public IrcText() {

  }

  public IrcText(String nick, String text) {
    this.nick = nick;
    this.text = text;
  }

  public String getNick() {
    return nick;
  }

  public void setNick(String nick) {
    this.nick = nick;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  @Override
  public String toString() {
    return "IrcText{" +
            "nick='" + nick + '\'' +
            ", text='" + text + '\'' +
            '}';
  }
}
