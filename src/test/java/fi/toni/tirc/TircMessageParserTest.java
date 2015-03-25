package fi.toni.tirc;

import java.util.List;

import fi.toni.tirc.util.TircMessageParser;
import junit.framework.Assert;

import org.junit.Test;

import fi.toni.tirc.rest.Location;

public class TircMessageParserTest {
	
	@Test
	public void testParseArrived(){
		String nick = "mcw";
		Location location = new Location();
		location.setLat("23.3");
		location.setLon("36.1");
		location.setLocation("Tontunmäki");
		String ua = "Chrome";
		//TircLine parseArrived = TircMessageParser.parseArrived(nick, location, ua);
		//String text = parseArrived.getLine();
		//assertTrue(text.contains("tirc saapui paikalle"));
		//System.out.println(text);
	
	}
	
	@Test
	public void testFetchUrls(){
		String textSeq = "on joo https://www.google.fi/diyh plus http://www.pesis.fi jeeee ja sek https://www.pesis.fi  eee";
		List<String> fetchUrls = TircMessageParser.fetchUrls(textSeq);
		Assert.assertEquals(3, fetchUrls.size());
		Assert.assertTrue(fetchUrls.contains("https://www.google.fi/diyh"));
		Assert.assertTrue(fetchUrls.contains("https://www.pesis.fi"));

	}

}
