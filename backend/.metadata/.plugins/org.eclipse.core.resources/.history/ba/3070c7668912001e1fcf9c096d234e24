package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thschmitz.realstate.domain.PostImage;

public interface PostsImagesRepository extends JpaRepository<PostImage, Integer> {

	@Query("SELECT p from PostImage p WHERE p.post_id = :id")
	List<PostImage> findPostImagesByPostId(Integer id);
}
