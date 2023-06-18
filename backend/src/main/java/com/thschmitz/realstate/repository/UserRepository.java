package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thschmitz.realstate.domain.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	User findByEmail(String name);
	List<User> findByNameContainingIgnoreCase(String text);
}
