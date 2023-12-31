package com.thschmitz.realstate.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Comment;
import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.exception.ObjectNotFoundException;
import com.thschmitz.realstate.exception.ParametersNotPassedException;
import com.thschmitz.realstate.repository.CommentRepository;

@Service
public class CommentService {

	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private UserService userService;
	
	public List<Comment> findAll() {
		return (List<Comment>) commentRepository.findAll();
	}
	
	public Comment findById(Integer id) {
		Optional<Comment> comment = commentRepository.findById(id);
		
		return comment.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado"));
	}
	
	public Comment create(Integer post_id, Comment comment, Integer author_id) {
		comment.setCreated_at(new Date());
		comment.getAuthor().setId(author_id);
		comment.getPost().setId(post_id);
		
		User author = userService.findById(author_id);
		
		comment.getAuthor().setName(author.getName());
		comment.getAuthor().setImage(author.getImage());
		
		if(comment.isEmpty()) {
			throw new ParametersNotPassedException("Você precisa incluir todas as informações para concluir a operação!");
		} else {
			commentRepository.save(comment);
			return comment;
		}
	}
	
	public void delete(Integer id) {
		commentRepository.deleteById(id);
	}
	
	public List<Comment> findCommentsByPost(Integer id) {
		return commentRepository.findCommentsByPostId(id);
	}
}