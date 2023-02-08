package com.thschmitz.realstate.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.services.UserService;

@RestController
@RequestMapping(path="/users")
public class UserResource {

	@Autowired
	private UserService service;
	
	@RequestMapping(method=RequestMethod.GET)
 	public ResponseEntity<Iterable<User>> findAll() {
		Iterable<User> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
}