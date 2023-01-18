package com.thschmitz.realstate.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.repository.UserRepository;

@Configuration
public class Instantiation implements CommandLineRunner{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
		userRepository.deleteAll();
		
		User maria = new User(null, "Maria Brown", "maria@gmail.com", "maria05");
		User alex = new User(null, "Alex Green", "alex@gmail.com", "alex04");
		User bob = new User(null, "Bob Grey", "bob@gmail.com", "bob06");
		
		userRepository.saveAll(Arrays.asList(maria, alex, bob));
		
	}

}
