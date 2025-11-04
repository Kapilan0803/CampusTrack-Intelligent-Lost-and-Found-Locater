package edu.infosys.lostAndFoundApplication.bean;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class LostItem {
	@Id
	private String lostItemId;
	private String username;
	private String userEmail;
	private String itemName;
	private String color;
	private String category;
	private String brand;
	private String location;
	private String lostDate;
	private boolean status;
	
	
	public LostItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LostItem(String lostItemId, String username, String userEmail, String itemName, String color, String category,
			String brand, String location, String lostDate, String foundDate) {
		super();
		this.lostItemId = lostItemId;
		this.username = username;
		this.userEmail = userEmail;
		this.itemName = itemName;
		this.color = color;
		this.category = category;
		this.brand = brand;
		this.location = location;
		this.lostDate = lostDate;
		this.status=false;
	}
	
	public String getItemId() {
		return lostItemId;
	}
	public void setItemId(String lostItemId) {
		this.lostItemId = lostItemId;
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
	public String getLostDate() {
		return lostDate;
	}
	public void setLostDate(String lostDate) {
		this.lostDate = lostDate;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
	
}