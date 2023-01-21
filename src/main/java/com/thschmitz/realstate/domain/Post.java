package com.thschmitz.realstate.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.thschmitz.realstate.dto.AuthorDTO;
import com.thschmitz.realstate.dto.CommentDTO;
import com.thschmitz.realstate.dto.LikeDTO;

@Document
public class Post implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	private String id;
	private Date created_at;
	private String title;
	private String body;
	private String image;
	private String status;
	private Double price;
	private Double size;
	private AuthorDTO author;
	
	private List<CommentDTO> comments = new ArrayList<>();
	
	private List<LikeDTO> likes = new ArrayList<>();
	
	public Post() {
		
	}

	public Post(String id, Date created_at, String title, String body, String image, String status, Double price, Double size, AuthorDTO author) {
		this.id = id;
		this.created_at = created_at;
		this.title = title;
		this.body = body;
		this.image = image;
		this.status = status;
		this.price = price;
		this.size = size;
		this.author = author;
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public AuthorDTO getAuthor() {
		return author;
	}

	public void setAuthor(AuthorDTO author) {
		this.author = author;
	}
	
	public List<CommentDTO> getComments() {
		return comments;
	}

	public List<LikeDTO> getLikes() {
		return likes;
	}

	public void setLikes(List<LikeDTO> likes) {
		this.likes = likes;
	}
	
	public void setComments(List<CommentDTO> comments) {
		this.comments = comments;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getSize() {
		return size;
	}

	public void setSize(Double size) {
		this.size = size;
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
		Post other = (Post) obj;
		return Objects.equals(id, other.id);
	}
}
