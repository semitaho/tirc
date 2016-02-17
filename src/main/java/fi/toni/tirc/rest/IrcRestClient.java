package fi.toni.tirc.rest;

import fi.toni.tirc.dto.request.IrcText;
import org.apache.log4j.Logger;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;
import org.springframework.web.client.AsyncRestTemplate;

import java.util.Arrays;

/**
 * Created by taho on 16/02/16.
 */
@Component
public class IrcRestClient {

  public static final String BASE_URL = "http://localhost:8080/irc";

  static Logger log = Logger.getLogger(IrcRestClient.class);


  public void sendText(String nick, String text) {
    AsyncRestTemplate asyncRestTemplate = new AsyncRestTemplate();
    IrcText ircText = new IrcText(nick, text);
    log.debug("SEND text to IRC: " + ircText);
    HttpEntity<IrcText> request = createRequest(ircText);
    ListenableFuture<ResponseEntity<IrcText>> responseEntityListenableFuture = asyncRestTemplate.postForEntity(BASE_URL + "/sendtext", request, IrcText.class);
    responseEntityListenableFuture.addCallback(new TircListenableFutureCallback<>());
  }

  private <T> HttpEntity<T> createRequest(T entity) {
    HttpHeaders requestHeaders = new HttpHeaders();
    requestHeaders.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
    HttpEntity<T> httpEntity = new HttpEntity<>(entity, requestHeaders);
    return httpEntity;
  }

  public void askTopic(ListenableFutureCallback<ResponseEntity<String>> callback) {
    AsyncRestTemplate asyncRestTemplate = new AsyncRestTemplate();
    HttpHeaders requestHeaders = new HttpHeaders();
    requestHeaders.setAccept(Arrays.asList(MediaType.TEXT_PLAIN));
    ListenableFuture<ResponseEntity<String>> forEntity = asyncRestTemplate.getForEntity(BASE_URL + "/asktopic", String.class);
    forEntity.addCallback(callback);

  }

  public void leave(String nick) {
    AsyncRestTemplate asyncRestTemplate = new AsyncRestTemplate();
    log.debug("LEAVE from IRC with nick: " + nick);
    HttpEntity<String> request = createRequest(nick);
    ListenableFuture<ResponseEntity<String>> responseEntityListenableFuture = asyncRestTemplate.postForEntity(BASE_URL + "/leave", request, String.class);
    responseEntityListenableFuture.addCallback(new TircListenableFutureCallback<>());
  }

  public void join(String nick, String text) {
    AsyncRestTemplate asyncRestTemplate = new AsyncRestTemplate();
    IrcText ircText = new IrcText(nick, text);
    log.debug("JOIN to IRC with nick: " + nick);
    HttpEntity<IrcText> request = createRequest(ircText);
    ListenableFuture<ResponseEntity<IrcText>> responseEntityListenableFuture = asyncRestTemplate.postForEntity(BASE_URL + "/join", request, IrcText.class);
    responseEntityListenableFuture.addCallback(new TircListenableFutureCallback<>());

  }
}
