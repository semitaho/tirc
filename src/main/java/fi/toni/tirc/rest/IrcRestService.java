package fi.toni.tirc.rest;

import fi.toni.tirc.communication.Measured;
import fi.toni.tirc.communication.MessageBus;
import fi.toni.tirc.communication.TircLine;
import fi.toni.tirc.dto.response.IrcLine;
import fi.toni.tirc.dto.response.IrcUser;
import fi.toni.tirc.util.TircMessageFormatter;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

/**
 * Receives irc events
 * <p/>
 * Created by taho on 15/02/16.
 */

@RestController
@RequestMapping("/irc")
public class IrcRestService {

  static Logger log = Logger.getLogger(IrcRestService.class);

  @Autowired
  private MessageBus bus;

  @RequestMapping(value = "/say", method = RequestMethod.POST)
  public void say(@RequestBody IrcLine line) {
    log.debug("received line : " + line);
    Date date = new Date(line.getTime());
    TircLine tircLine = new TircLine(date);
    tircLine.setSource(Measured.Source.IRC.name());
    tircLine.setNick(line.getNick());
    tircLine.setType(line.getType());
    String formattedLine = TircMessageFormatter.formatMemes(line.getLine());
    tircLine.setLine(formattedLine);
    bus.addNewLine(tircLine);
  }

  @RequestMapping(value = "/sendtopic", method = RequestMethod.POST)
  public void sendTopic(@RequestBody String topic) {
    log.debug("received topic : " + topic);
    bus.refreshTopic(topic);
  }

  @RequestMapping(value = "/sendusers", method = RequestMethod.POST)
  public void sendUsers(@RequestBody Map<String, IrcUser> users) {
    log.debug("RECEIVED users from IRC: " + users);
    bus.refreshIrcUsers(users);

  }


}
