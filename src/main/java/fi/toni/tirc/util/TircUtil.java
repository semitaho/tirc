package fi.toni.tirc.util;

import fi.toni.tirc.communication.TircLine;
import org.bson.Document;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

public class TircUtil {

  private static final String DATE_PATTERN = "HH:mm:ss";

  public static String getCurrentTimeAsString() {
    DateFormat dateFormat = new SimpleDateFormat(DATE_PATTERN);
    String format = dateFormat.format(new Date());
    return format;
  }

  public static String getTimestampAsString(long timeinmillis) {
    DateFormat dateFormat = new SimpleDateFormat(DATE_PATTERN);
    String format = dateFormat.format(new Date(timeinmillis));
    return format;
  }

  public static String resolveUserAgent(HttpServletRequest request) {
    String userAgent = request.getHeader("User-Agent");
    StringBuilder ua = new StringBuilder();
    if (userAgent.indexOf("Firefox") != -1) {
      ua.append("Firefox");
    } else if (userAgent.indexOf("Chrome") != -1) {
      ua.append("Chrome");
    } else if (userAgent.indexOf("Safari") != -1) {
      ua.append("Safari");
    } else if (userAgent.indexOf("Opera") != -1
            || userAgent.indexOf("OPR") != -1) {
      ua.append("Opera");
    } else if (userAgent.indexOf("MSIE") != -1) {
      ua.append("Internet Explorer");
    }

    if (userAgent.indexOf("Mobile") != -1) {
      ua.append(", Mobiili");
    }
    return ua.toString();
  }

  public static Document mapToDBModel(TircLine line) {
    Document dbLine = new Document("line", line.getLine());
    if (line.getNick() != null) {
      dbLine.append("nick", line.getNick());
    }
    dbLine.append("source", line.getSource());
    if (line.getType() != null) {
      dbLine.append("type", line.getType());
    }

    Date date = new Date(line.getDate().getTime());
    dbLine.append("datetime", date);
    dbLine.append("likes", line.getLikes());
    dbLine.append("dislikes", line.getDislikes());

    return dbLine;
  }

  public static TircLine mapToJoinLine(String nick) {
    TircLine tircLine = new TircLine();
    tircLine.setType("join");
    tircLine.setNick(nick);
    return tircLine;
  }

  public static TircLine mapToTircLine(Document dbObject) {
    Date date = dbObject.getDate("datetime");
    TircLine tircLine = new TircLine(date);
    if (dbObject.containsKey("nick")) {
      tircLine.setNick(dbObject.getString("nick"));
    }
    tircLine.setType(dbObject.getString("type"));
    tircLine.setSource(dbObject.getString("source"));
    if (dbObject.containsKey("line")) {
      tircLine.setLine(dbObject.getString("line"));
    }
    if (dbObject.containsKey("likes")){
      List<String> likesList =  (List<String>) dbObject.get("likes");
      HashSet<String> likes = new HashSet<>(likesList);
      tircLine.setLikes(likes);
      // TODO: jatka huomenna
    }
    if (dbObject.containsKey("dislikes")){
      List<String> likesList =  (List<String>) dbObject.get("dislikes");
      HashSet<String> likes = new HashSet<>(likesList);
      tircLine.setDislikes(likes);
    }

    return tircLine;
  }

  public static Date localDateToDate(LocalDate datelocal) {
    Instant instant = datelocal.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant();
    Date res = Date.from(instant);
    return res;
  }
}
