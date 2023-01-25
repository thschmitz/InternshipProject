package com.thschmitz.realstate.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

	@Query("{ 'email': ?0  }")
	User login(String email);
}
