package com.thschmitz.realstate.util;

import java.util.Date;

import com.thschmitz.realstate.domain.Comment;
import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.dto.AuthorDTO;
import com.thschmitz.realstate.dto.CommentDTO;
import com.thschmitz.realstate.dto.PostDTO;
import com.thschmitz.realstate.exception.ParametersNotPassedException;
import com.thschmitz.realstate.exception.Unauthorized;
import com.thschmitz.realstate.repository.CommentRepository;
import com.thschmitz.realstate.repository.PostRepository;
import com.thschmitz.realstate.services.PostService;

public class CommentCRUD {
	/*public static Post addComment(Post post, Date formattedDate, AuthorDTO author, CommentDTO comment, CommentRepository commentRepository, PostRepository postRepository) {
		if(comment.getText() == null) {
			throw new ParametersNotPassedException("You have to pass some parameters to conclute this request");
		}
		
		comment.setCreated_at(formattedDate);
		comment.setAuthor(author.getId());
		post.getComments().add(comment.getId());
		
		Comment commentDomain = new Comment(null, comment.getText(), formattedDate, author.getId(), new PostDTO(post).getId());
		
		commentRepository.save(commentDomain);
		postRepository.save(post);
		
		return post;
	}
	
	public static void deleteComment(Comment comment, String author_id, CommentRepository commentRepository, PostService postService, PostRepository postRepository) {
		if(comment.getAuthor().equals(author_id)) {
			commentRepository.delete(comment);

			Post post = postService.findById(comment.getPost());
			
			Integer index = 0;
			Integer localeIndex = null;
			
			for(String i : post.getComments()) {
				System.out.println(i.equals(new CommentDTO(comment).getId()));
				if(i.equals(new CommentDTO(comment).getId())) {
					localeIndex = index;
				}
				index+= 1;
			}
			
			post.getComments().remove(post.getComments().get(localeIndex));
			postRepository.save(post);
		} else {
			throw new Unauthorized("You cant delete this comment!");
		}
	}*/
}
