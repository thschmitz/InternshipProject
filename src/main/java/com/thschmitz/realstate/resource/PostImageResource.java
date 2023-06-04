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
import org.springframework.web.bind.annotation.RestController;

import com.thschmitz.realstate.domain.PostImage;
import com.thschmitz.realstate.exception.ParametersNotPassedException;
import com.thschmitz.realstate.services.PostImageService;
import com.thschmitz.realstate.services.PostService;
import com.thschmitz.realstate.util.Session;

@RestController
@RequestMapping(value="/postimage")
@CrossOrigin(origins = "*")
public class PostImageResource {

	@Autowired
	private PostImageService postImageService;
	
	@Autowired
	private PostService postService;
	
	@RequestMapping(value="/{id}", method=RequestMethod.POST)
	public ResponseEntity<PostImage> insert(@RequestBody PostImage images, @PathVariable Integer id, @RequestHeader(value="JWT") String header) {
		Session.session(header);
		postService.findById(id);
		
		Date created_at = new Date();
		
		images.setCreated_at(created_at);
		images.setPostId(id);
		
		return ResponseEntity.ok().body(postImageService.insert(images));
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<PostImage>> listAll() {
		return ResponseEntity.ok().body(postImageService.listAll());
	}
	
}
