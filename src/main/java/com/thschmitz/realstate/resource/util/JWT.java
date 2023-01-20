package com.thschmitz.realstate.resource.util;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

import javax.crypto.spec.SecretKeySpec;

import com.thschmitz.realstate.domain.User;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWT {
	public static String createJWT(User newObj) {
		Dotenv dotenv = Dotenv.configure().directory("./.env").load();
		
		String secret = dotenv.get("secret_JWT");
		System.out.println(secret);
		Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(secret), 
                SignatureAlgorithm.HS256.getJcaName());
		
		Instant now = Instant.now();
		String jwtToken = Jwts.builder()
		        .claim("name", newObj.getName())
		        .claim("email", newObj.getEmail())
		        .setSubject(newObj.getName())
		        .setId(UUID.randomUUID().toString())
		        .setIssuedAt(Date.from(now))
		        .setExpiration(Date.from(now.plus(5l, ChronoUnit.MINUTES)))
		        .signWith(hmacKey)
		        .compact();
		
		return jwtToken;
	}
}
