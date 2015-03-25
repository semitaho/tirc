package fi.toni.tirc.server.filter;

import fi.toni.tirc.communication.TircLine;


/**
 * 
 * @author Toni
 * 
 */
public abstract class TextReceiverFilter {

	/**
	 * Applies filter and makes text changes
	 * 
	 * @param textBuffer
	 * @return text that is converted from socket line
	 */
	public abstract TircLine apply(String textBuffer);

	public abstract boolean isSupported(String channel, String textBuffer);

	
}
