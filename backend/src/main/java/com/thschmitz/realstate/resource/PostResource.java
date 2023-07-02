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
import com.thschmitz.realstate.domain.chatgpt.BotRequest;
import com.thschmitz.realstate.domain.chatgpt.ChatGptResponse;
import com.thschmitz.realstate.services.FeedbackService;
import com.thschmitz.realstate.services.PostService;
import com.thschmitz.realstate.services.chatgpt.ChatGPTService;
import com.thschmitz.realstate.util.Session;
import com.thschmitz.realstate.util.URL;
import com.thschmitz.realstate.util.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value="/posts")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PostResource {

	@Autowired
	private PostService postService;
	
	@Autowired
	private FeedbackService feedbackService;
	
	@Autowired
	private ChatGPTService chatGPTService;
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<Post>> findAll() {
		return ResponseEntity.ok().body(postService.findAll());
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Post> findById(@PathVariable Integer id) {
		Post post = postService.findById(id);
		
		return ResponseEntity.ok().body(post);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Post> update(@RequestBody Post post, @PathVariable Integer id, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		post.setId(id);
		
		Util.isAdmin(session);
		return ResponseEntity.ok().body(postService.update(post));
	}
	
	@RequestMapping(value="/titlesearch", method=RequestMethod.GET)
 	public ResponseEntity<List<Post>> findByTitle(@RequestParam(value="text", defaultValue="") String title) {
		title = URL.decodeParam(title);
		List<Post> list = postService.findByTitle(title);
		return ResponseEntity.ok().body(list);
	}
	
	@RequestMapping(value="/bodysearch", method=RequestMethod.GET)
	public ResponseEntity<List<Post>> findByBody(@RequestParam(value="text", defaultValue="") String body) {
		body = URL.decodeParam(body);
		List<Post> list = postService.findByBody(body);
		return ResponseEntity.ok().body(list);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Post> insert(@RequestBody Post post, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		Date created_at = new Date();
		post.setCreated_at(created_at);
		return ResponseEntity.ok().body(postService.insert(post, session));
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Integer id, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		Util.isAdmin(session);
		postService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(value="/profile/{id}", method=RequestMethod.GET)
	public ResponseEntity<List<Post>> getProfilePosts(@PathVariable Integer id) {
		return ResponseEntity.ok().body(postService.getPostByProfileId(id));
	}

	@RequestMapping(value="/send", method=RequestMethod.POST)
	public ResponseEntity<ChatGptResponse> sendMessage(@RequestBody BotRequest botRequest) {
		ChatGptResponse cgr = chatGPTService.askQuestion(botRequest);
		return ResponseEntity.ok().body(cgr);
	}
}
