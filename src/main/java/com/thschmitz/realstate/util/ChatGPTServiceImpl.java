package com.thschmitz.realstate.util;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.thschmitz.realstate.config.ChatGPTConfig;
import com.thschmitz.realstate.domain.chatgpt.BotRequest;
import com.thschmitz.realstate.domain.chatgpt.ChatGptRequest;
import com.thschmitz.realstate.domain.chatgpt.ChatGptResponse;
import com.thschmitz.realstate.services.chatgpt.ChatGPTService;

@Service
public class ChatGPTServiceImpl implements ChatGPTService{

    private static RestTemplate restTemplate = new RestTemplate();

    //    Build headers
    public HttpEntity<ChatGptRequest> buildHttpEntity(ChatGptRequest chatRequest) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(ChatGPTConfig.MEDIA_TYPE));
        headers.add(ChatGPTConfig.AUTHORIZATION, ChatGPTConfig.BEARER + ChatGPTConfig.API_KEY);
        return new HttpEntity<>(chatRequest, headers);
    }

    //    Generate response
    public ChatGptResponse getResponse(HttpEntity<ChatGptRequest> chatRequestHttpEntity) {
        ResponseEntity<ChatGptResponse> responseEntity = restTemplate.postForEntity(
                ChatGPTConfig.URL,
                chatRequestHttpEntity,
                ChatGptResponse.class);

        return responseEntity.getBody();
    }

    public ChatGptResponse askQuestion(BotRequest botRequest) {
    	System.out.println(ChatGPTConfig.MODEL);
    	System.out.println(botRequest.getMessage());
    	System.out.println(ChatGPTConfig.TEMPERATURE);
    	System.out.println(ChatGPTConfig.TOP_P);
        return this.getResponse(
                this.buildHttpEntity(
                        new ChatGptRequest(
                                ChatGPTConfig.MODEL,
                                botRequest.getMessage(),
                                ChatGPTConfig.TEMPERATURE,
                                ChatGPTConfig.MAX_TOKEN,
                                ChatGPTConfig.TOP_P)));
    }
}
