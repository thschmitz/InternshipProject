package com.thschmitz.realstate.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.thschmitz.realstate.domain.Post;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {

}
