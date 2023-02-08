package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.thschmitz.realstate.domain.User;

public interface UserRepository extends CrudRepository<User, Integer> {
	
	List<User> findByName(String name);
	List<User> findByEmail(String email);
}
