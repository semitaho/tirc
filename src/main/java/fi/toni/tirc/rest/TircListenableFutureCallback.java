package fi.toni.tirc.rest;

import java.util.function.Consumer;

/**
 * Created by taho on 15/02/16.
 */
public class TircListenableFutureCallback<T> implements Consumer<T> {

  private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(TircListenableFutureCallback.class);

  @Override
  public void accept(final T ircText) {
    log.debug("Success sending data: {} ", ircText);

  }
}
