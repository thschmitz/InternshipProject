package com.thschmitz.realstate.domain.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Comment;
import com.thschmitz.realstate.repository.CommentRepository;

@Service
public class CommentService {

	@Autowired
	private CommentRepository repository;
	
	
	public List<Comment> findAll() {
		return repository.findAll();
	}
}