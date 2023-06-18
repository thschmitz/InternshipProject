package com.thschmitz.realstate.tests.resources;

import static org.junit.Assert.assertTrue;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
public class UserTest {
	@Test
	@DisplayName("Assegurando que o user findAll está conectado")
	void testingStatusCodeOfFindAllUsers() throws Exception {
		HttpClient client = HttpClient.newBuilder().build();
		HttpRequest request = HttpRequest.newBuilder().uri(URI.create("http://localhost:8080/users")).build();
		
		HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
		Boolean statusIs200 = response.statusCode() == 200;
		System.out.println(response.body());
		assertTrue(statusIs200);
	}
	
	@Test
	@DisplayName("Assegurando que me retorna um erro de sessão - MissingRequestHeaderException")
	void returningMissingRequestHeaderExceptionWhenAccessingTheSession() throws Exception {
		HttpClient client = HttpClient.newBuilder().build();
		HttpRequest request = HttpRequest.newBuilder().uri(URI.create("http://localhost:8080/session")).build();
		
		HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
		Boolean statusIs404 = response.statusCode() == 404;
		assertTrue(statusIs404);
	}
}
