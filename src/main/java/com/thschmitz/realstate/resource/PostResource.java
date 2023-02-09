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

import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.dto.CommentDTO;
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
	private PostService service;
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<Post>> findAll() {
		return ResponseEntity.ok().body(service.findAll());
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Post> findById(@PathVariable String id) {
		Post post = service.findById(id);
		
		return ResponseEntity.ok().body(post);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Post> update(@RequestBody Post post, @PathVariable String id, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		String author_id = Session.getSessionId(session);
		
		Util.isAllowed(id, author_id, service);
		
		post.setId(id);
		
		return ResponseEntity.ok().body(service.update(post));
	}
	
	@RequestMapping(value="/titlesearch", method=RequestMethod.GET)
 	public ResponseEntity<List<Post>> findByTitle(@RequestParam(value="text", defaultValue="") String title) {
		title = URL.decodeParam(title);
		List<Post> list = service.findByTitle(title);
		return ResponseEntity.ok().body(list);
	}
	
	@RequestMapping(value="/bodysearch", method=RequestMethod.GET)
	public ResponseEntity<List<Post>> findByBody(@RequestParam(value="text", defaultValue="") String body) {
		body = URL.decodeParam(body);
		List<Post> list = service.findByBody(body);
		return ResponseEntity.ok().body(list);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Post> insert(@RequestBody Post post, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		Date created_at = new Date();
		post.setCreated_at(created_at);
		return ResponseEntity.ok().body(service.insert(post, session));
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable String id, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		String author_id = Session.getSessionId(session);
		
		Util.isAllowed(id, author_id, service);
		
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	/*@RequestMapping(value="/{id}/comments", method=RequestMethod.GET)
	public ResponseEntity<List<CommentDTO>> commentsByPost(@PathVariable String id) {
		List<CommentDTO> comments = service.commentsByPost(id);
		
		return ResponseEntity.ok().body(comments);
	}*/
}
