package com.thschmitz.realstate.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.thschmitz.realstate.domain.Users;

public class Password {
	
	public static String encodePassword(Users obj) {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		String bCryptedPassword = bCryptPasswordEncoder.encode(obj.getPassword());
		
		return bCryptedPassword;
	}
	
	public static Boolean matchPassword(Users obj, Users newObj) {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		boolean passwordIsValid = bCryptPasswordEncoder.matches(obj.getPassword(), newObj.getPassword());
		
		return passwordIsValid;
	}
}
