package com.thschmitz.realstate.dto;

import java.io.Serializable;
import java.util.Date;

import com.thschmitz.realstate.domain.Post;

public class PostDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String id;
	private String title;
	private String body;
	private String image;
	private Date created_at;
	private Double price;
	private Double size;
	
	public PostDTO() {
		
	}
	
	public PostDTO(Post post) {
		id = post.getId();
		title = post.getTitle();
		body = post.getBody();
		image = post.getImage();
		created_at = post.getCreated_at();
		price = post.getPrice();
		size = post.getSize();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getSize() {
		return size;
	}

	public void setSize(Double size) {
		this.size = size;
	}
}
