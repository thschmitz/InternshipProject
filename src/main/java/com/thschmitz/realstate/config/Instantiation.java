package com.thschmitz.realstate.config;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.dto.AuthorDTO;
import com.thschmitz.realstate.dto.CommentDTO;
import com.thschmitz.realstate.dto.LikeDTO;
import com.thschmitz.realstate.repository.PostRepository;
import com.thschmitz.realstate.repository.UserRepository;

@Configuration
public class Instantiation implements CommandLineRunner{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
		
		userRepository.deleteAll(); // AQUI TA DELETANDO TUDOOOO
		postRepository.deleteAll();
		
		User maria = new User(null, "Maria Brown", "maria@gmail.com", "maria05", sdf.parse("21/03/2018"), "imagemNenhuma");
		User alex = new User(null, "Alex Green", "alex@gmail.com", "alex04", sdf.parse("21/03/2018"), "imagemNenhuma");
		User bob = new User(null, "Bob Grey", "bob@gmail.com", "bob06", sdf.parse("21/03/2018"), "imagemNenhuma");
		
		userRepository.saveAll(Arrays.asList(maria, alex, bob));
		
		Post post1 = new Post(null, sdf.parse("12/07/2022"), "Teste01", "Testando um novo post1", "imagemNenhuma", "A venda", new AuthorDTO(maria));
		Post post2 = new Post(null, sdf.parse("23/10/2022"), "Teste02", "Testando um novo post2", "imagemNenhuma", "A venda", new AuthorDTO(alex));
		Post post3 = new Post(null, sdf.parse("05/09/2022"), "Teste03", "Testando um novo post3", "imagemNenhuma", "A venda", new AuthorDTO(bob));
		
		CommentDTO c1 = new CommentDTO("Post1Comment", sdf.parse("21/05/2019"), new AuthorDTO(alex));
		CommentDTO c2 = new CommentDTO("Post2Comment", sdf.parse("19/07/2020"), new AuthorDTO(bob));
		CommentDTO c3 = new CommentDTO("Post3Comment", sdf.parse("11/02/2021"), new AuthorDTO(maria));
		
		LikeDTO l1 = new LikeDTO(sdf.parse("24/02/2019"), new AuthorDTO(maria));
		LikeDTO l2 = new LikeDTO(sdf.parse("25/03/2018"), new AuthorDTO(bob));
		
		post1.getComments().addAll(Arrays.asList(c1));
		post2.getComments().addAll(Arrays.asList(c2));
		post3.getComments().addAll(Arrays.asList(c3));
		
		post1.getLikes().addAll(Arrays.asList(l1));
		post2.getLikes().addAll(Arrays.asList(l2));
		
		postRepository.saveAll(Arrays.asList(post1, post2, post3));
		
		maria.getPosts().addAll(Arrays.asList(post1));
		
		userRepository.save(maria);
	}

}
