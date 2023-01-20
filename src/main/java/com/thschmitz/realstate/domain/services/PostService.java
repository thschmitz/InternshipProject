package com.thschmitz.realstate.domain.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.services.exception.ObjectNotFoundException;
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
}