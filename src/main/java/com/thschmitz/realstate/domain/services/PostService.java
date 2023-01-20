package com.thschmitz.realstate.domain.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.services.exception.ObjectNotFoundException;
import com.thschmitz.realstate.domain.services.exception.ParametersNotPassedException;
import com.thschmitz.realstate.repository.PostRepository;
import com.thschmitz.realstate.resource.util.JWT;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@Service
public class PostService {

	@Autowired
	private PostRepository repository;
	
	public List<Post> findAll() {
		return repository.findAll();
	}
	
	public Post findById(String id) {
		Optional<Post> user = repository.findById(id);
		
		return user.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado"));
	}
	
	public List<Post> findByTitle(String text) {
		return repository.findByTitleContainingIgnoreCase(text);
	}
	
	public Post insert(Post post) {
		return repository.insert(post);
	}
	
	public void delete(String id) {
		findById(id);
		repository.deleteById(id);
	}
	
	public Post update(Post post) {
		Post newObj = findById(post.getId());
		
		updateData(newObj, post);
		
		return repository.save(newObj);
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
}