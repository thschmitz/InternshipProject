package com.thschmitz.realstate.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.jetbrains.annotations.NotNull;

@Entity
@Table(name="Feedbacks")
public class Feedback implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private Date created_at;
	@ManyToOne
	@JoinColumn(name="author_id")
	@NotNull
	private User author;
	@ManyToOne
	@JoinColumn(name = "post_id")
	@NotNull
	private Post post;
	
	public Feedback() {
		
	}
	
	public Feedback(Date created_at, User author_id, Post post) {
		this.created_at = created_at;
		this.author = author_id;
		this.post = post;
	}
	
	public Feedback(Integer id, Date created_at, User author_id, Post post) {
		this.id = id;
		this.created_at = created_at;
		this.author = author_id;
		this.post = post;
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
	
	public Integer getId() {
		return id;
	}

	@Override
	public String toString() {
		return "LikeDTO [created_at=" + created_at + ", author_id=" + author.getId() + "]";
	}

	public Boolean isEmpty() {
		if(this.created_at != null && !this.author.isEmpty() && this.post.isEmpty()) {
			return false;
		} else {
			return true;
		}
	}
}
