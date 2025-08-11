/**
 *
 */
package fi.toni.tirc.server;

import fi.toni.tirc.communication.Measured;
import fi.toni.tirc.communication.MessageBus;
import fi.toni.tirc.communication.TircLine;
import fi.toni.tirc.rest.TircListenClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ArrayBlockingQueue;

/**
 * @author Toni
 *
 */
@Service
public class TircListenerThread {

  static Logger log = LoggerFactory
          .getLogger(TircListenerThread.class);

  final static int TIMEOUT_IN_MILLISECONDS = 60000 * 10;

  @Autowired
  private MessageBus bus;

  private final static List<TircListenClient> clientQueues = new ArrayList<>();


  public void receive(Measured measured) {

    Set<String> uuids = new HashSet<String>();
    for (TircListenClient client : clientQueues) {
      if (measured instanceof TircLine) {
        TircLine line = (TircLine) measured;
        log.debug("target: " + line.getTarget() + ", message: " + line.getLine() + ", from: " + line.getNick());
        // jos viesti ei ole tarkoitettu kyseiselle subscriberille, ei näytetä sitä silloin hänelle
        if (line.getTarget() != null && !line.getTarget().equals(client.getSubscriber()) && !line.getNick().equals(client.getSubscriber())) {
          continue;
        }
      }
      ArrayBlockingQueue<Measured> blockQuue = client.getClientQueue();
      if (!blockQuue.offer(measured)) {
        log.debug("queue capacity exceeded, removing queue...");
        uuids.add(client.getUuid());
      }
    }
    remove(uuids);
  }

  private void remove(Set<String> removableUuids) {
    removableUuids.forEach(uuid -> clientQueues.removeIf(client -> uuid.equals(client.getUuid())));
    log.debug("size after remove: " + clientQueues.size());
  }

  public ArrayBlockingQueue<Measured> init(String uuid, String subscriber) {
    Optional<TircListenClient> first = clientQueues.stream().filter(client -> uuid.equals(client.getUuid())).findFirst();
    if (!first.isPresent()) {
      log.debug("creating new client queue with uuid: " + uuid + " and subscriber " + subscriber);
      TircListenClient client = new TircListenClient(uuid, subscriber);
      clientQueues.add(client);
      return client.getClientQueue();
    }
    log.debug("client queue size: " + clientQueues.size());
    return first.get().getClientQueue();
  }

}
