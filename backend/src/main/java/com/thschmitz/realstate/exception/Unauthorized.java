package com.thschmitz.realstate.exception;

public class Unauthorized extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public Unauthorized(String msg) {
		super(msg);
	}
}
