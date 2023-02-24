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

import com.thschmitz.realstate.domain.Feedback;
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
	public ResponseEntity<List<Feedback>> findAll() {
		return ResponseEntity.ok().body(feedbackService.findAll());
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.POST) 
	public ResponseEntity<Void> like(@PathVariable String id, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		String author_id = Session.getSessionId(session);

		feedbackService.like(id, author_id);
		
		return ResponseEntity.noContent().build();
	}
	
}
