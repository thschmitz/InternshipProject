package com.thschmitz.realstate.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.User;
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

	public Iterable<User> findAll() {
		return userRepository.findAll();
	}
	
	public User findById(Integer id) {
		Optional<User> user = userRepository.findById(id);
		
		return user.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado"));
	}
	
	public String insert(User obj) {
		obj.setPassword(Password.encodePassword(obj));
		userRepository.save(obj); // Encoding the password and sending the object
		return JWT.createJWT(obj);
	}
	
	
	public void delete(Integer id) {
		findById(id);
		userRepository.deleteById(id);
	}
	
	public User update(User obj) {
		User newObj = findById(obj.getId());
		
		updateData(newObj, obj);
		
		return userRepository.save(newObj);
	}
	
	public void updateData(User newObj, User obj) {
		if(obj.getName() == null || obj.getEmail() == null) {
			throw new ParametersNotPassedException("Você precisa incluir todas as informações para concluir a operação!");
		} else {
			newObj.setName(obj.getName());
			newObj.setEmail(obj.getEmail());
			newObj.setPassword(obj.getPassword());	
		}
	}
	
	
	
	
	
	
	public String login(User obj) {
		User newObj = userRepository.findByEmail(obj.getEmail());
		
		if(newObj == null) {
			throw new AuthenticationException("O email está errado");
		}
		
		System.out.println(obj.getPassword());
		
		boolean passwordIsValid = Password.matchPassword(obj, newObj);
		
		if(passwordIsValid == false) {
			throw new AuthenticationException("A senha está errada");
		}
		
		return JWT.createJWT(newObj);
	}
	
	
	
	
	
	
	
	
	public List<User> findbyText(String text) {
		return userRepository.findByNameContainingIgnoreCase(text);
	}
}
