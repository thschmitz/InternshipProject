package com.thschmitz.realstate.resource.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.thschmitz.realstate.domain.User;

public class Security {
	public static String encodePassword(User obj) {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		String bCryptedPassword = bCryptPasswordEncoder.encode(obj.getPassword());
		
		return bCryptedPassword;
	}
	
	public static Boolean matchPassword(User obj, User newObj) {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		String bCryptedPassword = bCryptPasswordEncoder.encode(obj.getPassword());
		
		boolean passwordIsValid = bCryptPasswordEncoder.matches(obj.getPassword(), newObj.getPassword());
		
		return passwordIsValid;
	}
}
