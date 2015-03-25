package fi.toni.tirc.communication;

import java.io.Serializable;
import java.util.Date;

import fi.toni.tirc.util.TircUtil;
import fi.toni.tirc.dto.TircType;

public class TircLine extends Measured implements Serializable {
	
	public enum Type {
		
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	
	private String nick;
	
	private String data;
	
	private String time;
	
	private Date date;

	private String type;
	
	public TircLine() {
	
		super(0L);	
		long currentTimeMillis = System.currentTimeMillis();
		time = TircUtil.getTimestampAsString(currentTimeMillis);
		this.date = new Date(currentTimeMillis);
	}
	public TircLine(Source source) {
		super(0, source);	
		long currentTimeMillis = System.currentTimeMillis();
		time = TircUtil.getTimestampAsString(currentTimeMillis);
		this.date = new Date(currentTimeMillis);
		
	}
	
	public TircLine(Date date){
		time = TircUtil.getTimestampAsString(date.getTime());
		this.date = new Date(date.getTime());
	}
	
	public String getNick() {
		return nick;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	
	public String getLine() {
		return data;
	}

	public void setLine(String data) {
		this.data = data;
	}

	public String getTime() {
		return time;
	}
	
	public Date getDate(){
		return this.date;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	@Override
	public String getReceiveType() {
		return TircType.RECEIVE.getTypeName();
	}
		

}
