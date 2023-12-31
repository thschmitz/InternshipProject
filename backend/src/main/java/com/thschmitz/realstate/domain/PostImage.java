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
import javax.persistence.UniqueConstraint;

import org.jetbrains.annotations.NotNull;

@Entity
@Table(name="PostsImages", uniqueConstraints = {@UniqueConstraint(columnNames={"id"})})
public class PostImage implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private Date created_at;
	private String image_url;
	@ManyToOne
	@JoinColumn(name="post_id")
	@NotNull
	private Post post;
	
	public PostImage() {
		
	}
	
	public PostImage(Integer id, Date created_at, String image_url, Post post) {
		super();
		this.id = id;
		this.created_at = created_at;
		this.setImage_url(image_url);
		this.post = post;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	public String getImage_url() {
		return image_url;
	}

	public void setImage_url(String image_url) {
		this.image_url = image_url;
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
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
		PostImage other = (PostImage) obj;
		return Objects.equals(id, other.id);
	}

	public Boolean isEmpty() {
		if(this.created_at != null && this.image_url != "" && this.image_url != null && !this.post.isEmpty()) {
			return false;
		} else {
			return true;
		}
	}
}
