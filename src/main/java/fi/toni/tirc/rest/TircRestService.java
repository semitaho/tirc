package fi.toni.tirc.rest;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.TimeZone;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import fi.toni.tirc.dto.MessageBody;
import fi.toni.tirc.dto.TircType;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import com.mongodb.DBObject;

import fi.toni.tirc.util.TircIdGenerator;
import fi.toni.tirc.util.TircMessageFormatter;
import fi.toni.tirc.util.TircMessageParser;
import fi.toni.tirc.util.TircUtil;
import fi.toni.tirc.db.Mongo;
import fi.toni.tirc.communication.ChannelTopic;
import fi.toni.tirc.irc.ConnectionThread;
import fi.toni.tirc.server.LogFileParser;
import fi.toni.tirc.server.LogsReader;
import fi.toni.tirc.communication.Measured;
import fi.toni.tirc.communication.Measured.Source;
import fi.toni.tirc.communication.MessageBus;
import fi.toni.tirc.server.TircListenerThread;
import fi.toni.tirc.communication.TircLine;
import fi.toni.tirc.communication.TircUser;
import fi.toni.tirc.communication.TircUsers;

@RestController
@RequestMapping("/backend")
public class TircRestService {

    static Logger log = Logger.getLogger(TircRestService.class);

    @Autowired
    private ConnectionThread cthread;

    @Autowired
    private LogsReader reader;

    @Autowired
    private MessageBus bus;

    @Autowired
    private Mongo db;

    @Autowired
    private TircListenerThread listenerThread;

    public TircRestService() {

    }

    @RequestMapping("/connect/{nick}")
    public TircConnectData connect(@PathVariable String nick) {

        bus.registerWithNick(nick);
        //
        TircConnectData connectData = new TircConnectData();
        List<TircLine> todayLogs = db.readLogs();
        List<TircLine> logsWithStart = LogFileParser.addLogStart(todayLogs);
        List<TircLine> dayChangeStartLogs = LogFileParser
                .addDayChange(logsWithStart);
        connectData.setLogsData(dayChangeStartLogs);
        // haetaan vain #test1-data connectiin
        List<TircLine> test1Data = bus.getCurrentLines();
        connectData.setCurrentData(test1Data);
        connectData.setId(TircIdGenerator.generateId());
        connectData.setUsers(bus.getIrcUsers());
        if (bus.getTopic() != null) {
            connectData.setTopic(bus.getTopic().getTopic());
        }
        Collection<TircUser> tircUsers = bus.getTircUsers().getUsers().values();
        connectData.setTircusers(tircUsers);
        TircLine tircLine = TircUtil.mapToJoinLine(nick);
        bus.addNewLine(tircLine);
        return connectData;
    }

    @RequestMapping("/changestate")
    public void changeState(@RequestBody MessageBody message) {
        bus.changeState(message.getNick(), message.getState());
    }

    @RequestMapping("/serveDay/{day}")
    public TircConnectData serveDay(@PathVariable Long day) {
        Instant ofEpochMilli = Instant.ofEpochMilli(day);
        LocalDateTime now = LocalDateTime.ofInstant(ofEpochMilli, TimeZone
                .getDefault().toZoneId());
        List<TircLine> dayLogs = db.readLogs(now.toLocalDate());
        log.debug("date is: " + now);
        List<TircLine> arrayList = new ArrayList<>(dayLogs);
        TircConnectData tircData = new TircConnectData(arrayList);
        tircData.setTimestamp(day);
        return tircData;
    }

    @RequestMapping("/listen/{eventId}/{subscriber}")
    public
    @ResponseBody
    DeferredResult<TircListenResponse> listen(
            @PathVariable(value = "eventId") String eventId, @PathVariable("subscriber") String nick, HttpServletRequest request) {
        final long TIMEOUT = 5 * 60000;
        log.debug("starting to listen...");
        final DeferredResult<TircListenResponse> deferredResult = new DeferredResult<TircListenResponse>(
                TIMEOUT);
        deferredResult.onTimeout(() -> {
            TircListenResponse tircErrorResponse = new TircListenResponse();
            tircErrorResponse.setLastid(eventId);
            tircErrorResponse.setType(TircType.ERROR.getTypeName());
            deferredResult.setErrorResult(tircErrorResponse);
        });


        Runnable runnable = () -> {
            ArrayBlockingQueue<Measured> queue = listenerThread.init(eventId, nick);
            try {
                Measured measures = queue.take();
                TircListenResponse tircListenResponse = new TircListenResponse();
                tircListenResponse.setLastid(eventId);
                tircListenResponse.setData(getResponseData(measures));
                tircListenResponse.setType(measures.getReceiveType());
                deferredResult.setResult(tircListenResponse);
            } catch (InterruptedException irre) {
                log.warn("error", irre);
            }
        };

        Thread thread = new Thread(runnable);
        thread.start();
        return deferredResult;
    }

    private Object getResponseData(Measured measured) {
        if (measured instanceof ChannelTopic) {
            ChannelTopic topic = (ChannelTopic) measured;
            return topic.getTopic();
        }
        if (measured instanceof TircUsers) {
            TircUsers tircusers = (TircUsers) measured;
            return tircusers.getUsers().values();
        }
        return measured;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/say")
    public void say(@RequestBody MessageBody message) {
        String text = message.getText();
        log.debug("text is: "+text+", target: "+message.getTarget());
        String nick = message.getNick();
        TircLine tircLine = new TircLine(Source.TIRC);
        tircLine.setType("comment");
        tircLine.setLine(TircMessageFormatter.formatComment(text));
        tircLine.setNick(nick);
        tircLine.setTarget(message.getTarget());
        bus.addNewLine(tircLine);
        if (tircLine.getTarget() == null) {
            cthread.writeLine("PRIVMSG " + cthread.getChannel() + " :(" + nick
                    + "): " + text);
        }
    }

    @RequestMapping(value = "/saywelcome", method = RequestMethod.POST)
    public void     sayWelcome(HttpServletRequest request,
                           @RequestBody MessageBody message) {
        String location = message.getLocation().getLocation();
        String nick = message.getNick();
        log.debug("current location: " + location);
        String browser = TircUtil.resolveUserAgent(request);
        db.saveLocation(message, browser);
        List<DBObject> locations = db.findLatestLocationsByNick(nick, browser);
        TircLine line = TircMessageParser.parseArrived(locations);
        String formattedLine = TircMessageFormatter.formatComment(line.getLine());
        String lineStr = line.getLine();
        line.setLine(formattedLine);
        bus.addNewLine(line);
        cthread.writeLine("PRIVMSG "+cthread.getChannel()+" :\u0001ACTION saapui paikalle nickillä "+nick+" "+lineStr);
    }

    @RequestMapping(value = "/saygoodbye", method = RequestMethod.POST)
    public void sayGoodbye(@RequestBody MessageBody message) {
        String nick = message.getNick();
        TircLine tircLineGoodbye = TircMessageParser.parseGoodbye(nick);
        bus.addNewLine(tircLineGoodbye);
        cthread.writeLine("PRIVMSG "+cthread.getChannel()+" :\u0001ACTION poistui paikalta nickillä "+nick);
    }

    @RequestMapping(value = "/updatelocation", method = RequestMethod.POST)
    public void updateLocation(HttpServletRequest request,
                               @RequestBody MessageBody message) {
        String browser = TircUtil.resolveUserAgent(request);
        log.debug("location has changed, nick: " + message.getNick()
                + ", lat: " + message.getLocation().getLat() + ", lon: "
                + message.getLocation().getLon());
        db.saveLocation(message, browser);
    }

    @RequestMapping(value = "/changenick", method = RequestMethod.POST)
    public void changeNick(@RequestBody MessageBody message) {
        String oldnick = message.getNickold();
        String newnick = message.getNick();
        String line = "PRIVMSG " + cthread.getChannel()
                + " :\u0001ACTION vaihtoi nimimerkin " + oldnick
                + " nimimerkkiin " + newnick;
        cthread.writeLine(line);
    }

}
