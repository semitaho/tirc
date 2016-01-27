/**
 *
 */
package fi.toni.tirc.communication;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fi.toni.tirc.server.TircListenerThread;

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

    public void clearLogs() {
        this.logs.clear();
    }

    /**
     * @return the newLines
     * @long id timestamp
     */
    public TircLine getNewLine(long searchId) {
        List<TircLine> copyLines = new ArrayList<TircLine>(this.newLines);
        Optional<TircLine> firstNewLine = copyLines.stream()
                .filter(line -> line != null && line.getId() >= searchId)
                .findFirst();
        if (firstNewLine.isPresent()) {
            return firstNewLine.get();
        }
        return null;
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

    public void refreshIrcUsers() {
        listenerThread.receive(ircUsers);
    }

    public void refreshIrcUsers(Map<String, IrcUser> tircUserMap) {
        ircUsers.setUsers(tircUserMap);
        listenerThread.receive(ircUsers);

    }

}
