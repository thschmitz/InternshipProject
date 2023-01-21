package com.thschmitz.realstate.resource.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.domain.services.UserService;
import com.thschmitz.realstate.domain.services.exception.ParseException;

public class Util {
	public static Date formatDate(Date date) {
		try {
			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			String preFormatted = dateFormat.format(date);
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
			sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
			
			return sdf.parse(preFormatted);
		} catch (java.text.ParseException e) {
			// TODO Auto-generated catch block
			throw new ParseException("Error while parsing date value");
		}
	}
	
	
	public static User toUser(String id, UserService service) {
		return service.findById(id);
	}
}
