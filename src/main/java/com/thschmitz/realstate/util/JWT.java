package com.thschmitz.realstate.util;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.exception.ExpiredJwtException;
import com.thschmitz.realstate.exception.InvalidJWT;
import com.thschmitz.realstate.exception.MissingRequestHeaderException;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWT {
	public static String createJWT(User newObj) {
		try {
			Dotenv dotenv = Dotenv.configure().directory("./.env").load();
			String role;
			String secret = dotenv.get("secret_JWT");
			Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(secret), 
	                SignatureAlgorithm.HS256.getJcaName());
			
			if(newObj.isEmpty()) {
				throw new MissingRequestHeaderException("This action requires a user!");
			}
			
			if(newObj.getAdmin()) {
				role = "Admin";
			} else {
				role = "User";
			}
			
			Instant now = Instant.now();
			String jwtToken = Jwts.builder()
			        .claim("id", newObj.getId())
			        .setSubject(newObj.getName())
			        .setSubject(role)
			        .setIssuedAt(Date.from(now))
			        .setExpiration(Date.from(now.plus(10l, ChronoUnit.HOURS)))
			        .signWith(hmacKey)
			        .compact();
			
			return jwtToken;	
		} catch(NullPointerException e) {
			throw new NullPointerException(null);
		}
		
	}
	
	public static Jws<Claims> validateJWT(String jwt) throws ExpiredJwtException, MissingRequestHeaderException {
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
	    } catch(ExpiredJwtException e) {
	    	throw new ExpiredJwtException("JWT expirou");
	    } catch(MalformedJwtException e) {
	    	throw new InvalidJWT("O JWT está incorreto");
	    } catch(IllegalArgumentException e) { 
	    	throw new MissingRequestHeaderException("JWT não existe");
	    }
	}
}
