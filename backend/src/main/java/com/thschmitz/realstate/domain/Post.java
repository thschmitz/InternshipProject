package com.thschmitz.realstate.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="Posts")
public class Post implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private Date created_at;
	private String title;
	private String body;
	private Double price;
	private Double size;
	private Integer author_id;
	private Integer restrooms;
	private Integer bedrooms;
	private String longitude;
	private String latitude;
	private String type;
	private String main_image;
	private Integer label_id;
	
	public Post() {
		
	}

	public Post(Integer id, Date created_at, String title, String body, Double price, Double size,
		Integer author_id, Integer restrooms, Integer bedrooms, String latitude, String longitude, String type, String main_image, Integer label_id) {
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
		this.main_image = main_image;
		this.setLabel_id(label_id);
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
	
	public Integer getAuthorId() {
		return author_id;
	}

	public void setAuthorId(Integer author_id) {
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

	public String getMain_image() {
		return main_image;
	}

	public void setMain_image(String main_image) {
		this.main_image = main_image;
	}

	public Integer getLabel_id() {
		return label_id;
	}

	public void setLabel_id(Integer label_id) {
		this.label_id = label_id;
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
	
	public Boolean isEmpty() {
		if(this.created_at != null && this.title != "" && this.body != "" && this.price != null
				&& this.size != null && this.restrooms != null && this.bedrooms != null && this.latitude != null && this.longitude != null
				&& this.type != "" && this.main_image != "" && this.author_id != null && this.label_id != null) {
			return false;
		} else {
			return true;
		}
	}
}