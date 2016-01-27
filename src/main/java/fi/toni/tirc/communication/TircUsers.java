/**
 *
 */
package fi.toni.tirc.communication;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import fi.toni.tirc.dto.TircType;

/**
 * @author taho
 */

@Component
public class TircUsers extends Measured {

  public enum States {

    TYPING,
    FIXING,
    CONNECTED,
    IDLE;

    private String state;

    private States() {
      this.state = this.name().toLowerCase();
    }

    public String getState() {
      return this.state;
    }
  }

  private Map<String, TircUser> users;

  public TircUsers() {
    this(0);
  }

  public TircUsers(long id) {
    super(id);
    users = new HashMap<String, TircUser>();

  }

  public Map<String, TircUser> getUsers() {
    return new HashMap<String, TircUser>(users);
  }

  public void registerUser(String nick) {
    if (users.containsKey(nick)) {
      TircUser tircUser = users.get(nick);
      tircUser.setState(States.CONNECTED.getState());
    } else {
      TircUser tircUser = new TircUser();
      tircUser.setNick(nick);
      tircUser.setState(States.CONNECTED.getState());
      users.put(nick, tircUser);
    }
    refresh();
  }

  public void changeState(String nick, String newState, String text) {
    if (users.containsKey(nick) == false) {
      TircUser tircUser = new TircUser();
      tircUser.setNick(nick);
      tircUser.setText(text);
      users.put(nick, tircUser);
    }
    users.get(nick).setState(newState);
    users.get(nick).setText(text);
    refresh();
  }

  private void refresh() {
  }

  @Override
  public String getReceiveType() {
    return TircType.TIRCUSERS.getTypeName();
  }


}
