package com.thschmitz.realstate.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.Comments;
import com.thschmitz.realstate.domain.PostsImages;
import com.thschmitz.realstate.exception.ParametersNotPassedException;
import com.thschmitz.realstate.repository.PostsImagesRepository;

@Service
public class PostImageService {

	@Autowired
	private PostsImagesRepository postsImagesRepository;
	
	
	public PostsImages insert(PostsImages images) {
		
		if(images.isEmpty()) {
			throw new ParametersNotPassedException("Você precisa informar a URL da imagem para realizar a operação!");
		}
		
		postsImagesRepository.save(images);
		
		return images;
	}
	
	public List<PostsImages> listAll() {
		return (List<PostsImages>) postsImagesRepository.findAll();
	}
	
	public void delete(Integer id) {
		postsImagesRepository.deleteById(id);
	}
	
	public List<PostsImages> findPostImagesByPost(Integer id) {
		return postsImagesRepository.findPostImagesByPostId(id);
	}
}
