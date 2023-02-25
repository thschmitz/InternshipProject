package com.thschmitz.realstate.domain;

import java.util.Date;
import java.util.Objects;

public class PostsImages {
	private String id;
	private Date created_at;
	private String post_id;
	
	public PostsImages() {
		
	}
	
	public PostsImages(String id, Date created_at, String post_id) {
		super();
		this.id = id;
		this.created_at = created_at;
		this.post_id = post_id;
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

	public String getPost_id() {
		return post_id;
	}

	public void setPost_id(String post_id) {
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
		PostsImages other = (PostsImages) obj;
		return Objects.equals(id, other.id);
	}
}
