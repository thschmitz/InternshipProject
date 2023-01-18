package com.thschmitz.realstate.resource;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.domain.services.UserService;
import com.thschmitz.realstate.dto.UserDTO;

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
}
