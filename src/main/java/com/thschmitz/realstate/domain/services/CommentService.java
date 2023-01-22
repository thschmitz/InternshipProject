package com.thschmitz.realstate.domain.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.dto.AuthorDTO;
import com.thschmitz.realstate.dto.CommentDTO;
import com.thschmitz.realstate.repository.CommentRepository;
import com.thschmitz.realstate.repository.PostRepository;
import com.thschmitz.realstate.resource.util.CommentCRUD;
import com.thschmitz.realstate.resource.util.Session;
import com.thschmitz.realstate.resource.util.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@Service
public class CommentService {

	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	public Post comment(String id, Jws<Claims> session, CommentDTO comment, PostService postService, UserService userService) {
		Post post = postService.findById(id);

		String author_id = Session.getSessionId(session);
		Date formattedDate = Util.formatDate(new Date());
		User user = Util.toUser(author_id, userService);
	
		post = CommentCRUD.addComment(post, formattedDate, new AuthorDTO(user), comment, commentRepository, postRepository);
		
		return post;
	}
	
}