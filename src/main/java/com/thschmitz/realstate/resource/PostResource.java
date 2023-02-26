package com.thschmitz.realstate.resource;

import java.util.Date;
import java.util.List;

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

import com.thschmitz.realstate.domain.Posts;
import com.thschmitz.realstate.services.FeedbackService;
import com.thschmitz.realstate.services.PostService;
import com.thschmitz.realstate.util.Session;
import com.thschmitz.realstate.util.URL;
import com.thschmitz.realstate.util.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@RestController
@RequestMapping(value="/posts")
@CrossOrigin(origins = "*")
public class PostResource {

	@Autowired
	private PostService postService;
	
	@Autowired
	private FeedbackService feedbackService;
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<Posts>> findAll() {
		return ResponseEntity.ok().body(postService.findAll());
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Posts> findById(@PathVariable String id) {
		Posts post = postService.findById(id);
		
		return ResponseEntity.ok().body(post);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Posts> update(@RequestBody Posts post, @PathVariable String id, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		String author_id = Session.getSessionId(session);
		
		Util.isAllowed(id, author_id, postService);
		
		post.setId(id);
		
		return ResponseEntity.ok().body(postService.update(post));
	}
	
	@RequestMapping(value="/titlesearch", method=RequestMethod.GET)
 	public ResponseEntity<List<Posts>> findByTitle(@RequestParam(value="text", defaultValue="") String title) {
		title = URL.decodeParam(title);
		List<Posts> list = postService.findByTitle(title);
		return ResponseEntity.ok().body(list);
	}
	
	@RequestMapping(value="/bodysearch", method=RequestMethod.GET)
	public ResponseEntity<List<Posts>> findByBody(@RequestParam(value="text", defaultValue="") String body) {
		body = URL.decodeParam(body);
		List<Posts> list = postService.findByBody(body);
		return ResponseEntity.ok().body(list);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Posts> insert(@RequestBody Posts post, @RequestHeader(value="JWT") String header) {
		
		Jws<Claims> session = Session.session(header);
		Date created_at = new Date();
		post.setCreated_at(created_at);
		return ResponseEntity.ok().body(postService.insert(post, session));
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable String id, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		String author_id = Session.getSessionId(session);
		
		Util.isAllowed(id, author_id, postService);
		
		postService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(value="/profile/{id}", method=RequestMethod.GET)
	public ResponseEntity<List<Posts>> getProfilePosts(@PathVariable String id) {
		return ResponseEntity.ok().body(postService.getPostByProfileId(id));
	}
	
	@RequestMapping(value="/feedback/{id}", method=RequestMethod.POST) 
	public ResponseEntity<Void> feedback(@PathVariable String id, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		String author_id = Session.getSessionId(session);

		feedbackService.like(id, author_id);
		
		return ResponseEntity.noContent().build();
	}
}
