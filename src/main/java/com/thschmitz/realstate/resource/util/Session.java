package com.thschmitz.realstate.resource.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

public class Session {
	public static Jws<Claims> session(String jwt){
		return JWT.validateJWT(jwt);
	}
	
	public static String getSessionId(Jws<Claims> session) {
		String author_id = session.getBody().get("id").toString();
		
		return author_id;
	}
}
