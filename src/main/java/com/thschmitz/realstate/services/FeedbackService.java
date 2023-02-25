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
	
	public Feedbacks checkAlreadyLiked(String author_id, String post_id) {
		Feedbacks feedbackQuery = feedbackRepository.findByAuthorAndPostId(author_id, post_id);
		
		return feedbackQuery;
	}
	
	public void like(String id, String author_id) {
		Date created_at = new Date();
		Feedbacks feedback = new Feedbacks();
		
		Feedbacks feedbackQuery = checkAlreadyLiked(author_id, id);
		
		if(feedbackQuery != null) {
			feedbackRepository.deleteById(feedbackQuery.getId());
		} else {
			feedback.setCreated_at(created_at);
			feedback.setPost(id);
			feedback.setAuthor(author_id);
			
			feedbackRepository.save(feedback);
		}

	}
}
