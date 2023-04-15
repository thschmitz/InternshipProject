package com.thschmitz.realstate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thschmitz.realstate.domain.Labels;

public interface LabelRepository extends JpaRepository<Labels, Integer> {
	
}
