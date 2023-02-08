package com.thschmitz.realstate.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thschmitz.realstate.domain.Comment;

public interface CommentRepository extends CrudRepository<Comment, String> {

}
