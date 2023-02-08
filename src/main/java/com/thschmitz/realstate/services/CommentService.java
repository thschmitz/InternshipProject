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
	
	@Autowired
	private PostRepository postRepository;
	
	public List<Comment> findAll() {
		return (List<Comment>) commentRepository.findAll();
	}
	
	public Comment findById(String id) {
		Optional<Comment> comment = commentRepository.findById(id);
		
		return comment.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado"));
	}
	
	public Post create(String id, Jws<Claims> session, CommentDTO comment, PostService postService, UserService userService) {
		Post post = postService.findById(id);

		String author_id = Session.getSessionId(session);
		Date formattedDate = Util.formatDate(new Date());
		User user = Util.toUser(author_id, userService);
	
		post = CommentCRUD.addComment(post, formattedDate, new AuthorDTO(user), comment, commentRepository, postRepository);
		
		return post;
	}
	
	public void delete(String id, Jws<Claims> session, PostService postService) {
		Comment comment = findById(id);
		
		comment.setId(id);

		String author_id = Session.getSessionId(session);
		
		CommentCRUD.deleteComment(comment, author_id, commentRepository, postService, postRepository);
	}
	
}