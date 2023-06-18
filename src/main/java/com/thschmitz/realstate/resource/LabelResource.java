package com.thschmitz.realstate.resource;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.thschmitz.realstate.domain.Label;
import com.thschmitz.realstate.services.LabelService;

@RestController
@RequestMapping(value="/labels")
@CrossOrigin(origins = "*")
public class LabelResource {
	
	@Autowired
	private LabelService labelService;
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<Label>> findAll() {
		return ResponseEntity.ok().body(labelService.findAll());
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Optional<Label>> findById(@PathVariable Integer id) {
		Optional<Label> label = labelService.findById(id);
		return ResponseEntity.ok().body(label);
	}
}
