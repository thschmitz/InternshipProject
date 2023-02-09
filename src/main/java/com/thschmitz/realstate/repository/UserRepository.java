package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thschmitz.realstate.domain.User;

public interface UserRepository extends JpaRepository<User, String> {
	
	List<User> findByName(String name);
	List<User> findByEmail(String email);
	List<User> findByNameContainingIgnoreCase(String text);
}
