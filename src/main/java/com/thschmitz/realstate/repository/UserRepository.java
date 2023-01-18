package com.thschmitz.realstate.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.thschmitz.realstate.domain.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

}
