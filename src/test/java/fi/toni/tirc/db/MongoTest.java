/**
 *
 */
package fi.toni.tirc.db;


import static junit.framework
        .Assert.assertTrue;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

import fi.toni.tirc.communication.Measured;
import junit.framework.Assert;

import org.bson.Document;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import fi.toni.tirc.util.TircMessageParser;
import fi.toni.tirc.server.TircConfiguration;
import fi.toni.tirc.communication.TircLine;

/**
 * @author taho
 */
public class MongoTest {

    private fi.toni.tirc.db.Mongo mongo;

    @Before
    public void setUp() {
        mongo = new fi.toni.tirc.db.Mongo();
        mongo.postCreate();
    }

    @Test
    public void testFindLatestLocationsByNick() {
        List<Document> findLatestLocationsByNick = mongo.findLatestLocationsByNick("taho", "Chrome");
        assertTrue(findLatestLocationsByNick.size() > 0);
        System.out.println(findLatestLocationsByNick);

        TircLine parseArrived = TircMessageParser.parseArrived(findLatestLocationsByNick);
        System.out.println(parseArrived.getLine());
    }

    @Test
    public void testDeleteOld() {
        mongo.deleteOld("taho", "Chrome, Mobiili");
    }

    @Test
    public void testLoadConfigurationDev() {
        Document dbObject = mongo.loadConfiguration("dev");
        Assert.assertNotNull(dbObject);
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_SERVER_NICK_KEY));
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_SERVER_HOST_KEY));
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_SERVER_USER_KEY));
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_SERVER_CHANNEL_KEY));
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_SERVER_JOIN_MESSAGE_KEY));
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_SERVER_QUIT_MESSAGE_KEY));
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_INTERVAL_NAMES));
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_INTERVAL_WHOIS));
        Assert.assertTrue("server property does not exists", dbObject.containsKey("host"));
    }

    @Test
    public void testReadLogs() {
        List<TircLine> linesInserted = insertTestData();
        List<TircLine> linesRead = mongo.readLogs(LocalDate.of(2010, 5, 13));
        assertTrue(linesRead.size() > 0);
        Assert.assertEquals(linesInserted.size(), linesRead.size());
        for (TircLine line : linesRead) {
            Assert.assertEquals("plaaplaa", line.getLine());
        }
    }

    private List<TircLine> insertTestData() {
        Calendar cal = Calendar.getInstance();
        cal.set(2010, 4, 13, 5, 11);

        Calendar cal2 = Calendar.getInstance();
        cal2.set(2004, 10, 11, 11, 14);

        String testLine1 = "plaaplaa";
        String testLine2 = "plooploo";
        List<TircLine> lines1 = new ArrayList<TircLine>();
        List<TircLine> lines2 = new ArrayList<TircLine>();

        for (int i = 1; i <= 17; i++) {
            TircLine tircLine = new TircLine(cal.getTime());
            tircLine.setLine(testLine1);
            lines1.add(tircLine);
            TircLine tircLine2 = new TircLine(cal2.getTime());
            tircLine2.setLine(testLine2);
            lines2.add(tircLine2);
        }

        mongo.storeLogs(lines1);
        mongo.storeLogs(lines2);
        return lines1;

    }

    @After
    public void tearDown() {
        System.out.println("deleting logs...");
        mongo.deleteLogs(LocalDate.of(2004, 11, 11));
        System.out.println("Done.");
    }


    @Test
    public void testLoadConfigurationProd() {
        Document dbObject = mongo.loadConfiguration("prod");
        Assert.assertNotNull(dbObject);
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_SERVER_NICK_KEY));
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_SERVER_HOST_KEY));
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_SERVER_USER_KEY));
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_SERVER_CHANNEL_KEY));
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_SERVER_JOIN_MESSAGE_KEY));
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_SERVER_QUIT_MESSAGE_KEY));
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_INTERVAL_NAMES));
        Assert.assertTrue(dbObject.containsKey(TircConfiguration.TIRC_INTERVAL_WHOIS));

        Assert.assertTrue("server property does not exists", dbObject.containsKey("host"));


    }

    @Test
    public void testLoadConfigurationNotExists() {
        Document dbObject = mongo.loadConfiguration("devaaa");
        Assert.assertNull(dbObject);
    }


}
