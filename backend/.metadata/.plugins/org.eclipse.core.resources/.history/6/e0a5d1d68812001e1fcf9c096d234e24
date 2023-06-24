package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thschmitz.realstate.domain.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {

	// https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#repositores.query-methods
	// Para ver todos os metodos ja prontos do spring
	
	List<Post> findByTitleContainingIgnoreCase(String text);
	
	List<Post> findByBodyContainingIgnoreCase(String body);
	
	@Query("SELECT p from Post p WHERE p.author.id = :authorId")
	List<Post> findByAuthorId(Integer authorId);

}
