package com.thschmitz.realstate.resource;

import java.net.URI;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.domain.services.UserService;
import com.thschmitz.realstate.domain.services.exception.ExpiredJwtException;
import com.thschmitz.realstate.domain.services.exception.MissingRequestHeaderException;
import com.thschmitz.realstate.dto.UserDTO;
import com.thschmitz.realstate.resource.util.Session;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@RestController
@RequestMapping(value="/users")
public class UserResource {

	@Autowired
	private UserService service;
	
	@RequestMapping(method=RequestMethod.GET)
 	public ResponseEntity<List<UserDTO>> findAll() {
		List<User> list = service.findAll();
		List<UserDTO> listDto = list.stream().map(x -> new UserDTO(x)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDto);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<UserDTO> findById(@PathVariable String id) {
		User user = service.findById(id);
		
		return ResponseEntity.ok().body(new UserDTO(user));
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<String> insert(@RequestBody User user, HttpServletResponse response, @RequestHeader(value="JWT") String header) {
		Session.session(header);
		Date created_at = new Date();
		user.setCreated_at(created_at);
		
		String jwt = service.insert(user);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getId()).toUri();
		
		response.setHeader("JWT", jwt);
		
		return ResponseEntity.created(uri).body(jwt);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Void> update(@RequestBody User user, @PathVariable String id, @RequestHeader(value="JWT") String header) {
		Session.session(header);
		user.setId(id);
		user = service.update(user);
		
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<UserDTO> delete(@PathVariable String id, @RequestHeader(value="JWT") String header) {
		Session.session(header);
		service.delete(id);
		
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(value="/{id}/posts", method=RequestMethod.GET)
 	public ResponseEntity<List<Post>> findPosts(@PathVariable String id, @RequestHeader(value="JWT") String header) {
		Session.session(header);
		User obj = service.findById(id);
		return ResponseEntity.ok().body(obj.getPosts());
	}
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public ResponseEntity<String> login(@RequestBody User user, HttpServletResponse response) {
		String jwt = service.login(user);
		response.setHeader("JWT", jwt);
		
		return ResponseEntity.ok().body(jwt);
	}
	
	@RequestMapping(value="/session", method=RequestMethod.GET)
	public ResponseEntity<Jws<Claims>> session(@RequestHeader(value="JWT") String header) {
		
		if(header == null) {
			throw new MissingRequestHeaderException("You need to inform JWT header to request!");
		}
		
		return ResponseEntity.ok().body(Session.session(header));
	}
}