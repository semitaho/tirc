package fi.toni.tirc.server;

import java.util.Properties;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import fi.toni.tirc.db.MongoWrapper;
import org.apache.log4j.Logger;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mongodb.BasicDBObject;

import fi.toni.tirc.util.TircResourceLoader;
import fi.toni.tirc.db.MongoWrapper;

@Component
public class TircConfiguration {

  public static final String TIRC_SERVER_HOST_KEY = "host";
  public static final String TIRC_SERVER_NICK_KEY = "nick";
  public static final String TIRC_SERVER_CHANNEL_KEY = "channel";
  public static final String TIRC_SERVER_USER_KEY = "user";
  public static final String TIRC_SERVER_JOIN_MESSAGE_KEY = "joinmsg";
  public static final String TIRC_SERVER_QUIT_MESSAGE_KEY = "quitmsg";
  public static final String TIRC_INTERVAL_NAMES = "intervalnames";
  public static final String TIRC_INTERVAL_WHOIS = "intervalwhois";

  public static final String TIRC_GLOBAL_JNDI_NAME = "java:global/tirc/TircConfiguration!fi.toni.tirc.server.lifecycle.TircConfiguration";
  static Logger log = Logger.getLogger(TircConfiguration.class);

  private String configuration;

  private Document configurationModel;

  @Autowired
  private MongoWrapper mongoWrapper;


  public TircConfiguration() {
    configuration = loadConfigurationIdentifier();
    log.info("Configuration loaded with environment: " + configuration);

  }

  @PostConstruct
  public void afterCreate() {
    configurationModel = mongoWrapper.loadConfiguration(configuration);

  }

  @SuppressWarnings("all")
  @PreDestroy
  public void onDestroy() {
    log.info("Configuration destroyed.");
  }

  private String loadConfigurationIdentifier() {
    if (System.getenv("env") != null) {
      return System.getenv("env");
    }
    Properties props = new Properties();
    try {
      props.load(TircResourceLoader.class.getClassLoader()
              .getResourceAsStream("tirc.properties"));
      return props.getProperty("env", "dev");
    } catch (Exception e) {
      log.warn("", e);
      throw new RuntimeException(e);
    }
  }

  public String getServerHost() {
    return getProperty(TIRC_SERVER_HOST_KEY);
  }

  public Long getNamesInterval() {
    String property = getProperty(TIRC_INTERVAL_NAMES);
    return Long.valueOf(property);

  }

  public Integer getWhoisInterval() {
    return Integer.valueOf(getProperty(TIRC_INTERVAL_WHOIS));
  }

  public String getChannel() {
    return getProperty(TIRC_SERVER_CHANNEL_KEY);
  }

  public String getProperty(String propKey) {
    return configurationModel.getString(propKey);
  }
}
