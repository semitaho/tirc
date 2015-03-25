/**
 * 
 */
package fi.toni.tirc.util;

import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

import org.apache.log4j.Logger;


/**
 * @author taho
 *
 */

public class TircIdGenerator {
	private static final AtomicLong NEXT_ID = new AtomicLong();
	static Logger log = Logger.getLogger(TircIdGenerator.class);

	public synchronized static String generateId(){
		return UUID.randomUUID().toString();
	}
	
	public static long currentId(){
		log.debug("current id: "+NEXT_ID.get());

		return NEXT_ID.get();
	}
	
	public static void reset(){
		NEXT_ID.set(0L);
	}
	
}
