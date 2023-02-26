package com.thschmitz.realstate.util;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import com.thschmitz.realstate.domain.Users;
import com.thschmitz.realstate.exception.ExpiredJwtException;
import com.thschmitz.realstate.exception.InvalidJWT;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWT {
	public static String createJWT(Users newObj) {
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
		        .setExpiration(Date.from(now.plus(2l, ChronoUnit.SECONDS)))
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
	    	throw new ExpiredJwtException("JWT has expired");
	    } catch(io.jsonwebtoken.security.SignatureException s) {
	    	throw new InvalidJWT("You arent logged in!");
	    }
	    
	    
	}
}
