package com.thschmitz.realstate.domain.chatgpt;

import java.io.Serializable;

import lombok.Data;

@Data
public class BotRequest implements Serializable {
    
	private String message;
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
}