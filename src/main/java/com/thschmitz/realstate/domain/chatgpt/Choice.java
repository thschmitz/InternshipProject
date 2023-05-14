package com.thschmitz.realstate.domain.chatgpt;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Choice implements Serializable {
	private Integer index;
    private String text;
    @JsonProperty("finish_reason")
    private String finishReason;
}
