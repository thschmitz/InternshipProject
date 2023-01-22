package com.thschmitz.realstate.dto;

import java.io.Serializable;
import java.util.Date;

import com.thschmitz.realstate.domain.Comment;


public class CommentDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String id;
	private String text;
	private Date created_at;
	private AuthorDTO author;
	
	public CommentDTO() {
		
	}

	public CommentDTO(Comment comment) {
		this.id = comment.getId();
		this.text = comment.getText();
		this.created_at = comment.getCreated_at();
		this.author = comment.getAuthor();
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

	public AuthorDTO getAuthor() {
		return author;
	}

	public void setAuthor(AuthorDTO author) {
		this.author = author;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
}
