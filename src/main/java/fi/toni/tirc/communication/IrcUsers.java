package fi.toni.tirc.communication;

import java.util.HashMap;
import java.util.Map;

import fi.toni.tirc.dto.TircType;

public class IrcUsers extends Measured {

	private Map<String, IrcUser> users = new HashMap<>();

	public IrcUsers(long time) {
		super(time);
	}

	/**
	 * @return the users
	 */
	public Map<String, IrcUser> getUsers() {
		return users;
	}

	/**
	 * @param users
	 *            the users to set
	 */
	public void setUsers(Map<String, IrcUser> users) {
		this.users = users;
	}

	@Override
	public String getReceiveType() {
		return TircType.USERS.getTypeName();
	}

	

}
