package com.thschmitz.realstate.services.chatgpt;

import com.thschmitz.realstate.domain.chatgpt.BotRequest;
import com.thschmitz.realstate.domain.chatgpt.ChatGptResponse;

public interface ChatGPTService {

    ChatGptResponse askQuestion(BotRequest botRequest);
}