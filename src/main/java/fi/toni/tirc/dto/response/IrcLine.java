package fi.toni.tirc.dto.response;

import java.io.Serializable;

public class IrcLine implements Serializable {


  public enum Type {

  }

  /**
   *
   */
  private static final long serialVersionUID = 1L;


  private String nick;

  private String data;


  private long time;

  private String type;


  public IrcLine() {
    time = System.currentTimeMillis();
  }

  public String getNick() {
    return nick;
  }

  public void setNick(String nick) {
    this.nick = nick;
  }


  public String getLine() {
    return data;
  }

  public void setLine(String data) {
    this.data = data;
  }

  public long getTime() {
    return time;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  @Override
  public String toString() {
    return "IrcLine{" +
            "nick='" + nick + '\'' +
            ", data='" + data + '\'' +
            ", time=" + time +
            ", type='" + type + '\'' +
            '}';
  }
}