package com.thschmitz.realstate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thschmitz.realstate.domain.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, String> {
	
	@Query("SELECT f from Feedback f WHERE f.post_id = :postId AND f.author_id = :authorId")
	Feedback findByAuthorAndPostId(String authorId, String postId);
	
}
