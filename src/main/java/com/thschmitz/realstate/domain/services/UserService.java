package com.thschmitz.realstate.domain.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.domain.services.exception.ObjectNotFoundException;
import com.thschmitz.realstate.domain.services.exception.ParametersNotPassedException;
import com.thschmitz.realstate.repository.UserRepository;
import com.thschmitz.realstate.domain.services.exception.AuthenticationException;

@Service
public class UserService {

	@Autowired
	private UserRepository repository;

	public List<User> findAll() {
		return repository.findAll();
	}
	
	public User findById(String id) {
		Optional<User> user = repository.findById(id);
		
		return user.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado"));
		
	}
	
	public User insert(User obj) {
		return repository.insert(obj);
	}
	
	public void delete(String id) {
		findById(id);
		repository.deleteById(id);
	}
	
	public User update(User obj) {
		User newObj = findById(obj.getId());
		
		System.out.println(newObj.getName());
		
		updateData(newObj, obj);
		
		return repository.save(newObj);
	}
	
	public void updateData(User newObj, User obj) {
		if(obj.getName() == null || obj.getEmail() == null || obj.getPassword() == null) {
			throw new ParametersNotPassedException("You need to inform all the parameters to update!");
		} else {
			newObj.setName(obj.getName());
			newObj.setEmail(obj.getEmail());
			newObj.setPassword(obj.getPassword());	
		}
		
	}
	
	public User login(User obj) {
		User newObj = repository.login(obj.getEmail(), obj.getPassword());
		
		if(newObj == null) {
			throw new AuthenticationException(null);
		} else {
			// Fazer um metodo que retorna um JWT;
			return newObj;
		}
	}
	
	/*public User fromDTO(UserDTO objDto) {
		
		return new User(objDto.getId(), objDto.getName(), objDto.getEmail(), null, objDto.getCreated_at());
	}*/
}
