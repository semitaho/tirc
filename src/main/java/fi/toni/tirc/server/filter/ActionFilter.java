package fi.toni.tirc.server.filter;

import fi.toni.tirc.communication.TircLine;

public class ActionFilter extends TextReceiverFilter {

	@Override
	public TircLine apply(String textBuffer) {
		String nick = textBuffer.substring(textBuffer.indexOf(":") + 1,
				textBuffer.indexOf("!"));
		String actionStartStr = textBuffer.substring(textBuffer
				.indexOf("ACTION"));
		String actionStr = actionStartStr
				.substring(actionStartStr.indexOf(" ") + 1);
		String message =  "* " + nick + " "
				+ actionStr;
		TircLine tircLine = new TircLine();
		tircLine.setLine(message);
		tircLine.setType("action");
		return tircLine;
	}

	@Override
	public boolean isSupported(String channel, String textBuffer) {
		if (textBuffer.contains("ACTION") && textBuffer.contains("PRIVMSG")) {
			return true;
		}
		return false;
	}

}
