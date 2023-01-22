package com.thschmitz.realstate.resource.util;

import java.util.Date;

import com.thschmitz.realstate.domain.Comment;
import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.services.exception.ParametersNotPassedException;
import com.thschmitz.realstate.dto.AuthorDTO;
import com.thschmitz.realstate.dto.CommentDTO;
import com.thschmitz.realstate.repository.CommentRepository;
import com.thschmitz.realstate.repository.PostRepository;

public class CommentCRUD {
	public static Post addComment(Post post, Date formattedDate, AuthorDTO author, CommentDTO comment, CommentRepository commentRepository, PostRepository postRepository) {
		if(comment.getText() == null) {
			throw new ParametersNotPassedException("You have to pass some parameters to conclute this request");
		}
		
		comment.setCreated_at(formattedDate);
		comment.setAuthor(author);
		post.getComments().add(comment);
		
		Comment commentDomain = new Comment(null, comment.getText(), formattedDate, author, post);
		
		commentRepository.save(commentDomain);
		postRepository.save(post);
		
		return post;
	}
}
