package com.thschmitz.realstate.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.dto.AuthorDTO;
import com.thschmitz.realstate.exception.ObjectNotFoundException;
import com.thschmitz.realstate.exception.ParametersNotPassedException;
import com.thschmitz.realstate.repository.CommentRepository;
import com.thschmitz.realstate.repository.PostRepository;
import com.thschmitz.realstate.util.Like;
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
	private CommentRepository commentRepository;
	
	
	public List<Post> findAll() {
		return (List<Post>) postRepository.findAll();
	}
	
	public Post findById(String id) {
		Optional<Post> user = postRepository.findById(id);
		
		return user.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado"));
	}
	
	public List<Post> findByTitle(String text) {
		return postRepository.findByTitleContainingIgnoreCase(text);
	}
	
	public List<Post> findByBody(String body) {
		return postRepository.findByBodyContainingIgnoreCase(body);
	}
	
	public Post insert(Post post, Jws<Claims> session) {
		
		String author_id = Session.getSessionId(session);

		User user = Util.toUser(author_id, service);
		post.setAuthor(new AuthorDTO(user).getId());
		
		return postRepository.save(post);
	}
	
	public void delete(String id) {
		/*Post post = findById(id);
		
		for(String comment : post.getComments()) {
			commentRepository.deleteById(comment);
		}
		
		postRepository.deleteById(id);*/
		
	}
	
	public Post update(Post post) {
		Post newObj = findById(post.getId());
		
		updateData(newObj, post);
		
		return postRepository.save(newObj);
	}
	
	
	public void updateData(Post newObj, Post obj) {
		if(obj.getBody() == null || obj.getImage() == null || obj.getPrice() == null || obj.getSize() == null || obj.getStatus() == null || obj.getTitle() == null) {
			throw new ParametersNotPassedException("You need to inform all the parameters to update!");
		} else {
			newObj.setBody(obj.getBody());
			newObj.setImage(obj.getImage());
			newObj.setPrice(obj.getPrice());
			newObj.setSize(obj.getSize());
			newObj.setStatus(obj.getStatus());
			newObj.setTitle(obj.getTitle());
		}
	}

	/*public List<String> commentsByPost(String id) {
		Post post = findById(id);
		
		return post.getComments();
	}*/
}