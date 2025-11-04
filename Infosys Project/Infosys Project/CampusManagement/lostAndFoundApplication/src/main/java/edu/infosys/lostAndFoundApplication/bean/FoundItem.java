package edu.infosys.lostAndFoundApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class FoundItem {
	@Id
	private String founditemId;
	private String username;
	private String userEmail;
	private String itemName;
	private String color;
	private String category;
	private String brand;
	private String location;
	private String foundDate;
	private boolean status;
	
	public FoundItem(String founditemId, String username, String userEmail, String itemName, String color,
			String category, String brand, String location, String foundDate) {
		super();
		this.founditemId = founditemId;
		this.username = username;
		this.userEmail = userEmail;
		this.itemName = itemName;
		this.color = color;
		this.category = category;
		this.brand = brand;
		this.location = location;
		this.foundDate = foundDate;
		this.status=false;
	}
	public FoundItem() {
		super();
	}

	public String getFounditemId() {
		return founditemId;
	}
	public void setFounditemId(String founditemId) {
		this.founditemId = founditemId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getFoundDate() {
		return foundDate;
	}
	public void setFoundDate(String foundDate) {
		this.foundDate = foundDate;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	

	
}