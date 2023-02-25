package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thschmitz.realstate.domain.Posts;

public interface PostRepository extends JpaRepository<Posts, String> {

	// https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#repositores.query-methods
	// Para ver todos os metodos ja prontos do spring
	
	List<Posts> findByTitleContainingIgnoreCase(String text);
	
	List<Posts> findByBodyContainingIgnoreCase(String body);
	
	List<Posts> findByAuthorId(String id);

}
