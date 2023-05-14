package com.thschmitz.realstate.domain.chatgpt;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatGptRequest implements Serializable {
    private static final long serialVersionUID = 1L;
    
	private String model;
    private String prompt;
    private Double temperature;
    @JsonProperty("max_tokens")
    private Integer maxTokens;
    @JsonProperty("top_p")
    private Double topP;
    
	public ChatGptRequest(String model, String prompt, Double temperature, Integer maxTokens, Double topP) {
		super();
		this.model = model;
		this.prompt = prompt;
		this.temperature = temperature;
		this.maxTokens = maxTokens;
		this.topP = topP;
	}
    
    
}
