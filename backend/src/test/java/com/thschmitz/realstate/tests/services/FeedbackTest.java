package com.thschmitz.realstate.tests.services;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.TimeZone;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.thschmitz.realstate.domain.Feedback;
import com.thschmitz.realstate.domain.Post;
import com.thschmitz.realstate.domain.User;
import com.thschmitz.realstate.repository.FeedbackRepository;
import com.thschmitz.realstate.services.FeedbackService;
import com.thschmitz.realstate.services.PostService;
import com.thschmitz.realstate.services.UserService;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
public class FeedbackTest {

	@Mock
	private FeedbackRepository feedbackRepository;
	
	private Feedback feedback;
	
	@Autowired
	@InjectMocks
	private FeedbackService feedbackService;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private UserService userService;
	
	@BeforeEach
	void setup() throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
		List<Post> posts = postService.findAll();
		List<User> users = (List<User>) userService.findAll();
		feedback = new Feedback(244, sdf.parse("12/03/2023"), users.get(1), posts.get(0));
	}
	
	@Test
	@DisplayName("Realizar o like, sem ter dado like anteriormente")
	void doTheLikeAndHaventDoneItYet() {
		
		Mockito.when(feedbackRepository.findByAuthorAndPostId(feedback.getAuthor().getId(), feedback.getPost().getId())).thenReturn(null);
		Mockito.when(feedbackRepository.save(Mockito.any(Feedback.class))).thenReturn(null);
		
		feedbackService.like(postService, feedback.getPost().getId(), feedback.getAuthor().getId());
		
		Mockito.verify(feedbackRepository).findByAuthorAndPostId(feedback.getAuthor().getId(), feedback.getPost().getId());
		Mockito.verify(feedbackRepository).save(Mockito.any(Feedback.class));
		
		Mockito.verifyNoMoreInteractions(feedbackRepository);
	}
	
	@Test
	@DisplayName("Desmarcando o like")
	void doTheLikeButHaveAlreadyDoneIt() {
		List<User> users = (List<User>) userService.findAll();
		feedback.getAuthor().setId(users.get(1).getId());
		Mockito.when(feedbackRepository.findByAuthorAndPostId(feedback.getAuthor().getId(), feedback.getPost().getId())).thenReturn(feedback);
		
		feedbackService.like(postService, feedback.getPost().getId(), feedback.getAuthor().getId());
		
		Mockito.verify(feedbackRepository).deleteById(feedback.getId());
	}
}
