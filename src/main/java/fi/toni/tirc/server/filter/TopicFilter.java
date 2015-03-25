package fi.toni.tirc.server.filter;

import fi.toni.tirc.communication.TircLine;

public class TopicFilter extends TextReceiverFilter {

	@Override
	public TircLine apply(String textBuffer) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isSupported(String channel, String textBuffer) {
		if (textBuffer.contains(" 332 ") || textBuffer.contains(" TOPIC ")) {
			return true;
		}
		return false;

	}
}
