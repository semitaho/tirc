/**
 * 
 */
package fi.toni.tirc.server;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fi.toni.tirc.communication.Measured;
import fi.toni.tirc.communication.MessageBus;

/**
 * @author Toni
 *
 */
@Service
public class TircListenerThread {

	static Logger log = org.apache.log4j.Logger
			.getLogger(TircListenerThread.class);

	final static int TIMEOUT_IN_MILLISECONDS = 60000 * 10;

	@Autowired
	private MessageBus bus;

	private final static ConcurrentHashMap<String, ArrayBlockingQueue<Measured>> clientQueues = new ConcurrentHashMap<>();


	public void receive(Measured measured) {
		
		Set<String> uuids = new HashSet<String>();
		for (String uuid : clientQueues.keySet()) {
			ArrayBlockingQueue<Measured> blockQuue = clientQueues.get(uuid);
			if (!blockQuue.offer(measured)) {
				log.debug("queue capacity exceeded, removing queue...");
				uuids.add(uuid);
			}
		}
		remove(uuids);
	}

	private void remove(Set<String> removableUuids) {
		removableUuids.forEach(uuid -> clientQueues.remove(uuid) );
		log.debug("size after remove: " + clientQueues.size());
	}

	public ArrayBlockingQueue<Measured> init(String uuid) {
		if (!clientQueues.containsKey(uuid)) {
			log.debug("creating new client queue with uuid: " + uuid);
			ArrayBlockingQueue<Measured> blockingQ = new ArrayBlockingQueue<Measured>(
					5);
			clientQueues.put(uuid, blockingQ);
		}

		log.debug("client queue size: " + clientQueues.size());
		return clientQueues.get(uuid);
	}

}
