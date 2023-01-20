package com.thschmitz.realstate.domain.services.exception;

public class MissingRequestHeaderException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public MissingRequestHeaderException(String msg) {
		super(msg);
	}

}
