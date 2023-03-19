package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thschmitz.realstate.domain.PostsImages;

public interface PostsImagesRepository extends JpaRepository<PostsImages, Integer> {

	@Query("SELECT p from PostsImages p WHERE p.post_id = :id")
	List<PostsImages> findPostImagesByPostId(Integer id);
}
