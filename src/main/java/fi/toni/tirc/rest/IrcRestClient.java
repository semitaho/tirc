package fi.toni.tirc.rest;

import fi.toni.tirc.dto.request.IrcText;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.function.Consumer;

/**
 * Created by taho on 16/02/16.
 */
@Component
public class IrcRestClient {

  public static final String BASE_URL = "http://localhost:8080/irc";

  static Logger log = LoggerFactory.getLogger(IrcRestClient.class);


  public void sendText(String nick, String text) {
    final var webclient = createWebClient();
    IrcText ircText = new IrcText(nick, text);
    log.debug("SEND text to IRC: {} ", ircText);
    HttpEntity<IrcText> request = createRequest(ircText);
    webclient.post()
            .uri("/sendtext")
            .bodyValue(request)
            .retrieve()
            .bodyToMono(IrcText.class)
            .subscribe(new TircListenableFutureCallback<>());

  }

  private <T> HttpEntity<T> createRequest(T entity) {
    HttpHeaders requestHeaders = new HttpHeaders();
    requestHeaders.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
    HttpEntity<T> httpEntity = new HttpEntity<>(entity, requestHeaders);
    return httpEntity;
  }

  private WebClient createWebClient() {
    return WebClient.builder()
            .baseUrl(BASE_URL)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();
  }

  public void askTopic(final Consumer<String> callback) {
    final var webClient = createWebClient();
    HttpHeaders requestHeaders = new HttpHeaders();
    requestHeaders.setAccept(Arrays.asList(MediaType.TEXT_PLAIN));
    webClient
            .get()
            .uri("/asktopic")
            .headers(httpHeaders -> httpHeaders.addAll(requestHeaders))
            .retrieve()
            .bodyToMono(String.class)
            .subscribe(callback);


  }

  public void leave(String nick) {
    final var webClient = createWebClient();
    log.debug("LEAVE from IRC with nick: {}", nick);
    HttpEntity<String> request = createRequest(nick);
    webClient.post().uri("/leave")
            .bodyValue(request)
            .retrieve()
            .bodyToMono(String.class)
            .subscribe(new TircListenableFutureCallback<>());
  }

  public void join(String nick, String text) {
    final var webClient = createWebClient();
    IrcText ircText = new IrcText(nick, text);
    log.debug("JOIN to IRC with nick:{} ", nick);
    HttpEntity<IrcText> request = createRequest(ircText);
    webClient.post()
            .uri("/join")
            .bodyValue(request)
            .retrieve()
            .bodyToMono(IrcText.class)
            .subscribe(new TircListenableFutureCallback<>());

  }
}
