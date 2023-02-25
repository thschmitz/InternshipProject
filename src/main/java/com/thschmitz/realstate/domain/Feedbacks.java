package com.thschmitz.realstate.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Feedbacks implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id @GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid", strategy = "uuid")
	private String id;
	private Date created_at;
	private String authorId;
	private String postId;
	
	public Feedbacks() {
		
	}
	
	public Feedbacks(Date created_at, String authorId, String postId) {
		this.created_at = created_at;
		this.authorId = authorId;
		this.postId = postId;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	public String getAuthor() {
		return authorId;
	}

	public void setAuthor(String authorId) {
		this.authorId = authorId;
	}

	public String getPost() {
		return postId;
	}

	public void setPost(String postId) {
		this.postId = postId;
	}
	
	public String getId() {
		return id;
	}

	@Override
	public String toString() {
		return "LikeDTO [created_at=" + created_at + ", authorId=" + authorId + "]";
	}
}
