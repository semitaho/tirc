/**
 * 
 */
package fi.toni.tirc.dto;

import fi.toni.tirc.rest.Location;

import java.io.Serializable;

/**
 * Data transfer object for message travelling.
 * 
 * @author Toni
 *
 */
public class MessageBody implements Serializable {

	
	private String nickold;
	private String nick;
	private String target;
	private String state;

	private String text;

	private String htmltext;

	private Location location;

	public String getNickold() {
		return nickold;
	}

	public void setNickold(String nickold) {
		this.nickold = nickold;
	}

	public String getNick() {
		return nick;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public String getTarget() {
		return target;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}


	public String getHtmltext() {
		return htmltext;
	}

	public void setHtmltext(String htmltext) {
		this.htmltext = htmltext;
	}
}
