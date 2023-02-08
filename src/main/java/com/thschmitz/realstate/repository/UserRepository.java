package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thschmitz.realstate.domain.User;

public interface UserRepository extends CrudRepository<User, String> {
	
	List<User> findByName(String name);
	List<User> findByEmail(String email);
	List<User> findByNameContainingIgnoreCase(String text);
}
