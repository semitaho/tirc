/**
 *
 */
package fi.toni.tirc.util;

import fi.toni.tirc.external.TinyUrlApi;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author taho
 */
public class TircMessageFormatter {

  final static Map<String, String> MEME_MAPPING = new HashMap<>();

  static {
    MEME_MAPPING.put("LOL", "65% 42.5%");
    MEME_MAPPING.put("lol", "65% 42.5%");
    MEME_MAPPING.put("!", "0 5%");
    final String KIELI_POSKESSA = "67.5% 2.5%";
    MEME_MAPPING.put(":p", KIELI_POSKESSA);
    MEME_MAPPING.put(":P", KIELI_POSKESSA);
    MEME_MAPPING.put("=P", KIELI_POSKESSA);
    MEME_MAPPING.put("=p", KIELI_POSKESSA);
    final String MOI = "7.5% 35%";
    MEME_MAPPING.put("moi", MOI);
    MEME_MAPPING.put("Moi", MOI);
    MEME_MAPPING.put("MOI", MOI);


  }

  public static String formatComment(String text) {
    List<String> urls = TircMessageParser.fetchUrls(text);
    String formattedText = new String(text);
    for (String url : urls) {
      String tircLink = TircMessageParser.formatTircLink(url);

      formattedText = formattedText.replace(url, tircLink);
    }
    return formattedText;
  }

  public static String formatMemes(String text) {
    String html = text;
    final String MEME_TEMPLATE = " <span class=\"icon\" style=\"background-position: %s;\"></span> ";
    for (String memeKey : MEME_MAPPING.keySet()) {
      if (text.indexOf(memeKey) > -1) {
        String format = String.format(MEME_TEMPLATE, MEME_MAPPING.get(memeKey));
        html = html.replaceAll(memeKey, format);
      }
    }
    return html;
  }

  public static String formatImage(String text) {
    List<String> urls = TircMessageParser.fetchUrls(text);
    String formattedText = new String(text);
    for (String url : urls) {
      String tircLink = TircMessageParser.formatTircImage(url);

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
