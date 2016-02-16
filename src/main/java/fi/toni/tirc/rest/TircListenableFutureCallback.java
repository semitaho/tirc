package fi.toni.tirc.rest;

import org.apache.log4j.Logger;
import org.springframework.util.concurrent.ListenableFutureCallback;

/**
 * Created by taho on 15/02/16.
 */
public class TircListenableFutureCallback<T> implements ListenableFutureCallback<T> {
  static Logger log = Logger.getLogger(TircListenableFutureCallback.class);


  @Override
  public void onFailure(Throwable throwable) {
    log.error("failed to send data", throwable);

  }

  @Override
  public void onSuccess(T t) {
    log.debug("Success sending data: "+t);

  }
}
