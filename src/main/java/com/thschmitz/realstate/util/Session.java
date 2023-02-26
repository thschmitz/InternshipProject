package com.thschmitz.realstate.util;

import com.thschmitz.realstate.exception.ExpiredJwtException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

public class Session {
	public static Jws<Claims> session(String jwt){
		if(jwt != "") {
			return JWT.validateJWT(jwt);	
		} else {
			throw new ExpiredJwtException("JWT doesnt exist");
		}
		
	}
	
	public static String getSessionId(Jws<Claims> session) {
		String author_id = session.getBody().get("id").toString();
		
		return author_id;
	}
}
