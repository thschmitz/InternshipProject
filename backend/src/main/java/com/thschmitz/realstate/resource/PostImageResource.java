package com.thschmitz.realstate.resource;

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
import com.thschmitz.realstate.services.PostImageService;
import com.thschmitz.realstate.util.Session;

@RestController
@RequestMapping(value="/postimage")
@CrossOrigin(origins = "*")
public class PostImageResource {

	@Autowired
	private PostImageService postImageService;

	@RequestMapping(value="/{id}", method=RequestMethod.POST)
	public ResponseEntity<List<PostImage>> insert(@RequestBody List<String> listUrl, @PathVariable Integer id, @RequestHeader(value="JWT") String header) {
		Session.session(header);
		
		return ResponseEntity.ok().body(postImageService.insert(listUrl, id));
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<PostImage>> listAll() {
		return ResponseEntity.ok().body(postImageService.listAll());
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<List<PostImage>> getAllPostImagesByPost(@PathVariable Integer id) {
		return ResponseEntity.ok().body(postImageService.findPostImagesByPost(id));	
	}
	
	
}
