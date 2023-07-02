package com.thschmitz.realstate.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thschmitz.realstate.domain.PostImage;
import com.thschmitz.realstate.exception.ParametersNotPassedException;
import com.thschmitz.realstate.repository.PostsImagesRepository;

@Service
public class PostImageService {

	@Autowired
	private PostsImagesRepository postsImagesRepository;
	
	public List<PostImage> insert(List<String> listUrl, Integer id) {
		
		List<PostImage> images = new ArrayList<PostImage>();
		
		for(int i = 0; i < listUrl.size(); i++) {
			PostImage image = new PostImage();
			image.setImage_url(listUrl.get(i));
			images.add(image);
		}
		
		Date created_at = new Date();
		
		for(int i = 0; i < images.size(); i++) {
			System.out.println(images.get(i).getImage_url());

			images.get(i).setCreated_at(created_at);
			images.get(i).getPost().setId(id);
			
			if(images.isEmpty()) {
				throw new ParametersNotPassedException("Você precisa informar a URL da imagem para realizar a operação!");
			}
			
			postsImagesRepository.save(images.get(i));
		}
		
		return images;
	}
	
	public List<PostImage> listAll() {
		return (List<PostImage>) postsImagesRepository.findAll();
	}
	
	public void delete(Integer id) {
		postsImagesRepository.deleteById(id);
	}
	
	public List<PostImage> findPostImagesByPost(Integer id) {
		return postsImagesRepository.findPostImagesByPostId(id);
	}
}
