package com.thschmitz.realstate.resource.util;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

import javax.crypto.spec.SecretKeySpec;
import javax.security.sasl.AuthenticationException;

import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.domain.services.exception.ExpiredJwtException;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWT {
	public static String createJWT(User newObj) {
		Dotenv dotenv = Dotenv.configure().directory("./.env").load();
		
		String secret = dotenv.get("secret_JWT");
		Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(secret), 
                SignatureAlgorithm.HS256.getJcaName());
		
		Instant now = Instant.now();
		String jwtToken = Jwts.builder()
		        .claim("name", newObj.getName())
		        .claim("email", newObj.getEmail())
		        .claim("id", newObj.getId())
		        .setSubject(newObj.getName())
		        .setId(UUID.randomUUID().toString())
		        .setIssuedAt(Date.from(now))
		        .setExpiration(Date.from(now.plus(10l, ChronoUnit.SECONDS)))
		        .signWith(hmacKey)
		        .compact();
		
		return jwtToken;
	}
	
	public static Jws<Claims> validateJWT(String jwt) {
		Dotenv dotenv = Dotenv.configure().directory("./.env").load();
		
		String secret = dotenv.get("secret_JWT");
	    Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(secret), 
                SignatureAlgorithm.HS256.getJcaName());
	    
	    try {
	    	Jws<Claims> jwtResponse = Jwts.parserBuilder()
		            .setSigningKey(hmacKey)
		            .build()
		            .parseClaimsJws(jwt);
	    	
	    	return jwtResponse;
	    } catch(io.jsonwebtoken.ExpiredJwtException e) {
	    	throw new ExpiredJwtException(e.getMessage());
	    }
	    
	    
	}
}
