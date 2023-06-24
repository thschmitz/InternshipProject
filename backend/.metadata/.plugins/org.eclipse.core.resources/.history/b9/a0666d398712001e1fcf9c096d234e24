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
import com.thschmitz.realstate.services.CommentService;
import com.thschmitz.realstate.util.Session;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@RestController
@RequestMapping(value="/comments")
@CrossOrigin(origins = "*")
public class CommentResource {
	
	@Autowired
	private CommentService commentService;
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<Comment>> findAll() {
		return ResponseEntity.ok().body(commentService.findAll());
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Comment> findById(@PathVariable Integer id) {
		return ResponseEntity.ok().body(commentService.findById(id));
	}
	
	@RequestMapping(value="/post/{id}", method=RequestMethod.GET)
	public ResponseEntity<List<Comment>> findCommentsByPost(@PathVariable Integer id) {
		return ResponseEntity.ok().body(commentService.findCommentsByPost(id));
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.POST)
	public ResponseEntity<Comment> create(@RequestBody Comment comment, @PathVariable Integer id, @RequestHeader(value="JWT") String header) {
		System.out.println("Entrou dentro do commentPost");
		System.out.println(comment.getText());
		Jws<Claims> session = Session.session(header);
		Integer author_id = Session.getSessionId(session);
		
		
		
		return ResponseEntity.ok().body(commentService.create(id, comment, author_id));
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Integer id, @RequestHeader(value="JWT") String header) {
		Session.session(header);
		commentService.delete(id);
		
		return ResponseEntity.noContent().build();
	}
}
