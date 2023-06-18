package com.thschmitz.realstate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thschmitz.realstate.domain.Label;

public interface LabelRepository extends JpaRepository<Label, Integer> {
	
}
