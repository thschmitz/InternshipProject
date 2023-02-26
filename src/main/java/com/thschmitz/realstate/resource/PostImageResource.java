package com.thschmitz.realstate.resource;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.thschmitz.realstate.domain.PostsImages;
import com.thschmitz.realstate.services.PostImageService;
import com.thschmitz.realstate.util.Session;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@RestController
@RequestMapping(value="/postimage")
@CrossOrigin(origins = "*")
public class PostImageResource {

	@Autowired
	private PostImageService postImageService;
	
	@RequestMapping(value="/{id}", method=RequestMethod.POST)
	public ResponseEntity<PostsImages> insert(@RequestBody PostsImages images, @PathVariable String id, @RequestHeader(value="JWT") String header) {
		Jws<Claims> session = Session.session(header);
		Date created_at = new Date();
		
		images.setCreated_at(created_at);
		images.setPostId(id);
		
		return ResponseEntity.ok().body(postImageService.insert(images));
	}
}
