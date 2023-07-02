package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thschmitz.realstate.domain.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

	@Query("SELECT c from Comment c WHERE c.post.id = :id")
	List<Comment> findCommentsByPostId(Integer id);
}
