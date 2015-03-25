/**
 * 
 */
package fi.toni.tirc.server;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;

import fi.toni.tirc.communication.TircLine;

/**
 * @author taho
 *
 */
public class LogFileParserTest {
	
	@Test
	public void testAddLogStartNolines(){
		List<TircLine> lines =  new ArrayList<>();
		List<TircLine> newLines = LogFileParser.addLogStart(lines);
		Assert.assertEquals(1, newLines.size());
		TircLine tircLine = newLines.get(0);
		Assert.assertEquals("logevent", tircLine.getType());
	}
	
	@Test
	public void testAddLogStartSeveralLines(){
		List<TircLine> lines =  new ArrayList<>();
		Calendar cal = Calendar.getInstance();
		cal.set(2010, 11, 3);
		TircLine line = new TircLine();
		lines.add(line);
		TircLine tircLine2 = new TircLine();
		lines.add(tircLine2);
		List<TircLine> newLines = LogFileParser.addLogStart(lines);
		Assert.assertEquals(3, newLines.size());
		TircLine tircLine = newLines.get(0);
		Assert.assertEquals("logevent", tircLine.getType());
		long id = tircLine.getId();
		Calendar logCalendar = Calendar.getInstance();
		logCalendar.setTimeInMillis(id);
	//	Assert.assertEquals(2010, logCalendar.get(Calendar.YEAR));
	}

}
