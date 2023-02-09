package com.thschmitz.realstate.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Comment;
import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.dto.AuthorDTO;
import com.thschmitz.realstate.dto.CommentDTO;
import com.thschmitz.realstate.exception.ObjectNotFoundException;
import com.thschmitz.realstate.repository.CommentRepository;
import com.thschmitz.realstate.repository.PostRepository;
import com.thschmitz.realstate.util.CommentCRUD;
import com.thschmitz.realstate.util.Session;
import com.thschmitz.realstate.util.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@Service
public class CommentService {

	@Autowired
	private CommentRepository commentRepository;
	
	public List<Comment> findAll() {
		return (List<Comment>) commentRepository.findAll();
	}
	
	public Comment findById(String id) {
		Optional<Comment> comment = commentRepository.findById(id);
		
		return comment.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado"));
	}
	
	public Comment create(String id, Jws<Claims> session, Comment comment, PostService postService, UserService userService) {
		
		commentRepository.save(comment);
		
		return comment;
	}
	
	public void delete(String id) {
		commentRepository.deleteById(id);
	}
	
}