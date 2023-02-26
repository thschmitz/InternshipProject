package com.thschmitz.realstate.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="Posts")
public class Posts implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id @GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid", strategy = "uuid")
	private String id;
	private Date created_at;
	private String title;
	private String body;
	private Double price;
	private Double size;
	private String author_id;
	private Integer restrooms;
	private Integer bedrooms;
	private String longitude;
	private String latitude;
	private String type;
	
	public Posts() {
		
	}

	public Posts(String id, Date created_at, String title, String body, Double price, Double size,
		String author_id, Integer restrooms, Integer bedrooms, String longitude, String latitude, String type) {
		this.id = id;
		this.created_at = created_at;
		this.title = title;
		this.body = body;
		this.price = price;
		this.size = size;
		this.author_id = author_id;
		this.restrooms = restrooms;
		this.bedrooms = bedrooms;
		this.longitude = longitude;
		this.latitude = latitude;
		this.type = type;
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
	
	public String getAuthorId() {
		return author_id;
	}

	public void setAuthorId(String author_id) {
		this.author_id = author_id;
	}

	public Integer getRestrooms() {
		return restrooms;
	}

	public void setRestrooms(Integer restrooms) {
		this.restrooms = restrooms;
	}

	public Integer getBedrooms() {
		return bedrooms;
	}

	public void setBedrooms(Integer bedrooms) {
		this.bedrooms = bedrooms;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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
		Posts other = (Posts) obj;
		return Objects.equals(id, other.id);
	}


}
