package com.thschmitz.realstate.domain.services.exception;

public class ExpiredJwtException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public ExpiredJwtException(String msg) {
		super(msg);
	}
}
