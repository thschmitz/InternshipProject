package com.thschmitz.realstate.config;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.TimeZone;

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
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
		
		userRepository.deleteAll(); // AQUI TA DELETANDO TUDOOOO
		
		User maria = new User(null, "Maria Brown", "maria@gmail.com", "maria05", sdf.parse("21/03/2018"));
		User alex = new User(null, "Alex Green", "alex@gmail.com", "alex04", sdf.parse("21/03/2018"));
		User bob = new User(null, "Bob Grey", "bob@gmail.com", "bob06", sdf.parse("21/03/2018"));
		
		userRepository.saveAll(Arrays.asList(maria, alex, bob));
		
	}

}
