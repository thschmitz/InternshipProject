package com.thschmitz.realstate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thschmitz.realstate.domain.Feedbacks;

public interface FeedbackRepository extends JpaRepository<Feedbacks, String> {
	
	@Query("SELECT f from Feedbacks f WHERE f.post_id = :postId AND f.author_id = :authorId")
	Feedbacks findByAuthorAndPostId(String authorId, String postId);
	
}
