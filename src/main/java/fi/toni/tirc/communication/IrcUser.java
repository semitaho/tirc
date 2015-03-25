package fi.toni.tirc.communication;

import java.io.Serializable;

public class IrcUser implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 661584079946021965L;

	public static final int IDLING_INTERVAL_SECONDS = 300;


	
	private String type;

	private String nick;

	private int idleTime = 0;

	public IrcUser(String nick) {
		this(nick, "tirc");
	}

	public IrcUser(String nick, String type) {
		this.nick = nick;
		this.type = "irc";
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	public String getNick() {
		return this.nick;
	}


	public String toIdleTime() {
		int seconds = idleTime % 60;
		int minutes = (idleTime / 60) % 60;
		int hours = (idleTime / 3600) % 24;
		int days = (idleTime / (3600 * 24));
		if (days >= 1) {
			return days + " pv " + hours + " h " + minutes + " min " + seconds
					+ " s";

		}
		if (hours >= 1) {
			return hours + " h " + minutes + " min " + seconds + " s";
		}

		if (minutes >= 1) {
			return minutes + " min " + seconds + " s";
		}
		return seconds + " s";
	}


	@Override
	public String toString() {
		StringBuffer buffer = new StringBuffer();
			buffer.append("<span ");
		if (idleTime >= IDLING_INTERVAL_SECONDS) {
			buffer.append("style=\"color: gray;\"");
		}

		buffer.append(">" 
				+ "</span><span class=\"idle\">" + toIdleTime() + "</span>");
		return buffer.toString();
	}

	/**
	 * @return the idleTime
	 */
	public int getIdleTime() {
		return idleTime;
	}

	/**
	 * @param idleTime
	 *            the idleTime to set
	 */
	public void setIdleTime(int idleTime) {
		this.idleTime = idleTime;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
