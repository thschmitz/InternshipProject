package com.thschmitz.realstate.config;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.thschmitz.realstate.domain.Comments;
import com.thschmitz.realstate.domain.Feedbacks;
import com.thschmitz.realstate.domain.Labels;
import com.thschmitz.realstate.domain.Posts;
import com.thschmitz.realstate.domain.PostsImages;
import com.thschmitz.realstate.domain.Users;
import com.thschmitz.realstate.repository.CommentRepository;
import com.thschmitz.realstate.repository.FeedbackRepository;
import com.thschmitz.realstate.repository.LabelRepository;
import com.thschmitz.realstate.repository.PostRepository;
import com.thschmitz.realstate.repository.PostsImagesRepository;
import com.thschmitz.realstate.repository.UserRepository;

@Configuration
public class Instantiation implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private FeedbackRepository feedbackRepository;
	
	@Autowired
	private PostsImagesRepository postsImagesRepository;
	
	@Autowired
	private LabelRepository labelRepository;
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
		
		System.out.println("ENTROU AQUI");
		
		/*postsImagesRepository.deleteAll();
		feedbackRepository.deleteAll();
		userRepository.deleteAll(); // AQUI TA DELETANDO TUDOOOO
		postRepository.deleteAll();
		commentRepository.deleteAll();
		labelRepository.deleteAll();
		
		Users maria = new Users(null, "Maria Brown", "maria@gmail.com", "$2a$10$daJmJ.qCBUfFK4LC91C5be5Lcc6tQufVhrLkSDrGKWAA6XnYNlqri", sdf.parse("21/03/2018"), "https://img.freepik.com/fotos-gratis/mulher-jovem-e-elegante-magnifica-com-grandes-olhos-castanhos-e-um-sorriso-incrivel_291049-2575.jpg?w=2000", true, 996969102);
		Users alex = new Users(null, "Alex Green", "alex@gmail.com", "$2a$04$sTorVdJ0Qvx8DMICkBQ/a.ahCCiRxxAUQCag4oKuqKg2ojXjQWZgK", sdf.parse("21/03/2018"), "https://img.freepik.com/fotos-gratis/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito_176420-18743.jpg", false, 97000640);
		Users bob = new Users(null, "Bob Grey", "bob@gmail.com", "$2a$10$DN4fGCOugTAtM/.Emwqt/.hwcA25oksByW1.mAOpEcHnjUkdJw6Jq", sdf.parse("21/03/2018"), "https://img.freepik.com/fotos-premium/homem-de-negocios-novo-consideravel-na-camisa-e-nos-monoculos_85574-6228.jpg?w=360", false, 996969108);
		
		
		userRepository.saveAll(Arrays.asList(maria, alex, bob));
		
		Labels l1 = new Labels(null, sdf.parse("15/04/2023"), "Praia", "TbBeach", "A propriedade fica perto da praia!");
		Labels l2 = new Labels(null, sdf.parse("15/04/2023"), "Moderno", "MdOutlineVilla", "A propriedade é moderna!");
		Labels l3 = new Labels(null, sdf.parse("15/04/2023"), "Interior", "TbMountain", "A propriedade fica no interior!");
		Labels l4 = new Labels(null, sdf.parse("15/04/2023"), "Piscina", "TbPool", "A propriedade tem piscina!");
		Labels l5 = new Labels(null, sdf.parse("15/04/2023"), "Ilha", "GiIsland", "A propriedade fica situada em uma ilha!");
		Labels l6 = new Labels(null, sdf.parse("15/04/2023"), "Luxo", "GrDiamond", "A propriedade é de luxo!");
		
		labelRepository.saveAll(Arrays.asList(l1, l2, l3, l4, l5, l6));
		
		Posts post1 = new Posts(null, sdf.parse("12/07/2022"), "Teste01", "Testando um novo post1", 100.0, 20.3,  maria.getId(), 2, 2, "-29.688", "-52.41", "Aluguel", "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/704468c1-47cd-44e0-9d1a-3ea3db51a2e6?im_w=720", l1.getId());
		Posts post2 = new Posts(null, sdf.parse("23/10/2020"), "Teste02", "Testando um novo post2", 130.0, 25.0, alex.getId(), 1, 1, "-29.68", "-51.12", "Aluguel", "https://a0.muscache.com/im/pictures/c9a5ad04-bd38-4153-b229-d8f751bb418d.jpg?im_w=720", l2.getId());
		Posts post3 = new Posts(null, sdf.parse("05/03/2021"), "Teste03", "Testando um novo post3", 150.2, 30.5, bob.getId(), 2, 2, "-29.669", "-52.788", "Aluguel", "https://a0.muscache.com/im/pictures/miso/Hosting-554025175884504726/original/5b49b3a3-ba26-4506-89d8-1a30748f3e61.jpeg?im_w=720", l3.getId());
		Posts post4 = new Posts(null, sdf.parse("19/02/2012"), "Teste04", "Testando um novo post4", 1000000.0, 300.1, bob.getId(), 4, 4, "-28.6982", "-49.3935", "Compra", "https://a0.muscache.com/im/pictures/miso/Hosting-554025175884504726/original/5b49b3a3-ba26-4506-89d8-1a30748f3e61.jpeg?im_w=720", l4.getId());
		Posts post5 = new Posts(null, sdf.parse("14/05/2015"), "Teste05", "Testando um novo post5", 150000.0, 70.0, maria.getId(), 2, 2, "48.84609", "2.3314", "Compra", "https://a0.muscache.com/im/pictures/miso/Hosting-554025175884504726/original/5b49b3a3-ba26-4506-89d8-1a30748f3e61.jpeg?im_w=720", l5.getId());
		Posts post6 = new Posts(null, sdf.parse("05/08/2018"), "Teste06", "Testando um novo post6", 200.5, 27.5, alex.getId(), 2, 2, "48.776", "9.181688", "Aluguel", "https://a0.muscache.com/im/pictures/miso/Hosting-554025175884504726/original/5b49b3a3-ba26-4506-89d8-1a30748f3e61.jpeg?im_w=720", l6.getId());
		
		postRepository.saveAll(Arrays.asList(post1, post2, post3, post4, post5, post6));
		
		PostsImages postImage1 = new PostsImages(null, sdf.parse("12/07/2022"), "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/704468c1-47cd-44e0-9d1a-3ea3db51a2e6?im_w=720", post1.getId());
		PostsImages postImage2 = new PostsImages(null, sdf.parse("12/07/2022"), "https://a0.muscache.com/im/pictures/c9a5ad04-bd38-4153-b229-d8f751bb418d.jpg?im_w=720", post1.getId());
		PostsImages postImage3 = new PostsImages(null, sdf.parse("23/10/2022"), "https://a0.muscache.com/im/pictures/c9a5ad04-bd38-4153-b229-d8f751bb418d.jpg?im_w=720", post2.getId());
		PostsImages postImage4 = new PostsImages(null, sdf.parse("23/10/2022"), "https://a0.muscache.com/im/pictures/c9a5ad04-bd38-4153-b229-d8f751bb418d.jpg?im_w=720", post3.getId());
		PostsImages postImage5 = new PostsImages(null, sdf.parse("05/09/2022"), "https://a0.muscache.com/im/pictures/miso/Hosting-554025175884504726/original/5b49b3a3-ba26-4506-89d8-1a30748f3e61.jpeg?im_w=720", post3.getId());
		
		postsImagesRepository.saveAll(Arrays.asList(postImage1, postImage2, postImage3, postImage4, postImage5));
		
		Comments c1 = new Comments(null, "Post1Comment", sdf.parse("21/05/2019"), alex.getId(), post1.getId());
		Comments c2 = new Comments(null, "Post2Comment", sdf.parse("19/07/2020"), bob.getId(), post2.getId());
		Comments c3 = new Comments(null, "Post3Comment", sdf.parse("11/02/2021"), maria.getId(), post3.getId());
		
		Feedbacks f1 = new Feedbacks(sdf.parse("14/04/2019"), maria.getId(), post4.getId());
		Feedbacks f2 = new Feedbacks(sdf.parse("19/09/2020"), alex.getId(), post5.getId());
		Feedbacks f3 = new Feedbacks(sdf.parse("10/06/2018"), bob.getId(), post2.getId());
		Feedbacks f4 = new Feedbacks(sdf.parse("05/07/2019"), maria.getId(), post1.getId());
		Feedbacks f5 = new Feedbacks(sdf.parse("15/10/2020"), alex.getId(), post6.getId());
		
		postRepository.saveAll(Arrays.asList(post1, post2, post3));
		commentRepository.saveAll(Arrays.asList(c1, c2, c3));
		feedbackRepository.saveAll(Arrays.asList(f1, f2, f3, f4, f5));*/
		
	}
}
