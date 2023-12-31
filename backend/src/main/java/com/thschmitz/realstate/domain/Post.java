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

import org.jetbrains.annotations.NotNull;

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
	@ManyToOne
	@JoinColumn(name="author_id")
	@NotNull
	private User author;
	private Integer restrooms;
	private Integer bedrooms;
	private String longitude;
	private String latitude;
	private String type;
	private String main_image;
	@ManyToOne
	@JoinColumn(name="label_id")
	@NotNull
	private Label label;
	
	public Post() {
		
	}
	
	public Post(Integer id, Date created_at, String title, String body, Double price, Double size, User author,
			Integer restrooms, Integer bedrooms, String longitude, String latitude, String type, String main_image,
			Label label) {
		super();
		this.id = id;
		this.created_at = created_at;
		this.title = title;
		this.body = body;
		this.price = price;
		this.size = size;
		this.author = author;
		this.restrooms = restrooms;
		this.bedrooms = bedrooms;
		this.longitude = longitude;
		this.latitude = latitude;
		this.type = type;
		this.main_image = main_image;
		this.label = label;
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

	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
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

	public Label getLabel() {
		return label;
	}

	public void setLabel(Label label) {
		this.label = label;
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
				&& this.type != "" && this.main_image != "" && !this.author.isEmpty() && !this.label.isEmpty()) {
			return false;
		} else {
			return true;
		}
	}
}
