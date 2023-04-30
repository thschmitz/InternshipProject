package com.thschmitz.realstate.tests.services;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.text.SimpleDateFormat;
import java.util.TimeZone;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.thschmitz.realstate.domain.PostsImages;
import com.thschmitz.realstate.exception.ParametersNotPassedException;
import com.thschmitz.realstate.services.PostImageService;

@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
public class PostImageTest {

	@Autowired
	private PostImageService postImageService;
	
	private PostsImages postImage;
	
	@BeforeEach
	void setup() throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
		postImage = new PostsImages(318, sdf.parse("12/07/2022"), "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/704468c1-47cd-44e0-9d1a-3ea3db51a2e6?im_w=720", 362);
	}
	
	@Test
	void throwingParametersNotPassedExceptionWithoutImage() {
		postImage.setImage_url("");
		assertThrows(ParametersNotPassedException.class, () -> postImageService.insert(postImage));
	}
	
	@Test
	void doesNotThrowingAnyExceptionWhileSavingImagePost() {
		System.out.println(postImage.getImage_url());
		assertDoesNotThrow(() -> postImageService.insert(postImage));
	}
}