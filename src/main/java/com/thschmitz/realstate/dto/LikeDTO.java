package com.thschmitz.realstate.dto;

import java.io.Serializable;
import java.util.Date;

import com.thschmitz.realstate.domain.Like;

public class LikeDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Date created_at;
	private AuthorDTO author;
	
	public LikeDTO() {
		
	}
	
	public LikeDTO(Like like) {
		this.created_at = like.getCreated_at();
		this.author = like.getAuthor();
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

	@Override
	public String toString() {
		return "LikeDTO [created_at=" + created_at + ", author=" + author + "]";
	}
	
	
	
	
}
