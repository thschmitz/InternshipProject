package com.thschmitz.realstate.resource;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.dto.AuthorDTO;
import com.thschmitz.realstate.repository.PostRepository;
import com.thschmitz.realstate.repository.UserRepository;
import com.thschmitz.realstate.services.UserService;

@RestController
@RequestMapping(path="/users")
public class UserResource {

	@Autowired
	private UserService service;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@RequestMapping(method=RequestMethod.GET)
 	public ResponseEntity<Iterable<User>> findAll() {
		Iterable<User> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<User> insertUser() throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
		User maria = new User(null, "Maria Brown", "maria@gmail.com", "$2a$10$daJmJ.qCBUfFK4LC91C5be5Lcc6tQufVhrLkSDrGKWAA6XnYNlqri", sdf.parse("21/03/2018"), "https://img.freepik.com/fotos-gratis/mulher-jovem-e-elegante-magnifica-com-grandes-olhos-castanhos-e-um-sorriso-incrivel_291049-2575.jpg?w=2000");
		User alex = new User(null, "Alex Green", "alex@gmail.com", "$2a$10$ZGgMHu.o4fxB4lbR1WyYPOQAMC8obpmxI.mYT68JPcjlv.PQ/AsJ2", sdf.parse("21/03/2018"), "https://img.freepik.com/fotos-gratis/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito_176420-18743.jpg");
		User bob = new User(null, "Bob Grey", "bob@gmail.com", "$2a$10$DN4fGCOugTAtM/.Emwqt/.hwcA25oksByW1.mAOpEcHnjUkdJw6Jq", sdf.parse("21/03/2018"), "https://img.freepik.com/fotos-premium/homem-de-negocios-novo-consideravel-na-camisa-e-nos-monoculos_85574-6228.jpg?w=360");
		
		userRepository.saveAll(Arrays.asList(maria, alex, bob));
		
		return ResponseEntity.ok().body(maria);
	}
	
}