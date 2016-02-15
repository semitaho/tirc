package fi.toni.tirc.dto;

import java.io.Serializable;

/**
 * Created by taho on 10.2.2016.
 */
public class Emotion implements Serializable {

  private Long id;
  private String user;

  private boolean like;



  public Emotion(){

  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUser() {
    return user;
  }

  public void setUser(String user) {
    this.user = user;
  }

  public boolean isLike() {
    return like;
  }

  public void setLike(boolean like) {
    this.like = like;
  }
}
