package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thschmitz.realstate.domain.Comments;

public interface CommentRepository extends JpaRepository<Comments, String> {
	
	@Query("SELECT c from Comments c WHERE c.postId = :id")
	List<Comments> findCommentsByPostId(String id);
}
