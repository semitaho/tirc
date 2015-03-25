/**
 * 
 */
package fi.toni.tirc.util;

import fi.toni.tirc.external.TinyUrlApi;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author taho
 *
 */
public class TircMessageFormatter {
	
	public static String formatComment(String text){
		List<String> urls = TircMessageParser.fetchUrls(text);
		String formattedText = new String(text);
		for (String url : urls){
			String tircLink = TircMessageParser.formatTircLink(url);
		
			formattedText = formattedText.replace(url, tircLink);
		}
		return formattedText;
	}
	
	public static String formatGoogleMapsURI(List<String> locations, String nick) {
		String joinedLocations = locations.stream()
				.map(location -> location.toString())
				.collect(Collectors.joining("%7C"));

		String line = "http://maps.googleapis.com/maps/api/staticmap?size=1280x200&markers=color:orange%7Clabel:"
				+ nick.substring(0, 1).toUpperCase()
				+ "%7C"
				+ locations.get(locations.size() - 1)
				+ "&path=color:blue%7C"
				+ joinedLocations;
		return new TinyUrlApi().create(line);
	}

}
