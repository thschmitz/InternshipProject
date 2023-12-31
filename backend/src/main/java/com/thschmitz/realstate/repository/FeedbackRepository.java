package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thschmitz.realstate.domain.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
	@Query("SELECT f from Feedback f WHERE f.post.id = :postId AND f.author.id = :authorId")
	Feedback findByAuthorAndPostId(Integer authorId, Integer postId);
	
	@Query("SELECT f from Feedback f WHERE f.post.id = :id")
	List<Feedback> findFeedbacksByPostId(Integer id);

}
