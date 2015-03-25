/**
 * 
 */
package fi.toni.tirc.server.filter;

import fi.toni.tirc.communication.TircLine;

/**
 * @author Toni
 * 
 */
public class PrivateConversationFilter extends TextReceiverFilter {


	public PrivateConversationFilter(String nick) {
	}

	@Override
	public TircLine apply(String textBuffer) {
		int indexOf = textBuffer.indexOf(":", 1);
		String text = textBuffer.substring(indexOf + 1);

		String nick = textBuffer.substring(textBuffer.indexOf(":") + 1,
				textBuffer.indexOf("!"));
		String message = "* " + nick + " privailoo: " + text;

		TircLine tircLine = new TircLine();
		tircLine.setLine(message);
		return tircLine;
	}

	@Override
	public boolean isSupported(String channel, String textBuffer) {
	//	if (textBuffer.contains(channel) == false) {
//			if (textBuffer.contains("PRIVMSG") && textBuffer.contains(":")) {
//				return true;
//			}
	//	}

		return false;
	}

}
