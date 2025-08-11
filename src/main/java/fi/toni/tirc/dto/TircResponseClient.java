/**
 *
 */
package fi.toni.tirc.dto;

import fi.toni.tirc.rest.TircListenResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.async.DeferredResult;

/**
 * @author Toni
 *
 */
public class TircResponseClient {

  static Logger log = LoggerFactory
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
