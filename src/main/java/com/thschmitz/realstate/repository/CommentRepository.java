package com.thschmitz.realstate.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.thschmitz.realstate.domain.Comment;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {

}
