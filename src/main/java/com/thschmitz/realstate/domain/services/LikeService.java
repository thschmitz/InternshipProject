package com.thschmitz.realstate.domain.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Like;
import com.thschmitz.realstate.repository.LikeRepository;

@Service
public class LikeService {

	@Autowired
	private LikeRepository repository;
	
	
	public List<Like> findAll() {
		return repository.findAll();
	}
}