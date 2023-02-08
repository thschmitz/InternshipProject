package com.thschmitz.realstate;

import java.text.SimpleDateFormat;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.repository.UserRepository;

@SpringBootApplication
public class RealstateApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(RealstateApplication.class, args);
	}

}
