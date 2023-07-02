package com.thschmitz.realstate.exception;

public class NonExistingJWTException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public NonExistingJWTException(String msg) {
		super(msg);
	}
}
