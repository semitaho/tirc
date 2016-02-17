/**
 *
 */
package fi.toni.tirc.communication;

import fi.toni.tirc.dto.Emotion;
import fi.toni.tirc.dto.response.IrcUser;
import fi.toni.tirc.server.TircListenerThread;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author Toni
 */
@Component
public class MessageBus {

  static Logger log = org.apache.log4j.Logger.getLogger(MessageBus.class);
  private List<TircLine> logs;
  private List<TircLine> newLines;
  private ChannelTopic channelTopic;
  private IrcUsers ircUsers;

  @Autowired
  private TircUsers tircUsers;

  @Autowired
  private TircListenerThread listenerThread;

  @PostConstruct
  public void postCreate() {
    logs = new ArrayList<TircLine>();
    newLines = new ArrayList<TircLine>();
    channelTopic = new ChannelTopic(0);
    ircUsers = new IrcUsers(0);
  }

  public List<TircLine> getLogs() {
    return logs;
  }

  public void setLogs(List<TircLine> logs) {
    this.logs = logs;
  }

  public void clearCurrent() {
    this.newLines.clear();
  }


  /**
   * @return the newLines
   * @long id timestamp
   */
  public List<TircLine> getCurrentLines() {
    List<TircLine> lines = new ArrayList<>(newLines);
    return lines;
  }

  public void addNewLine(TircLine line) {
    if (line.getTarget() == null) {
      this.newLines.add(line);
    }
    listenerThread.receive(line);
  }

  public ChannelTopic getTopic() {
    return channelTopic;
  }

  public void setTopic(long nanotime, String topic) {
    channelTopic.setId(nanotime);
    channelTopic.setTopic(topic);
  }

  public void flushTopic() {
    channelTopic.flushTopic();
  }

  /**
   * @return the tircUsers
   */
  public IrcUsers getIrcUsers() {
    return ircUsers;

  }

  /**
   * @return the tircUsers
   */
  public Map<String, IrcUser> getUsers() {
    return ircUsers.getUsers();
  }

  public void registerWithNick(String nick) {
    tircUsers.registerUser(nick);
    listenerThread.receive(tircUsers);
  }

  public void changeState(String nick, String state, String text) {
    tircUsers.changeState(nick, state, text);
    listenerThread.receive(tircUsers);
  }

  public TircUsers getTircUsers() {
    return tircUsers;
  }

  public void refreshTopic(String topicStr) {
    channelTopic.setTopic(topicStr);
    listenerThread.receive(channelTopic);
  }

  public void refreshIrcUsers(Map<String, IrcUser> tircUserMap) {
    ircUsers.setUsers(tircUserMap);
    listenerThread.receive(ircUsers);

  }

  public void toggleEmotion(Emotion emotion) {
    List<TircLine> currentLines = getCurrentLines();
    for (int i = 0; i < currentLines.size(); i++) {
      TircLine currentLine = currentLines.get(i);
      if (currentLine.getDate().getTime() == emotion.getId().longValue()) {
        log.debug("GOT emotion line: " + currentLine);
        if (emotion.isLike()) {
          if (currentLine.getLikes().contains(emotion.getUser())) {
            currentLine.getLikes().remove(emotion.getUser());
          } else {
            currentLine.getLikes().add(emotion.getUser());
          }
        } else {
          if (currentLine.getDislikes().contains(emotion.getUser())) {
            currentLine.getDislikes().remove(emotion.getUser());
          } else {
            currentLine.getDislikes().add(emotion.getUser());
          }
        }
        break;
      }
    }
    CurrentData currentData = new CurrentData();
    currentData.setData(currentLines);
    listenerThread.receive(currentData);

    synchronized (this) {
      clearCurrent();
      this.newLines.addAll(currentLines);
    }

  }
}
