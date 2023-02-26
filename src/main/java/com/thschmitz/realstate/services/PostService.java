package com.thschmitz.realstate.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Comments;
import com.thschmitz.realstate.domain.Posts;
import com.thschmitz.realstate.domain.Users;
import com.thschmitz.realstate.exception.ObjectNotFoundException;
import com.thschmitz.realstate.exception.ParametersNotPassedException;
import com.thschmitz.realstate.repository.PostRepository;
import com.thschmitz.realstate.util.Session;
import com.thschmitz.realstate.util.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private UserService service;
	
	@Autowired
	private CommentService commentService;
	
	public List<Posts> findAll() {
		return (List<Posts>) postRepository.findAll();
	}
	
	public Posts findById(String id) {
		Optional<Posts> user = postRepository.findById(id);
		
		return user.orElseThrow(() -> new ObjectNotFoundException("Object not found!"));
	}
	
	public List<Posts> findByTitle(String text) {
		return postRepository.findByTitleContainingIgnoreCase(text);
	}
	
	public List<Posts> findByBody(String body) {
		return postRepository.findByBodyContainingIgnoreCase(body);
	}
	
	public Posts insert(Posts post, Jws<Claims> session) {
		
		String author_id = Session.getSessionId(session);

		Users user = Util.toUser(author_id, service);
		post.setAuthorId(user.getId());
		
		return postRepository.save(post);
	}
	
	public void delete(String id) {
		List<Comments> comments = commentService.findCommentsByPost(id);
		
		for(Comments comment : comments) {
			commentService.delete(comment.getId());
		}
	
		postRepository.deleteById(id);
		
	}
	
	public Posts update(Posts post) {
		Posts newObj = findById(post.getId());
		
		updateData(newObj, post);
		
		return postRepository.save(newObj);
	}
	
	
	public void updateData(Posts newObj, Posts obj) {
		if(obj.getBody() == null || obj.getPrice() == null || obj.getSize() == null || obj.getTitle() == null) {
			throw new ParametersNotPassedException("You need to inform all the parameters to update!");
		} else {
			newObj.setBody(obj.getBody());
			newObj.setPrice(obj.getPrice());
			newObj.setSize(obj.getSize());
			newObj.setTitle(obj.getTitle());
		}
	}
	
	public List<Posts> getPostByProfileId(String id) {
		return postRepository.findByAuthorId(id);
	}
}