package fi.toni.tirc.server.filter;

import fi.toni.tirc.communication.TircLine;


public class ChanFilter extends TextReceiverFilter {

	@Override
	public TircLine apply(String textBuffer) {
		String nick = textBuffer.substring(textBuffer.indexOf(":") + 1,
				textBuffer.indexOf("!"));
		TircLine line = new TircLine();
		line.setNick(nick);
		if (textBuffer.contains("JOIN")) {
		//	String channel = textBuffer
		//			.substring(textBuffer.indexOf(":", 2) + 1);
			line.setType("join");
			return line;
		}
		if (textBuffer.contains("QUIT")) {
			String reason = textBuffer
					.substring(textBuffer.indexOf(":", 2) + 1);
			line.setLine(reason);
			line.setType("quit");
			return line;
		}

		if (textBuffer.contains("PART")) {
	//		String part = textBuffer.substring(textBuffer.indexOf("PART"));
	//		String channel = part.substring(part.indexOf(" ") + 1,
	//				part.indexOf(":"));		
			line.setType("part");
			return line;
		}
		return null;

	}

	@Override
	public boolean isSupported(String channel, String textBuffer) {
		if (textBuffer.contains(" QUIT ") || textBuffer.contains(" JOIN ")
				|| textBuffer.contains(" PART ")) {
			return true;
		}
		return false;
	}

}
