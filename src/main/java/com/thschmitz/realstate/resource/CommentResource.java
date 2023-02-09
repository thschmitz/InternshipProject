package com.thschmitz.realstate.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.thschmitz.realstate.domain.Comment;
import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.dto.CommentDTO;
import com.thschmitz.realstate.services.CommentService;
import com.thschmitz.realstate.services.PostService;
import com.thschmitz.realstate.services.UserService;
import com.thschmitz.realstate.util.Session;
import com.thschmitz.realstate.util.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@RestController
@RequestMapping(value="/comments")
@CrossOrigin(origins = "*")
public class CommentResource {
	
	@Autowired
	private CommentService commentService;
	
	@Autowired 
	private PostService postService;
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<Comment>> findAll() {
		return ResponseEntity.ok().body(commentService.findAll());
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Comment> findById(@PathVariable String id) {
		return ResponseEntity.ok().body(commentService.findById(id));
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.POST)
	public ResponseEntity<Comment> create(@RequestBody Comment comment, @PathVariable String id, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		
		return ResponseEntity.ok().body(commentService.create(id, session, comment, postService, userService));
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable String id, @RequestHeader(value="JWT") String header) {
		Session.session(header);
		commentService.delete(id);
		
		return ResponseEntity.noContent().build();
	}
}
