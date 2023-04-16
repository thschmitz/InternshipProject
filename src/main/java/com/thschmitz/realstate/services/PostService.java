package com.thschmitz.realstate.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Comments;
import com.thschmitz.realstate.domain.Feedbacks;
import com.thschmitz.realstate.domain.Posts;
import com.thschmitz.realstate.domain.PostsImages;
import com.thschmitz.realstate.domain.Users;
import com.thschmitz.realstate.exception.ObjectNotFoundException;
import com.thschmitz.realstate.repository.PostRepository;
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
	private CommentService commentService;
	
	@Autowired
	private FeedbackService feedbackService;
	
	@Autowired
	private PostImageService postImageService;
	
	public List<Posts> findAll() {
		return (List<Posts>) postRepository.findAll();
	}
	
	public Posts findById(Integer id) {
		Optional<Posts> user = postRepository.findById(id);
		
		return user.orElseThrow(() -> new ObjectNotFoundException("Object not found!"));
	}
	
	public List<Posts> findByTitle(String text) {
		return postRepository.findByTitleContainingIgnoreCase(text);
	}
	
	public List<Posts> findByBody(String body) {
		return postRepository.findByBodyContainingIgnoreCase(body);
	}
	
	public Posts insert(Posts post, Jws<Claims> session) {
		
		Integer author_id = Session.getSessionId(session);

		Users user = Util.toUser(author_id, service);
		post.setAuthorId(user.getId());
		
		return postRepository.save(post);
	}
	
	public void delete(Integer id) {
		List<Comments> comments = commentService.findCommentsByPost(id);
		List<Feedbacks> feedbacks = feedbackService.findFeedbacksByPost(id);
		List<PostsImages> postImages = postImageService.findPostImagesByPost(id);
		
		for(Comments comment : comments) {
			commentService.delete(comment.getId());
		}
		
		for(Feedbacks feedback : feedbacks) {
			feedbackService.delete(feedback.getId());
		}
		
		for(PostsImages postImage : postImages) {
			postImageService.delete(postImage.getId());
		}
	
		postRepository.deleteById(id);
		
	}
	
	public Posts update(Posts post) {
		Posts newObj = findById(post.getId());
		updateData(newObj, post);
		return postRepository.save(newObj);
	}
	
	public void updateData(Posts newObj, Posts obj) {
		System.out.println(newObj.getBody());
		System.out.println(newObj.getTitle());
		
		newObj.setRestrooms(obj.getRestrooms());
		newObj.setBedrooms(obj.getBedrooms());
		newObj.setLatitude(obj.getLatitude());
		newObj.setLongitude(obj.getLatitude());
		newObj.setBody(obj.getBody());
		newObj.setMain_image(obj.getMain_image());
		newObj.setType(obj.getType());
		newObj.setPrice(obj.getPrice());
		newObj.setSize(obj.getSize());
		newObj.setTitle(obj.getTitle());
	}
	
	public List<Posts> getPostByProfileId(Integer id) {
		return postRepository.findByAuthorId(id);
	}
}