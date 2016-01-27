/**
 *
 */
package fi.toni.tirc.communication;

/**
 * @author taho
 */
public class TircUser {

  private String nick;

  private String state;

  private String text;

  public String getNick() {
    return nick;
  }

  public void setNick(String nick) {
    this.nick = nick;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public void setText(String text) {
    this.text = text;
  }


  public String getText() {
    return text;
  }
}
