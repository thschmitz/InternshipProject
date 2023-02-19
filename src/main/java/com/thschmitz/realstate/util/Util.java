package com.thschmitz.realstate.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.exception.ParseException;
import com.thschmitz.realstate.exception.Unauthorized;
import com.thschmitz.realstate.services.PostService;
import com.thschmitz.realstate.services.UserService;

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
	
	public static void isAllowed(String id_post, String id_author, PostService service) {
		Post post = service.findById(id_post);
		
		if(!post.getAuthorId().equals(id_author)) {
			throw new Unauthorized("You can't do this request because you are not allowed to!");
		}
	}
}
