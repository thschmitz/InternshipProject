package com.thschmitz.realstate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thschmitz.realstate.domain.PostsImages;

public interface PostsImagesRepository extends JpaRepository<PostsImages, String> {

	// https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#repositores.query-methods
	// Para ver todos os metodos ja prontos do spring
}
