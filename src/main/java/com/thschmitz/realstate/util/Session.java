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
	
	public static Integer getSessionId(Jws<Claims> session) {
		Integer author_id = (Integer) session.getBody().get("id");
		
		return author_id;
	}
}
