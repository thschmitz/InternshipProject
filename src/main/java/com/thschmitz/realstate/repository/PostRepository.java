package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.thschmitz.realstate.domain.Post;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {

	// https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#repositores.query-methods
	// Para ver todos os metodos ja prontos do spring
	
	List<Post> findByTitleContainingIgnoreCase(String text);
	
	List<Post> findByBodyContainingIgnoreCase(String body);
}
