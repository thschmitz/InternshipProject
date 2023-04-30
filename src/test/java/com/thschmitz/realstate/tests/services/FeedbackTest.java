package com.thschmitz.realstate.tests.services;

import java.text.SimpleDateFormat;
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

import com.thschmitz.realstate.domain.Feedbacks;
import com.thschmitz.realstate.repository.FeedbackRepository;
import com.thschmitz.realstate.services.FeedbackService;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
public class FeedbackTest {

	@Mock
	private FeedbackRepository feedbackRepository;
	
	private Feedbacks feedback;
	
	@Autowired
	@InjectMocks
	private FeedbackService feedbackService;
	
	@BeforeEach
	void setup() throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
		feedback = new Feedbacks(244, sdf.parse("12/03/2023"), 245, 365);
	}
	
	@Test
	@DisplayName("Realizar o like, sem ter dado like anteriormente")
	void doTheLikeAndHaventDoneItYet() {
		
		Mockito.when(feedbackRepository.findByAuthorAndPostId(245, 365)).thenReturn(null);
		Mockito.when(feedbackRepository.save(Mockito.any(Feedbacks.class))).thenReturn(null);
		
		feedbackService.like(365, 245);
		
		Mockito.verify(feedbackRepository).findByAuthorAndPostId(245, 365);
		Mockito.verify(feedbackRepository).save(Mockito.any(Feedbacks.class));
		
		Mockito.verifyNoMoreInteractions(feedbackRepository);
	}
}
