package com.thschmitz.realstate.domain.services.exception;

public class AuthenticationException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public AuthenticationException(String msg) {
		super(msg);
	}
}
