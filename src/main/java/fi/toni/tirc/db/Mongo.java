/**
 * 
 */
package fi.toni.tirc.db;

import java.net.UnknownHostException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.QueryBuilder;
import com.mongodb.WriteConcern;

import fi.toni.tirc.util.TircUtil;
import fi.toni.tirc.rest.Location;
import fi.toni.tirc.dto.MessageBody;
import fi.toni.tirc.communication.TircLine;

/**
 * @author taho
 *
 */
@Service
public class Mongo {

	static Logger log = Logger.getLogger(Mongo.class);

	public static final String COLLECTION_LOCATION = "location";
	public static final String COLLECTION_LOGS = "logs";
	public static final String COLLECTION_CONFIGURATION = "configuration";

	public static final Integer DAYS_LOGS_SUBTRACT = 2;
	public static final Integer LOCATION_LAST_POINTS_COUNT = 30;
	private DB tircDb;

	private final List<String> SKIP_TYPE_LIST = Arrays
			.asList("welcome", "quit");

	@PostConstruct
	public void postCreate() {
		String textUri = "mongodb://tircuser:tirc123@ds037451.mongolab.com:37451/tirc";
		try {
			MongoClientURI mongoClientURI = new MongoClientURI(textUri);
			MongoClient mongoClient = new MongoClient(mongoClientURI);
			tircDb = mongoClient.getDB("tirc");
		} catch (UnknownHostException e) {
			log.error("error on post create", e);
			throw new RuntimeException(e);
		}
	}

	public List<DBObject> findLatestLocationsByNick(String nick, String browser) {
		DBCollection collection = tircDb.getCollection(COLLECTION_LOCATION);
		QueryBuilder builder = QueryBuilder.start("nick").is(nick);
		DBCursor cursor = collection.find(builder.get()).sort(
				new BasicDBObject("ts", -1));
		java.util.List<DBObject> elems = new ArrayList<DBObject>();

		while (cursor.hasNext()) {
			elems.add(0, cursor.next());
		}
		return elems;
	}

	public void saveLocation(MessageBody message, String useragent) {
		DBCollection collection = tircDb.getCollection(COLLECTION_LOCATION);
		String nick = message.getNick();

		Location location = message.getLocation();
		BasicDBObject basicDBObject = new BasicDBObject("nick", nick)
				.append("browser", useragent)
				.append("place", location.getLocation())
				.append("location",
						new BasicDBObject("latitude", location.getLat())
								.append("longitude", location.getLon()))
				.append("ts", new Date());
		collection.insert(basicDBObject);
		deleteOld(nick, useragent);
	}

	public void deleteOld(String nick, String useragent) {
		DBCollection collection = tircDb.getCollection(COLLECTION_LOCATION);
		QueryBuilder builder = QueryBuilder.start("nick").is(nick);
		DBCursor cursor = collection.find(builder.get()).sort(
				new BasicDBObject("ts", -1));
		Integer index = 0;
		int removed = 0;
		while (cursor.hasNext()) {
			index++;
			DBObject dbobject = cursor.next();
			if (index > LOCATION_LAST_POINTS_COUNT) {
				collection.remove(dbobject, WriteConcern.UNACKNOWLEDGED);
				removed++;
			}
		}
		log.debug("DONE removing items: " + removed);
	}

	public List<TircLine> readLogs(LocalDate date) {

		List<TircLine> lines = new ArrayList<TircLine>();
		DBCollection collection = tircDb.getCollection(COLLECTION_LOGS);

		DBObject dbQueryObject = QueryBuilder.start("datetime").greaterThanEquals(TircUtil.localDateToDate(date)).lessThan(TircUtil.localDateToDate(date.plusDays(1))).get();
		DBCursor cursor = collection.find(dbQueryObject)
				.sort(new BasicDBObject("datetime", 1));
		while (cursor.hasNext()) {
			BasicDBObject dbObject = (BasicDBObject) cursor.next();
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
	 * @return
	 */
	public List<TircLine> readLogs() {

		List<TircLine> lines = new ArrayList<TircLine>();
		DBCollection collection = tircDb.getCollection(COLLECTION_LOGS);
		Calendar cal = Calendar.getInstance();
		Calendar cal2 = Calendar.getInstance(); 
		cal2.add(Calendar.DATE, -DAYS_LOGS_SUBTRACT);

		DBObject dbQueryObject = QueryBuilder.start("datetime").greaterThanEquals(cal2.getTime()).lessThanEquals(cal.getTime()).get();
		DBCursor cursor = collection.find(dbQueryObject)
				.sort(new BasicDBObject("datetime", 1));
		while (cursor.hasNext()) {
			BasicDBObject dbObject = (BasicDBObject) cursor.next();
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
		DBCollection collection = tircDb.getCollection(COLLECTION_LOGS);
		
		DBObject dbQueryObject = QueryBuilder.start("datetime").greaterThanEquals(TircUtil.localDateToDate(day)).lessThan(TircUtil.localDateToDate(day.plusDays(1))).get();

		DBCursor cursor = collection.find(dbQueryObject);
		while (cursor.hasNext()) {
			DBObject next = cursor.next();
			collection.remove(next, WriteConcern.UNACKNOWLEDGED);
		}
	}
	

	public void storeLogs(List<TircLine> lines) {
		DBCollection collection = tircDb.getCollection(COLLECTION_LOGS);
		List<DBObject> objectsInserting = new ArrayList<DBObject>();
		for (TircLine tircline : lines) {
			if (SKIP_TYPE_LIST.contains(tircline.getType())) {
				continue;
			}
			if (tircline.getTarget() != null){
				continue;
			}

			objectsInserting.add(TircUtil.mapToDBModel(tircline));
		}
		collection.insert(objectsInserting);
	}

	public BasicDBObject loadConfiguration(String env) {
		DBCollection collection = tircDb
				.getCollection(COLLECTION_CONFIGURATION);
		BasicDBObject dbObject = (BasicDBObject) collection
				.findOne(new BasicDBObject("_id", env));
		return dbObject;
	}
}
