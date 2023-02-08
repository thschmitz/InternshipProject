package com.thschmitz.realstate.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository repository;
	
	public Iterable<User> findAll() {
		return repository.findAll();
	}
}
