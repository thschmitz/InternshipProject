package com.thschmitz.realstate.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.thschmitz.realstate.domain.Like;

@Repository
public interface LikeRepository extends MongoRepository<Like, String> {

}
