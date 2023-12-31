package com.thschmitz.realstate.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Feedback;
import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.repository.FeedbackRepository;

@Service
public class FeedbackService {

	@Autowired
	private FeedbackRepository feedbackRepository;

	@Autowired
	private UserService userService;
	
	public List<Feedback> findAll() {
		return (List<Feedback>) feedbackRepository.findAll();
	}
	
	public Feedback like(PostService postService, Integer post_id, Integer author_id) {
		Date created_at = new Date();
		Feedback feedback = new Feedback();
		Post post = postService.findById(post_id);
		User user = userService.findById(author_id);
		Feedback feedbackQuery = feedbackRepository.findByAuthorAndPostId(author_id, post_id);
		
		if(feedbackQuery != null) {
			feedbackRepository.deleteById(feedbackQuery.getId());
		} else {
			feedback.setCreated_at(created_at);
			feedback.setPost(post);
			feedback.setAuthor(user);
			feedbackRepository.save(feedback);
		}
		
		return feedback;

	}
	
	public List<Feedback> findFeedbacksByPost(Integer id) {
		return feedbackRepository.findFeedbacksByPostId(id);
	}
	
	public void delete(Integer id) {
		feedbackRepository.deleteById(id);
	}
	
	public Boolean findByAuthorAndPostId(Integer userId, Integer postId) {
		Feedback feedbackReturned = feedbackRepository.findByAuthorAndPostId(userId, postId);
		
		if(feedbackReturned != null) {
			return true;
		} else {
			return false;
		}
	}
}
