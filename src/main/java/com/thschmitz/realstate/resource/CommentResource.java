package com.thschmitz.realstate.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.thschmitz.realstate.domain.Comment;
import com.thschmitz.realstate.domain.services.CommentService;

@RestController
@RequestMapping(value="/comments")
public class CommentResource {

	@Autowired
	private CommentService service;
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<Comment>> findAll() {
		return ResponseEntity.ok().body(service.findAll());
	}

	
}
