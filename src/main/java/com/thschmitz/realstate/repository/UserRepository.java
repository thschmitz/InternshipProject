package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thschmitz.realstate.domain.Users;

public interface UserRepository extends JpaRepository<Users, Integer> {
	
	Users findByEmail(String name);
	List<Users> findByNameContainingIgnoreCase(String text);
}
