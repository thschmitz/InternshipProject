package com.thschmitz.realstate.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.thschmitz.realstate.dto.AuthorDTO;

@Entity
public class Feedback {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private String id;
	private Date created_at;
	private AuthorDTO author;
	
	@ManyToOne
	private Post post;
	
	public Feedback() {
		
	}
	
	public Feedback(Date created_at, AuthorDTO author, Post post) {
		this.created_at = created_at;
		this.author = author;
		this.post = post;
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
