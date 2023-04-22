package com.thschmitz.realstate.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Users;
import com.thschmitz.realstate.exception.AuthenticationException;
import com.thschmitz.realstate.exception.ObjectNotFoundException;
import com.thschmitz.realstate.exception.ParametersNotPassedException;
import com.thschmitz.realstate.repository.UserRepository;
import com.thschmitz.realstate.util.JWT;
import com.thschmitz.realstate.util.Password;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	public Iterable<Users> findAll() {
		return userRepository.findAll();
	}
	
	public Users findById(Integer id) {
		Optional<Users> user = userRepository.findById(id);
		
		return user.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado"));
	}
	
	public String insert(Users obj) {
		obj.setPassword(Password.encodePassword(obj));
		userRepository.save(obj); // Encoding the password and sending the object
		return JWT.createJWT(obj);
	}
	
	
	public void delete(Integer id) {
		findById(id);
		userRepository.deleteById(id);
	}
	
	public Users update(Users obj) {
		Users newObj = findById(obj.getId());
		
		updateData(newObj, obj);
		
		return userRepository.save(newObj);
	}
	
	public void updateData(Users newObj, Users obj) {
		if(obj.getName() == null || obj.getEmail() == null) {
			throw new ParametersNotPassedException("You need to inform all the parameters to update!");
		} else {
			newObj.setName(obj.getName());
			newObj.setEmail(obj.getEmail());
			newObj.setPassword(obj.getPassword());	
		}
	}
	
	public String login(Users obj) {
		Users newObj = userRepository.findByEmail(obj.getEmail());
		
		if(newObj == null) {
			throw new AuthenticationException("O email está errado");
		}
		
		System.out.println(obj.getPassword());
		
		boolean passwordIsValid = Password.matchPassword(obj, newObj);
		
		if(passwordIsValid == false) {
			throw new AuthenticationException("A senha está errada");
		}
		
		obj.setName(newObj.getName());

		String jwt = JWT.createJWT(newObj);
		
		
		return jwt;
	}
	
	public List<Users> findbyText(String text) {
		return userRepository.findByNameContainingIgnoreCase(text);
	}
}
