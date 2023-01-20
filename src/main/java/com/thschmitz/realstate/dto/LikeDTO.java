package com.thschmitz.realstate.dto;

import java.io.Serializable;
import java.util.Date;

public class LikeDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Date created_at;
	private AuthorDTO author;
	
	public LikeDTO() {
		
	}
	
	public LikeDTO(Date created_at, AuthorDTO author) {
		super();
		this.created_at = created_at;
		this.author = author;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	public AuthorDTO getAuthor() {
		return author;
	}

	public void setAuthor(AuthorDTO author) {
		this.author = author;
	}
	
	
	
}
