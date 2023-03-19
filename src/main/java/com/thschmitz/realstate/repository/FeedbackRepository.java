package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thschmitz.realstate.domain.Feedbacks;

public interface FeedbackRepository extends JpaRepository<Feedbacks, Integer> {
	
	@Query("SELECT f from Feedbacks f WHERE f.post_id = :postId AND f.author_id = :authorId")
	Feedbacks findByAuthorAndPostId(Integer authorId, Integer postId);
	
	
	@Query("SELECT f from Feedbacks f WHERE f.post_id = :id")
	List<Feedbacks> findFeedbacksByPostId(Integer id);
}
