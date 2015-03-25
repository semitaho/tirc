package fi.toni.tirc.server;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import fi.toni.tirc.communication.IrcUser;
import fi.toni.tirc.communication.TircLine;

public class LogFileParser {

	
	public static final List<TircLine> addLogStart(List<TircLine> lines){
		Optional<TircLine> firstItem = lines.stream().findFirst();
		TircLine tircLine = null;
		if (firstItem.isPresent()){
			TircLine lineGot = firstItem.get();
			tircLine =populateLogevent(lineGot.getDate());
		} else {
			Date date = new Date();
			tircLine = populateLogevent(date);
		}
		List<TircLine> allLines =  new ArrayList<>();
		allLines.add(tircLine);
		allLines.addAll(lines);
		return allLines;
	}
	
	private static TircLine populateLogevent(Date time){
		TircLine tircLine = new TircLine();
		tircLine.setType("logevent");
		Calendar cal = Calendar.getInstance();
		cal.setTime(time);
		tircLine.setLine(cal.get(Calendar.DATE)+ "."+(cal.get(Calendar.MONTH) +1) + "."+cal.get(Calendar.YEAR));
		return tircLine;
	}
	
	public static Integer getDay(TircLine line){
		Calendar  cal = Calendar.getInstance();
		cal.setTime(line.getDate());
		return cal.get(Calendar.DATE);
	}
	
	public static final List<TircLine> addDayChange(List<TircLine> lines){
		
		List<Integer> dayIndices = new ArrayList<Integer>();
		for (int i = 0; i< lines.size()-1; i++){
			TircLine tircLine = lines.get(i);
			int dayval = getDay(tircLine);
			TircLine tircLine2 = lines.get(i+1);
			int dayval2 = getDay(tircLine2);
			if (dayval != dayval2){
				dayIndices.add(i+1);
			}	
		}
		ArrayList<TircLine> dayChangeLines = new ArrayList<>(lines);
		Integer indexRight = 0;
		for (Integer index : dayIndices){
			Date dayChangedDate = lines.get(index).getDate();
			Calendar cal = Calendar.getInstance();
			cal.setTime(dayChangedDate);
			Integer correctInd = index + indexRight;
			TircLine tircLine = new TircLine();
			tircLine.setType("logevent");
			String dateLine = cal.get(Calendar.DATE)+ "."+(cal.get(Calendar.MONTH)+1) + "."+cal.get(Calendar.YEAR);
			tircLine.setLine(String.format("Päivä vaihtui: %s", dateLine));
			dayChangeLines.add(correctInd, tircLine);
			indexRight++;
		}
		return dayChangeLines;
	}
	
	
	
	public static Map<String, IrcUser> parseNicksFromLine(
			Map<String, IrcUser> oldTircUsers, String line) {
		int lastIndexOf = line.lastIndexOf(":");
		String nicks = line.substring(lastIndexOf + 1).trim();
		String[] split = nicks.split(" ");
		Map<String, IrcUser> users = new HashMap<String, IrcUser>();
		for (String nick : split) {
			IrcUser user = null;
			if (nick.contains("@")) {
				user = new IrcUser(nick.substring(1));
			} else if (nick.contains("+")) {
				user = new IrcUser(nick.substring(1));
			} else {
				user = new IrcUser(nick);
			}
			IrcUser oldUser = oldTircUsers.get(user.getNick());
			if ((oldUser != null)) {
				user.setIdleTime(oldUser.getIdleTime());
			} 
			users.put(user.getNick(), user);
			
		}
		return users;
	}



}
