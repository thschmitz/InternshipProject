package com.thschmitz.realstate.config;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.thschmitz.realstate.domain.Comment;
import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.dto.AuthorDTO;
import com.thschmitz.realstate.dto.CommentDTO;
import com.thschmitz.realstate.dto.LikeDTO;
import com.thschmitz.realstate.dto.PostDTO;
import com.thschmitz.realstate.repository.CommentRepository;
import com.thschmitz.realstate.repository.PostRepository;
import com.thschmitz.realstate.repository.UserRepository;

@Configuration
public class Instantiation implements CommandLineRunner{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
		
		userRepository.deleteAll(); // AQUI TA DELETANDO TUDOOOO
		postRepository.deleteAll();
		commentRepository.deleteAll();
		
		User maria = new User(null, "Maria Brown", "maria@gmail.com", "$2a$10$daJmJ.qCBUfFK4LC91C5be5Lcc6tQufVhrLkSDrGKWAA6XnYNlqri", sdf.parse("21/03/2018"), "https://img.freepik.com/fotos-gratis/mulher-jovem-e-elegante-magnifica-com-grandes-olhos-castanhos-e-um-sorriso-incrivel_291049-2575.jpg?w=2000");
		User alex = new User(null, "Alex Green", "alex@gmail.com", "$2a$10$ZGgMHu.o4fxB4lbR1WyYPOQAMC8obpmxI.mYT68JPcjlv.PQ/AsJ2", sdf.parse("21/03/2018"), "https://img.freepik.com/fotos-gratis/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito_176420-18743.jpg");
		User bob = new User(null, "Bob Grey", "bob@gmail.com", "$2a$10$DN4fGCOugTAtM/.Emwqt/.hwcA25oksByW1.mAOpEcHnjUkdJw6Jq", sdf.parse("21/03/2018"), "https://img.freepik.com/fotos-premium/homem-de-negocios-novo-consideravel-na-camisa-e-nos-monoculos_85574-6228.jpg?w=360");
		
		userRepository.saveAll(Arrays.asList(maria, alex, bob));
		
		Post post1 = new Post(null, sdf.parse("12/07/2022"), "Teste01", "Testando um novo post1", "imagemNenhuma", "A venda", 100.0, 20.3,  new AuthorDTO(maria));
		Post post2 = new Post(null, sdf.parse("23/10/2022"), "Teste02", "Testando um novo post2", "imagemNenhuma", "A venda", 130.0, 25.0, new AuthorDTO(alex));
		Post post3 = new Post(null, sdf.parse("05/09/2022"), "Teste03", "Testando um novo post3", "imagemNenhuma", "A venda", 150.2, 30.5, new AuthorDTO(bob));
		
		postRepository.saveAll(Arrays.asList(post1, post2, post3));
		
		Comment c1 = new Comment(null, "Post1Comment", sdf.parse("21/05/2019"), new AuthorDTO(alex), new PostDTO(post1));
		Comment c2 = new Comment(null, "Post2Comment", sdf.parse("19/07/2020"), new AuthorDTO(bob), new PostDTO(post2));
		Comment c3 = new Comment(null, "Post3Comment", sdf.parse("11/02/2021"), new AuthorDTO(maria), new PostDTO(post3));
		
		postRepository.saveAll(Arrays.asList(post1, post2, post3));
		commentRepository.saveAll(Arrays.asList(c1, c2, c3));
		
		LikeDTO l1 = new LikeDTO(sdf.parse("24/02/2019"), new AuthorDTO(bob));
		LikeDTO l2 = new LikeDTO(sdf.parse("25/03/2018"), new AuthorDTO(maria));
		LikeDTO l3 = new LikeDTO(sdf.parse("21/09/2020"), new AuthorDTO(alex));
		
		post1.getComments().addAll(Arrays.asList(new CommentDTO(c1)));
		post2.getComments().addAll(Arrays.asList(new CommentDTO(c2)));
		post3.getComments().addAll(Arrays.asList(new CommentDTO(c3)));
		
		post1.getLikes().addAll(Arrays.asList(l1));
		post2.getLikes().addAll(Arrays.asList(l2));
		post1.getLikes().addAll(Arrays.asList(l3));
		
		postRepository.saveAll(Arrays.asList(post1, post2, post3));
		
		
		maria.getPosts().addAll(Arrays.asList(post1));
		
		userRepository.save(maria);
	}

}
