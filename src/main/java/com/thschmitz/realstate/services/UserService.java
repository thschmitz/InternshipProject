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
	private UserRepository repository;

	public Iterable<Users> findAll() {
		return repository.findAll();
	}
	
	public Users findById(String id) {
		Optional<Users> user = repository.findById(id);
		
		return user.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado"));
	}
	
	public String insert(Users obj) {
		obj.setPassword(Password.encodePassword(obj));
		repository.save(obj); // Encoding the password and sending the object
		return JWT.createJWT(obj);
	}
	
	
	public void delete(String id) {
		findById(id);
		repository.deleteById(id);
	}
	
	public Users update(Users obj) {
		Users newObj = findById(obj.getId());
		
		updateData(newObj, obj);
		
		return repository.save(newObj);
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
		Users newObj = repository.findByEmail(obj.getEmail());
		
		if(newObj == null) {
			throw new AuthenticationException(null);
		}
		
		boolean passwordIsValid = Password.matchPassword(obj, newObj);
		
		if(passwordIsValid == false) {
			throw new AuthenticationException(null);
		}

		return JWT.createJWT(newObj);
		
	}
	
	public List<Users> findbyText(String text) {
		return repository.findByNameContainingIgnoreCase(text);
	}

}
