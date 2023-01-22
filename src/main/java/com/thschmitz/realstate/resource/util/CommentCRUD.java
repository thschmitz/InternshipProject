package com.thschmitz.realstate.resource.util;

import java.util.Date;

import com.thschmitz.realstate.domain.Comment;
import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.services.PostService;
import com.thschmitz.realstate.domain.services.exception.ParametersNotPassedException;
import com.thschmitz.realstate.domain.services.exception.Unauthorized;
import com.thschmitz.realstate.dto.AuthorDTO;
import com.thschmitz.realstate.dto.CommentDTO;
import com.thschmitz.realstate.dto.PostDTO;
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
		
		Comment commentDomain = new Comment(null, comment.getText(), formattedDate, author, new PostDTO(post));
		
		commentRepository.save(commentDomain);
		postRepository.save(post);
		
		return post;
	}
	
	public static void deleteComment(Comment comment, String author_id, CommentRepository commentRepository, PostService postService, PostRepository postRepository) {
		if(comment.getAuthor().getId().equals(author_id)) {
			commentRepository.delete(comment);

			Post post = postService.findById(comment.getPost().getId());
			
			Integer index = 0;
			Integer localeIndex = null;
			
			for(CommentDTO i : post.getComments()) {
				System.out.println(i.getId().equals(new CommentDTO(comment).getId()));
				if(i.getId().equals(new CommentDTO(comment).getId())) {
					System.out.println("AQUI OH " + index);
					localeIndex = index;
				}
				index+= 1;
			}
			
			post.getComments().remove(post.getComments().get(localeIndex));
			postRepository.save(post);
		} else {
			throw new Unauthorized("You cant delete this comment!");
		}
	}
}
