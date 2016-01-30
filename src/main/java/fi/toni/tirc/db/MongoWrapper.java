/**
 *
 */
package fi.toni.tirc.db;

import static com.mongodb.client.model.Filters.*;

import java.net.UnknownHostException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.print.Doc;

import com.mongodb.*;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.apache.log4j.Logger;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import fi.toni.tirc.util.TircUtil;
import fi.toni.tirc.rest.Location;
import fi.toni.tirc.dto.MessageBody;
import fi.toni.tirc.communication.TircLine;

/**
 * @author taho
 */
@Component
public class MongoWrapper {


  static Logger log = Logger.getLogger(MongoWrapper.class);

  public static final String COLLECTION_LOCATION = "location";
  public static final String COLLECTION_LOGS = "logs";
  public static final String COLLECTION_CONFIGURATION = "configuration";

  public static final Integer DAYS_LOGS_SUBTRACT = 2;
  public static final Integer LOCATION_LAST_POINTS_COUNT = 15;
  private MongoDatabase tircDb;

  private final List<String> SKIP_TYPE_LIST = Arrays
          .asList("welcome", "quit");

  @PostConstruct
  public void postCreate() {

    String textUri = "mongodb://tircuser:tirc123@ds037451.mongolab.com:37451/tirc";
    MongoClientURI mongoClientURI = new MongoClientURI(textUri);
    MongoClient mongoClient = new MongoClient(mongoClientURI);
    tircDb = mongoClient.getDatabase("tirc");

  }

  public List<Document> findLatestLocationsByNick(String nick, String browser) {

    MongoCollection collection = tircDb.getCollection(COLLECTION_LOCATION);
    Document query = new Document("nick", nick);
    FindIterable<Document> it = collection.find(query).sort(
            new Document("ts", -1));
    java.util.List<Document> elems = new ArrayList<>();
    MongoCursor<Document> cursor = it.iterator();

    while (cursor.hasNext()) {
      elems.add(0, cursor.next());
    }
    return elems;
  }

  public void saveLocation(MessageBody message, String useragent) {
    MongoCollection collection = tircDb.getCollection(COLLECTION_LOCATION);
    String nick = message.getNick();

    Location location = message.getLocation();
    Document basicDBObject = new Document("nick", nick)
            .append("browser", useragent)
            .append("place", location.getLocation())
            .append("location",
                    new BasicDBObject("latitude", location.getLat())
                            .append("longitude", location.getLon()))
            .append("ts", new Date());
    collection.insertOne(basicDBObject);
    deleteOld(nick);
  }

  public void deleteOld(String nick) {
    MongoCollection collection = tircDb.getCollection(COLLECTION_LOCATION);
    Document doc = new Document("nick", nick);
    FindIterable<Document> fi = collection.find(doc).sort(
            new Document("ts", -1));
    Integer index = 0;
    int removed = 0;
    MongoCursor<Document> cursor = fi.iterator();
    while (cursor.hasNext()) {
      index++;
      Document dbobject = cursor.next();
      if (index > LOCATION_LAST_POINTS_COUNT) {
        collection.deleteOne(dbobject);
        removed++;
      }
    }
    log.debug("DONE removing items: " + removed);
  }

  public List<TircLine> readLogs(LocalDate date) {

    List<TircLine> lines = new ArrayList<TircLine>();
    MongoCollection collection = tircDb.getCollection(COLLECTION_LOGS);

    Bson criteria = and(gte("datetime", TircUtil.localDateToDate(date)), lt("datetime", TircUtil.localDateToDate(date.plusDays(1))));

    FindIterable<Document> iterable = collection.find(criteria)
            .sort(new Document("datetime", 1));
    MongoCursor<Document> cursor = iterable.iterator();
    while (cursor.hasNext()) {
      Document dbObject = (Document) cursor.next();
      if (SKIP_TYPE_LIST.contains(dbObject.getString("type"))) {
        continue;
      }
      TircLine tircLine = TircUtil.mapToTircLine(dbObject);
      lines.add(tircLine);
    }
    return lines;
  }

  /**
   * Lukee logit
   *
   * @return
   */
  public List<TircLine> readLogs() {

    List<TircLine> lines = new ArrayList<TircLine>();
    MongoCollection<Document> collection = tircDb.getCollection(COLLECTION_LOGS);
    Calendar cal2 = Calendar.getInstance();
    cal2.add(Calendar.DATE, -DAYS_LOGS_SUBTRACT);
    FindIterable<Document> iterables = collection.find(gte("datetime", cal2.getTime())).sort(new Document("datetime", 1));
    MongoCursor<Document> cursor = iterables.iterator();

    while (cursor.hasNext()) {
      Document dbObject = (Document) cursor.next();
      System.out.println(dbObject);
      if (SKIP_TYPE_LIST.contains(dbObject.getString("type"))) {
        continue;
      }
      TircLine tircLine = TircUtil.mapToTircLine(dbObject);
      lines.add(tircLine);
    }
    log.debug("got log lines: " + lines.size());
    return lines;
  }

  public void deleteLogs(LocalDate day) {
    MongoCollection<Document> collection = tircDb.getCollection(COLLECTION_LOGS);
    collection.deleteMany(and(gte("datetime", TircUtil.localDateToDate(day)), lt("datetime", TircUtil.localDateToDate(day.plusDays(1)))));
  }


  public void storeLogs(List<TircLine> lines) {
    MongoCollection<Document> collection = tircDb.getCollection(COLLECTION_LOGS);
    List<Document> objectsInserting = new ArrayList<>();
    for (TircLine tircline : lines) {
      if (SKIP_TYPE_LIST.contains(tircline.getType())) {
        continue;
      }
      if (tircline.getTarget() != null) {
        continue;
      }

      objectsInserting.add(TircUtil.mapToDBModel(tircline));
    }

    collection.insertMany(objectsInserting);
  }

  public Document loadConfiguration(String env) {
    MongoCollection<Document> collection = tircDb
            .getCollection(COLLECTION_CONFIGURATION);
    Document doc = collection.find(eq("_id", env)).first();
    return doc;

  }
}
