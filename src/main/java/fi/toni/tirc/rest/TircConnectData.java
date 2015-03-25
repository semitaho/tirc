/**
 * 
 */
package fi.toni.tirc.rest;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import fi.toni.tirc.communication.IrcUsers;
import fi.toni.tirc.communication.TircLine;
import fi.toni.tirc.communication.TircUser;

/**
 * @author Toni
 * 
 */

@XmlRootElement
public class TircConnectData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1711874388607565071L;

	private List<TircLine> logsData;

	private List<TircLine> currentData;
	private String topic;
	private IrcUsers users;
	private Collection<TircUser> tircusers;
	
	private String id;

	private Long timestamp;

	public TircConnectData() {

	}

	public TircConnectData(List<TircLine> logsData) {
		this.logsData = logsData;
	}

	/**
	 * @return the logsData
	 */
	public List<TircLine> getLogsData() {
		return logsData;
	}

	/**
	 * @param logsData
	 *            the logsData to set
	 */
	public void setLogsData(List<TircLine> logsData) {
		this.logsData = logsData;
	}

	/**
	 * @return the timestamp
	 */
	public Long getTimestamp() {
		return timestamp;
	}

	/**
	 * @param timestamp
	 *            the timestamp to set
	 */
	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<TircLine> getCurrentData() {
		return currentData;
	}

	public void setCurrentData(List<TircLine> currentData) {
		this.currentData = currentData;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public IrcUsers getUsers() {
		return users;
	}

	public void setUsers(IrcUsers users) {
		this.users = users;
	}

	public Collection<TircUser> getTircusers() {
		return tircusers;
	}

	public void setTircusers(Collection<TircUser> tircusers) {
		this.tircusers = tircusers;
	}

}
