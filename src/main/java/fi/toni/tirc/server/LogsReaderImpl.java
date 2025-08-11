package fi.toni.tirc.server;

import fi.toni.tirc.communication.MessageBus;
import fi.toni.tirc.communication.TircLine;
import fi.toni.tirc.db.MongoWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.List;

@Component
public class LogsReaderImpl implements LogsReader {


  @Autowired
  private MongoWrapper mongoService;

  /**
   * @EJB
   **/
  @Autowired
  private MessageBus bus;

  @Autowired
  private TircConfiguration config;

  static Logger log = LoggerFactory.getLogger(LogsReaderImpl.class);

  @PostConstruct
  public void postConstruct() {
    log.debug("post constructing logreader");
  }

  @Scheduled(cron = "0 0 * * * *")
  public void doStore() {
    log.info("starting to store");
    List<TircLine> currentLines = bus.getCurrentLines();
    mongoService.storeLogs(currentLines);
    bus.clearCurrent();
    log.info("logs stored and current logs flushed");

  }

  /**
   * @Override
   **/
  @PreDestroy
  public void destroy() {
    doStore();

  }

}
