package com.thschmitz.realstate.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Labels;
import com.thschmitz.realstate.repository.LabelRepository;

@Service
public class LabelService {
	@Autowired
	private LabelRepository labelRepository;
	
	
	public Optional<Labels> findById(Integer id) {
		return labelRepository.findById(id);
	}
	
	public List<Labels> findAll() {
		return labelRepository.findAll();
	}
}
