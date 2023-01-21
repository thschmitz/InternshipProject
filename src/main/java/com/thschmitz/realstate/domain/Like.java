package com.thschmitz.realstate.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import org.springframework.data.mongodb.core.mapping.DBRef;

import com.thschmitz.realstate.dto.AuthorDTO;

public class Like implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String id;
	private Date created_at;
	private AuthorDTO author;
	
	@DBRef(lazy=true)
	private Post post;
	
	public Like() {
		
	}

	public Like(String id, Date created_at, AuthorDTO author, Post post) {
		super();
		this.created_at = created_at;
		this.author = author;
		this.post = post;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Like other = (Like) obj;
		return Objects.equals(id, other.id);
	}
}
