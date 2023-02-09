package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thschmitz.realstate.domain.Comment;

public interface CommentRepository extends JpaRepository<Comment, String> {
	
	@Query("SELECT c from Comment c WHERE c.post_id = :id")
	List<Comment> findCommentsByPostId(String id);
}
