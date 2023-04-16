package com.thschmitz.realstate.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.thschmitz.realstate.domain.Feedbacks;
import com.thschmitz.realstate.services.FeedbackService;
import com.thschmitz.realstate.util.Session;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@RestController
@RequestMapping(value="/feedbacks")
@CrossOrigin(origins = "*")
public class FeedbackResource {

	@Autowired
	private FeedbackService feedbackService;
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<Feedbacks>> findAll() {
		return ResponseEntity.ok().body(feedbackService.findAll());
	}
	
	@RequestMapping(value="/post/{id}", method=RequestMethod.POST)
	public ResponseEntity<Feedbacks> like(@PathVariable Integer id, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		Integer author_id = Session.getSessionId(session);
		return ResponseEntity.ok().body(feedbackService.like(id, author_id));
	}
	
	@RequestMapping(value="/post/{id}", method=RequestMethod.GET)
	public ResponseEntity<List<Feedbacks>> findByPost(@PathVariable Integer id) {
		return ResponseEntity.ok().body(feedbackService.findFeedbacksByPost(id));
	}
}
