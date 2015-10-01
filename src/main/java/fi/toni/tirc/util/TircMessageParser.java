package fi.toni.tirc.util;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import fi.toni.tirc.communication.Measured.Source;
import fi.toni.tirc.communication.TircLine;
import org.bson.Document;

import javax.print.Doc;

public class TircMessageParser {

    private static Pattern linkPattern;

    static {
        final String REGEX_PATTERN = "\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]";

        //	final String REGEX_PATTERN = "\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%\\?=~_|!:,\\.;]*[-a-zA-Z0-9+&@#/%=~_|]";
        linkPattern = Pattern.compile(REGEX_PATTERN);
    }

    public static TircLine parseArrived(List<Document> locations) {

        List<String> locationsStr = locations
                .stream()
                .map(dbobject -> {
                    Document basicDbObject = (Document) dbobject;
                    Document location = (Document) basicDbObject
                            .get("location");
                    String latitude = location.getString("latitude");
                    String longitude = location.getString("longitude");
                    return latitude + "," + longitude;
                }).collect(Collectors.toList());
        Document lastObject = locations.get(locations
                .size() - 1);
        String nick = lastObject.getString("nick");
        String place = lastObject.getString("place");
        TircLine tircLine = new TircLine();
        StringBuilder messageBuilder = new StringBuilder();

        messageBuilder.append("(");
        messageBuilder.append(place);
        messageBuilder.append(") ");
        messageBuilder.append(TircMessageFormatter.formatGoogleMapsURI(locationsStr, nick));
        String message = messageBuilder.toString();
        tircLine.setNick(nick);
        tircLine.setType("welcome");
        tircLine.setLine(message);
        return tircLine;
    }

    public static TircLine parseGoodbye(String nick) {
        TircLine tircLine = new TircLine();
        tircLine.setSource(Source.TIRC.toString());
        tircLine.setType("part");
        tircLine.setNick(nick);
        ;
        return tircLine;

    }

    public static List<String> fetchUrls(String text) {
        Matcher matcher = linkPattern.matcher(text);
        List<String> urls = new ArrayList<String>();
        while (matcher.find()) {
            urls.add(matcher.group());
        }
        return urls;

    }

    public static String formatTircLink(String url) {
        final String LINK_TEMPLATE = "<a target=\"_blank\" href=\"%s\">%s</a>";
        return String.format(LINK_TEMPLATE, url, url);
    }

    public static String formatTircImage(String url) {
        final String LINK_TEMPLATE = "<img src=\"%s\" title=\"google maps\" />";
        return String.format(LINK_TEMPLATE, url);
    }


}
