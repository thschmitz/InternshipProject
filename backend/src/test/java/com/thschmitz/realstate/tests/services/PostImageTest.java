package com.thschmitz.realstate.tests.services;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.thschmitz.realstate.domain.PostImage;
import com.thschmitz.realstate.exception.ParametersNotPassedException;
import com.thschmitz.realstate.services.PostImageService;

@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
public class PostImageTest {

	@Autowired
	private PostImageService postImageService;
	
	private List<String> postImage = new ArrayList<String>();
	
	@BeforeEach
	void setup() throws Exception {
		this.postImage.add("https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/704468c1-47cd-44e0-9d1a-3ea3db51a2e6?im_w=720");
	}
	/*
	@Test
	void throwingParametersNotPassedExceptionWithoutImage() {
		assertThrows(ParametersNotPassedException.class, () -> postImageService.insert(postImage, 372));
	}*/
	
	@Test
	void doesNotThrowingAnyExceptionWhileSavingImagePost() {
		assertDoesNotThrow(() -> postImageService.insert(postImage, 372));
	}
}