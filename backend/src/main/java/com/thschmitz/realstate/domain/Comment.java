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
public class Comment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String body;
	private Date created_at;
	private Integer author_id;
	private Integer post_id;
	private String author_name;
	private String author_img;

	public Comment() {

	}

	public Comment(Integer id, String body, Date created_at, Integer author_id, Integer post_id, String author_name, String author_img) {
		this.id = id;
		this.body = body;
		this.created_at = created_at;
		this.author_id = author_id;
		this.post_id = post_id;
		this.author_name = author_name;
		this.author_img = author_img;
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
	
	public String getAuthor_name() {
		return author_name;
	}

	public void setAuthor_name(String author_name) {
		this.author_name = author_name;
	}

	public String getAuthor_img() {
		return author_img;
	}

	public void setAuthor_img(String author_img) {
		this.author_img = author_img;
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
		Comment other = (Comment) obj;
		return Objects.equals(id, other.id);
	}
	
	public Boolean isEmpty() {
		if(this.body != "" && this.created_at != null && this.author_id != null && this.post_id != null && this.author_name != null && this.author_img != null) {
			return false;
		} else {
			return true;
		}
	}
}