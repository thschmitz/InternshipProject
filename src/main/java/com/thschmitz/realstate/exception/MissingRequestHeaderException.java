package com.thschmitz.realstate.exception;

public class MissingRequestHeaderException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public MissingRequestHeaderException(String msg) {
		super(msg);
	}

}
