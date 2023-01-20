package com.thschmitz.realstate.resource.exception;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.thschmitz.realstate.domain.services.exception.AuthenticationException;
import com.thschmitz.realstate.domain.services.exception.ObjectNotFoundException;
import com.thschmitz.realstate.domain.services.exception.ParametersNotPassedException;

@ControllerAdvice
public class ResourceExceptionHandler {
	
	@ExceptionHandler(ObjectNotFoundException.class) // Quando rodar a classe ObjectNotFoundException, ele vai rodar o codigo abaixo
	public ResponseEntity<StandardError> objectNotFound(ObjectNotFoundException e, HttpServletRequest request) {
		
		HttpStatus status = HttpStatus.NOT_FOUND;
		StandardError err = new StandardError(System.currentTimeMillis(), status.value(), "Not found", e.getMessage(), request.getRequestURI()); // esse request pega o caminho onde tu vai colocar o id do usuario que tu quer procurar
		
		
		return ResponseEntity.status(status).body(err);
	}
	
	@ExceptionHandler(ParametersNotPassedException.class) 
	public ResponseEntity<StandardError> parameterNotPassed(ParametersNotPassedException e, HttpServletRequest request) {
		
		HttpStatus status = HttpStatus.PAYMENT_REQUIRED;
		StandardError err = new StandardError(System.currentTimeMillis(), status.value(), "Parameter not passed!", e.getMessage(), request.getRequestURI()); // esse request pega o caminho onde tu vai colocar o id do usuario que tu quer procurar
		
		
		return ResponseEntity.status(status).body(err);
	}
	
	@ExceptionHandler(AuthenticationException.class) 
	public ResponseEntity<StandardError> authenticationException(AuthenticationException e, HttpServletRequest request) {
		
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		StandardError err = new StandardError(System.currentTimeMillis(), status.value(), "Authorization Exception", e.getMessage(), request.getRequestURI()); // esse request pega o caminho onde tu vai colocar o id do usuario que tu quer procurar
		
		
		return ResponseEntity.status(status).body(err);
	}
}
