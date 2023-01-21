package com.thschmitz.realstate.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.services.PostService;
import com.thschmitz.realstate.dto.CommentDTO;
import com.thschmitz.realstate.resource.util.Session;
import com.thschmitz.realstate.resource.util.URL;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@RestController
@RequestMapping(value="/posts")
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
	
	@RequestMapping(value="/titlesearch", method=RequestMethod.GET)
 	public ResponseEntity<List<Post>> findByTitle(@RequestParam(value="text", defaultValue="") String text) {
		text = URL.decodeParam(text);
		List<Post> list = service.findByTitle(text);
		return ResponseEntity.ok().body(list);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Post> insert(@RequestBody Post post, @RequestHeader(value="JWT") String header) {
		Session.session(header);
		return ResponseEntity.ok().body(service.insert(post));
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable String id, @RequestHeader(value="JWT") String header) {
		Session.session(header);
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Post> update(@RequestBody Post post, @PathVariable String id, @RequestHeader(value="JWT") String header) {
		Session.session(header);
		post.setId(id);
		return ResponseEntity.ok().body(service.update(post));
	}
	
	@RequestMapping(value="/like/{id}", method=RequestMethod.POST)
	public ResponseEntity<Post> like(@PathVariable String id, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		
		return ResponseEntity.ok().body(service.like(id, session));
	}
	
	@RequestMapping(value="/comment/{id}", method=RequestMethod.GET)
	public ResponseEntity<Post> like(@RequestBody CommentDTO comments, @PathVariable String id, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		
		return ResponseEntity.ok().body(service.comment(id, session, comments));
	}
}
