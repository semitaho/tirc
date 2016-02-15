package fi.toni.tirc.dto;

public enum TircType {

  RECEIVE("receive"), TOPIC("ontopic"), USERS("onusers"), ERROR("onerror"), TIRCUSERS("ontircusers"), CURRENTDATA("oncurrentdata");

  private String typeName;

  TircType(String typeName) {
    this.typeName = typeName;
    // TODO Auto-generated constructor stub
  }

  public String getTypeName() {
    return this.typeName;
  }

}
