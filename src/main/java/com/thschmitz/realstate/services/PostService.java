package com.thschmitz.realstate.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Comment;
import com.thschmitz.realstate.domain.Feedback;
import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.PostImage;
import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.exception.ObjectNotFoundException;
import com.thschmitz.realstate.repository.PostRepository;
import com.thschmitz.realstate.util.Session;

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
	
	public List<Post> findAll() {
		return (List<Post>) postRepository.findAll();
	}
	
	public Post findById(Integer id) {
		Optional<Post> user = postRepository.findById(id);
		
		return user.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado!"));
	}
	
	public List<Post> findByTitle(String text) {
		return postRepository.findByTitleContainingIgnoreCase(text);
	}
	
	public List<Post> findByBody(String body) {
		return postRepository.findByBodyContainingIgnoreCase(body);
	}
	
	public Post insert(Post post, Jws<Claims> session) {
		
		Integer author_id = Session.getSessionId(session);
		User user = service.findById(author_id);
		
		post.setAuthor(user);
		
		return postRepository.save(post);
	}
	
	public void delete(Integer id) {
		List<Comment> comments = commentService.findCommentsByPost(id);
		List<Feedback> feedbacks = feedbackService.findFeedbacksByPost(id);
		List<PostImage> postImages = postImageService.findPostImagesByPost(id);
		
		for(Comment comment : comments) {
			commentService.delete(comment.getId());
		}
		
		for(Feedback feedback : feedbacks) {
			feedbackService.delete(feedback.getId());
		}
		
		for(PostImage postImage : postImages) {
			postImageService.delete(postImage.getId());
		}
	
		postRepository.deleteById(id);
		
	}
	
	public Post update(Post post) {
		Post newObj = findById(post.getId());
		updateData(newObj, post);
		return postRepository.save(newObj);
	}
	
	public void updateData(Post newObj, Post obj) {
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
	
	public List<Post> getPostByProfileId(Integer id) {
		return postRepository.findByAuthorId(id);
	}
}