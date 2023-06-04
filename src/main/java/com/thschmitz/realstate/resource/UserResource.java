package com.thschmitz.realstate.resource;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.repository.UserRepository;
import com.thschmitz.realstate.services.UserService;
import com.thschmitz.realstate.util.Session;
import com.thschmitz.realstate.util.URL;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@RestController
@RequestMapping(value="/users")
@CrossOrigin(origins = "*")
public class UserResource {

	@Autowired
	private UserService service;
	
	private UserRepository userRepository;
	
	@RequestMapping(method=RequestMethod.GET)
 	public ResponseEntity<Iterable<User>> findAll() {
		Iterable<User> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<User> findById(@PathVariable Integer id) {
		User user = service.findById(id);
		
		return ResponseEntity.ok().body(user);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<String> insert(@RequestBody User user, HttpServletResponse response){
		Date created_at = new Date();
		user.setCreated_at(created_at);
		
		String jwt = service.insert(user);
		
		return ResponseEntity.ok().body(jwt);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<User> update(@RequestBody User user, @PathVariable Integer id, @RequestHeader(value="JWT") String header) {
		Session.session(header);
		user.setId(id);
		user = service.update(user);
		
		return ResponseEntity.ok().body(user);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Integer id, @RequestHeader(value="JWT") String header) {
		Session.session(header);
		service.delete(id);
		
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public ResponseEntity<String> login(@RequestBody User user, HttpServletResponse response) {
		String jwt = service.login(user);
		response.setHeader("JWT", jwt);
		
		return ResponseEntity.ok().body(jwt);
	}
	
	@RequestMapping(value="/session", method=RequestMethod.GET)
	public ResponseEntity<Jws<Claims>> session(@RequestHeader(value="JWT") String header) {
		return ResponseEntity.ok().body(Session.session(header));	
	}
	
	@RequestMapping(value="/namesearch", method=RequestMethod.GET)
	public ResponseEntity<List<User>> findByText(@RequestParam(value="text", defaultValue="") String text) {
		text = URL.decodeParam(text);
		List<User> list = service.findbyText(text);
		
		return ResponseEntity.ok().body(list);
	}
}