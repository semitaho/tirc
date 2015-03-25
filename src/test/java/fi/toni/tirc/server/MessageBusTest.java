package fi.toni.tirc.server;

import java.util.Arrays;
import java.util.List;

import fi.toni.tirc.communication.MessageBus;
import org.junit.Before;

import fi.toni.tirc.util.TircIdGenerator;
import fi.toni.tirc.communication.TircLine;

public class MessageBusTest {

	private MessageBus bus;
	@Before
	public void setUp(){
		bus  = new MessageBus();
		bus.postCreate();
		TircIdGenerator.reset();
	}
	
	final List<TircLine> produceLogs(){
		TircLine tircLine = new TircLine();
		tircLine.setLine("this log");
		TircLine tircLine2 = new TircLine();
		tircLine2.setLine("next log");
		return Arrays.asList(tircLine, tircLine2);
	}
	
}
