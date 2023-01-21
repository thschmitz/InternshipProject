package com.thschmitz.realstate.dto;

import java.io.Serializable;

import com.thschmitz.realstate.domain.User;

public class AuthorDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String id;
	private String name;
	private String image;
	private String email;
	
	public AuthorDTO() {
		
	}

	public AuthorDTO(User user){
		this.id = user.getId();
		this.name = user.getName();
		this.image = user.getImage();
		this.email = user.getEmail();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "AuthorDTO [id=" + id + ", name=" + name + ", image=" + image + ", email=" + email + "]";
	}
	
	
	
	
}
