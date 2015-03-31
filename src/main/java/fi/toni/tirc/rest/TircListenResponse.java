/**
 * 
 */
package fi.toni.tirc.rest;


/**
 * @author Toni
 *
 */
public class TircListenResponse {
	private String lastid;
	private Object data;
	private String type;


	public String getLastid() {
		return lastid;
	}

	public void setLastid(String lastid) {
		this.lastid = lastid;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
