package com.thschmitz.realstate.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.jetbrains.annotations.NotNull;

@Entity
@Table(name="Comments")
public class Comment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String body;
	private Date created_at;
	@ManyToOne
	@JoinColumn(name="author_id")
	@NotNull
	private User author;
	@ManyToOne
	@JoinColumn(name="post_id")
	@NotNull
	private Post post;

	public Comment() {

	}
	
	
	public Comment(Integer id, String body, Date created_at, User author, Post post) {
		super();
		this.id = id;
		this.body = body;
		this.created_at = created_at;
		this.author = author;
		this.post = post;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	public Boolean isEmpty() {
		if(this.body != "" && this.created_at != null && !this.author.isEmpty() && !this.post.isEmpty()) {
			return false;
		} else {
			return true;
		}
	}
}