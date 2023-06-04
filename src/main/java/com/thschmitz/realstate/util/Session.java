package com.thschmitz.realstate.util;

import com.thschmitz.realstate.exception.InvalidJWT;
import com.thschmitz.realstate.exception.MissingRequestHeaderException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.MalformedJwtException;

public class Session {
	public static Jws<Claims> session(String jwt){
		System.out.println(jwt);
		try {
			return JWT.validateJWT(jwt);
		} catch(MalformedJwtException e) {
			throw new InvalidJWT("JWT Incorreto!");
		} catch(MissingRequestHeaderException e) {
			throw new MissingRequestHeaderException("O JWT não está informado");
		}
	}
	
	public static Integer getSessionId(Jws<Claims> session) {
		Integer author_id = (Integer) session.getBody().get("id");
		return author_id;
	}
}
