package com.thschmitz.realstate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thschmitz.realstate.domain.Comment;

public interface CommentRepository extends JpaRepository<Comment, String> {

}
