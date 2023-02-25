package com.thschmitz.realstate.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="Comments")
public class Comments implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id @GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid", strategy = "uuid")
	private String id;
	private String body;
	private Date created_at;
	
	private String author_id;

	private String post_id;

	public Comments() {

	}

	public Comments(String id, String body, Date created_at, String author_id, String post_id) {
		this.id = id;
		this.body = body;
		this.created_at = created_at;
		this.author_id = author_id;
		this.post_id = post_id;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
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