/**
 * 
 */
package fi.toni.tirc.dto;

import org.apache.log4j.Logger;
import org.springframework.web.context.request.async.DeferredResult;

import fi.toni.tirc.rest.TircListenResponse;

/**
 * @author Toni
 *
 */
public class TircResponseClient {

	static Logger log = org.apache.log4j.Logger
			.getLogger(TircResponseClient.class);

	private DeferredResult<TircListenResponse> client;

	private long id;
	private String uuid;

	public TircResponseClient(String uuidt) {
		this.uuid = uuidt;
	}

	public long getId() {
		return this.id;
	}

	public DeferredResult<TircListenResponse> getClient() {
		return this.client;
	}

	public String getUuid() {
		return uuid;
	}

}
