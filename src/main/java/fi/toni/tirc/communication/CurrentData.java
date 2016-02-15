package fi.toni.tirc.communication;

import fi.toni.tirc.dto.TircType;

import java.io.Serializable;
import java.util.List;

/**
 * Created by taho on 10.2.2016.
 */
public class CurrentData extends Measured implements Serializable {

  private List<TircLine> data;


  @Override
  public String getReceiveType() {
    return TircType.CURRENTDATA.getTypeName();
  }

  public List<TircLine> getData() {
    return data;
  }

  public void setData(List<TircLine> data) {
    this.data = data;
  }
}
