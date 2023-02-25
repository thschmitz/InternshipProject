package com.thschmitz.realstate.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.thschmitz.realstate.domain.Feedbacks;
import com.thschmitz.realstate.services.FeedbackService;

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
}
