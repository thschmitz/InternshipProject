package com.thschmitz.realstate.exception;

public class InvalidJWT extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public InvalidJWT(String msg) {
		super(msg);
	}
}
