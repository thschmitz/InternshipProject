package com.thschmitz.realstate.util;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import com.thschmitz.realstate.domain.Users;
import com.thschmitz.realstate.exception.AuthenticationException;
import com.thschmitz.realstate.exception.ExpiredJwtException;
import com.thschmitz.realstate.exception.InvalidJWT;
import com.thschmitz.realstate.exception.ParseException;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWT {
	public static String createJWT(Users newObj) {
		try {
			Dotenv dotenv = Dotenv.configure().directory("./.env").load();
			
			String secret = dotenv.get("secret_JWT");
			Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(secret), 
	                SignatureAlgorithm.HS256.getJcaName());
			String role;
			
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
			        .setExpiration(Date.from(now.plus(10l, ChronoUnit.MINUTES)))
			        .signWith(hmacKey)
			        .compact();
			
			return jwtToken;	
		} catch(NullPointerException e) {
			throw new NullPointerException(null);
		}
		
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
	    	throw new ExpiredJwtException("JWT has expired");
	    } catch(io.jsonwebtoken.security.SignatureException s) {
	    	throw new NullPointerException("JWT doesn´t exist");
	    } catch(NullPointerException n) {
	    	throw new NullPointerException("JWT doesn´t exist");
	    }
	}
}
