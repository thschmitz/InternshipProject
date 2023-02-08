package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thschmitz.realstate.domain.Post;

public interface PostRepository extends CrudRepository<Post, String> {

	// https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#repositores.query-methods
	// Para ver todos os metodos ja prontos do spring
	
	List<Post> findByTitleContainingIgnoreCase(String text);
	
	List<Post> findByBodyContainingIgnoreCase(String body);

}
