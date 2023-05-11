package com.thschmitz.realstate.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Feedbacks;
import com.thschmitz.realstate.repository.FeedbackRepository;

@Service
public class FeedbackService {

	@Autowired
	private FeedbackRepository feedbackRepository;
	
	
	public List<Feedbacks> findAll() {
		return (List<Feedbacks>) feedbackRepository.findAll();
	}
	
	public Feedbacks like(Integer post_id, Integer author_id) {
		Date created_at = new Date();
		Feedbacks feedback = new Feedbacks();
		
		Feedbacks feedbackQuery = feedbackRepository.findByAuthorAndPostId(author_id, post_id);
		
		if(feedbackQuery != null) {
			feedbackRepository.deleteById(feedbackQuery.getId());
		} else {
			feedback.setCreated_at(created_at);
			feedback.setPost(post_id);
			feedback.setAuthor(author_id);
			
			feedbackRepository.save(feedback);
		}
		
		return feedback;

	}
	
	public List<Feedbacks> findFeedbacksByPost(Integer id) {
		return feedbackRepository.findFeedbacksByPostId(id);
	}
	
	public void delete(Integer id) {
		feedbackRepository.deleteById(id);
	}
}
