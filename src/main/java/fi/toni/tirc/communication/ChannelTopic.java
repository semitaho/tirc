/**
 * 
 */
package fi.toni.tirc.communication;

import java.io.Serializable;

import fi.toni.tirc.dto.TircType;

/**
 * @author Toni
 * 
 */
public class ChannelTopic extends Measured implements Serializable, Cloneable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -662385898005351096L;

	private String channelTopic;

	public ChannelTopic(long id) {
		super(id);
		this.channelTopic = "";
	}

	public String getTopic() {
		return this.channelTopic;
	}

	public static final boolean isTopicLine(String textBuffer, String channel) {
		if (textBuffer.contains(channel)
				&& (textBuffer.contains(" 332 ") || textBuffer
						.contains(" TOPIC "))) {
			return true;
		}
		return false;
	}

	public void setTopic(String topic) {
		this.channelTopic = topic;
	}

	public void flushTopic() {
		this.channelTopic = null;
	}

	@Override
	public ChannelTopic clone() {
		ChannelTopic ct = new ChannelTopic(this.getId());
		ct.setTopic(this.getTopic());
		return ct;
	}

	@Override
	public String getReceiveType() {
		return TircType.TOPIC.getTypeName();
	}


}
