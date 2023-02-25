package com.thschmitz.realstate.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Comments implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id @GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid", strategy = "uuid")
	private String id;
	private String text;
	private Date created_at;
	private String authorId;

	private String postId;

	public Comments() {

	}

	public Comments(String id, String text, Date created_at, String authorId, String postId) {
		this.id = id;
		this.text = text;
		this.created_at = created_at;
		this.authorId = authorId;
		this.postId = postId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
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
		Comments other = (Comments) obj;
		return Objects.equals(id, other.id);
	}


}