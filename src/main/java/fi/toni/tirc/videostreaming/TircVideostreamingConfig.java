package fi.toni.tirc.videostreaming;

import org.apache.log4j.Logger;
import org.eclipse.jetty.websocket.api.WebSocketBehavior;
import org.eclipse.jetty.websocket.api.WebSocketPolicy;
import org.eclipse.jetty.websocket.server.WebSocketServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.jetty.JettyRequestUpgradeStrategy;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

/**
 * Created by taho on 30.1.2016.
 */
@Configuration
@EnableWebSocket
public class TircVideostreamingConfig implements WebSocketConfigurer {

  static Logger log = Logger.getLogger(TircVideostreamingConfig.class);

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
    log.debug("REGISTERING HANDLER");
    webSocketHandlerRegistry.addHandler(myHandler(), "/streaming").setAllowedOrigins("*").setHandshakeHandler(handshakeHandler()).addInterceptors(new HttpSessionHandshakeInterceptor());
  }

  @Bean
  public DefaultHandshakeHandler handshakeHandler() {

    WebSocketPolicy policy = new WebSocketPolicy(WebSocketBehavior.SERVER);
    policy.setMaxTextMessageSize(Integer.MAX_VALUE);
    policy.setMaxTextMessageBufferSize(Integer.MAX_VALUE);
    policy.setIdleTimeout(600000);
    return new DefaultHandshakeHandler(
            new JettyRequestUpgradeStrategy(new WebSocketServerFactory(policy)));
  }

  @Bean
  public WebSocketHandler myHandler() {
    return new TircVideostreamingHandler();
  }
}
