package com.thschmitz.realstate.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Comments")
public class Comments implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String body;
	private Date created_at;
	private Integer author_id;
	private Integer post_id;

	public Comments() {

	}

	public Comments(Integer id, String body, Date created_at, Integer author_id, Integer post_id) {
		this.id = id;
		this.body = body;
		this.created_at = created_at;
		this.author_id = author_id;
		this.post_id = post_id;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getText() {
		return body;
	}

	public void setText(String body) {
		this.body = body;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	public Integer getAuthor() {
		return author_id;
	}

	public void setAuthor(Integer author_id) {
		this.author_id = author_id;
	}

	public Integer getPost() {
		return post_id;
	}

	public void setPost(Integer post_id) {
		this.post_id = post_id;
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