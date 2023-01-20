package com.thschmitz.realstate.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.thschmitz.realstate.domain.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

	@Query("{ $and: [ { 'email': ?0  }, { 'password': ?1 } ] }")
	User login(String email, String password);
}
