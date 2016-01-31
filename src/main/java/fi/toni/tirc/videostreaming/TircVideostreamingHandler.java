package fi.toni.tirc.videostreaming;

import org.apache.log4j.Logger;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.websocket.Session;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by taho on 30.1.2016.
 */
public class TircVideostreamingHandler extends TextWebSocketHandler {
  static Logger log = Logger.getLogger(TircVideostreamingHandler.class);

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    clients.remove(session.getId());
    log.debug("websockets size " + clients.size());

  }

  final static Map<String, WebSocketSession> clients = new ConcurrentHashMap<>();

  @Override
  public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    log.debug("client connected:" + session.getId());
    clients.put(session.getId(), session);

  }

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    Collection<WebSocketSession> values = clients.values();
    log.debug("size:" + values.size());
    TextMessage kykkaa = new TextMessage(message.getPayload());

    for (WebSocketSession sessionitem : values) {
      if (!sessionitem.getId().equals(session.getId()))
        sessionitem.sendMessage(kykkaa);
    }

  }
}


