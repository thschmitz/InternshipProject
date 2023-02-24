package com.thschmitz.realstate.exception;

public class ParametersNotPassedException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ParametersNotPassedException(String msg) {
		super(msg);
	}
}
