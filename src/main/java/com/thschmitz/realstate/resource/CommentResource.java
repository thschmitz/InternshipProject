package com.thschmitz.realstate.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.services.CommentService;
import com.thschmitz.realstate.domain.services.PostService;
import com.thschmitz.realstate.domain.services.UserService;
import com.thschmitz.realstate.dto.CommentDTO;
import com.thschmitz.realstate.resource.util.Session;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@RestController
@RequestMapping(value="/comments")
public class CommentResource {
	
	@Autowired
	private CommentService commentService;
	
	@Autowired 
	private PostService postService;
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value="/{id}", method=RequestMethod.POST)
	public ResponseEntity<Post> create(@RequestBody CommentDTO comments, @PathVariable String id, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		
		return ResponseEntity.ok().body(commentService.create(id, session, comments, postService, userService));
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable String id, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		
		System.out.println(session);
		
		commentService.delete(id, session, postService);
		
		return ResponseEntity.noContent().build();
	}
}
