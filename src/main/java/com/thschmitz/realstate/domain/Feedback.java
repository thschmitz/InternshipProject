package com.thschmitz.realstate.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Feedback implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id @GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid", strategy = "uuid")
	private String id;
	private Date created_at;
	private String author_id;
	private String post_id;
	
	public Feedback() {
		
	}
	
	public Feedback(Date created_at, String author_id, String post_id) {
		this.created_at = created_at;
		this.author_id = author_id;
		this.post_id = post_id;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	public String getAuthor() {
		return author_id;
	}

	public void setAuthor(String author_id) {
		this.author_id = author_id;
	}

	public String getPost() {
		return post_id;
	}

	public void setPost(String post_id) {
		this.post_id = post_id;
	}
	
	public String getId() {
		return id;
	}

	@Override
	public String toString() {
		return "LikeDTO [created_at=" + created_at + ", author_id=" + author_id + "]";
	}
}
