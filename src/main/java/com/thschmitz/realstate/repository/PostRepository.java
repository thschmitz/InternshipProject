package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thschmitz.realstate.domain.Posts;

public interface PostRepository extends JpaRepository<Posts, Integer> {

	// https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#repositores.query-methods
	// Para ver todos os metodos ja prontos do spring
	
	List<Posts> findByTitleContainingIgnoreCase(String text);
	
	List<Posts> findByBodyContainingIgnoreCase(String body);
	
	@Query("SELECT p from Posts p WHERE p.author_id = :authorId")
	List<Posts> findByAuthorId(Integer authorId);

}
