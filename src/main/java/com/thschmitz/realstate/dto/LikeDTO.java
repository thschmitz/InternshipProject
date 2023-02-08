package com.thschmitz.realstate.dto;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.ManyToOne;

import com.thschmitz.realstate.domain.Post;

public class LikeDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Date created_at;
	private AuthorDTO author;
	
	@ManyToOne
	private Post post;
	
	public LikeDTO() {
		
	}
	
	public LikeDTO(Date created_at, AuthorDTO author) {
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

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	@Override
	public String toString() {
		return "LikeDTO [created_at=" + created_at + ", author=" + author + "]";
	}
	
}
