package com.thschmitz.realstate.domain.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.repository.CommentRepository;

@Service
public class CommentService {

	@Autowired
	private CommentRepository repository;

}