package com.hospital.management.dao;

public class AuthResponse {
	private User user;
	private Doctor doctor;
	private Receptionist staff;
	private String token;
	public AuthResponse(User user) {
		this.user = user;
		this.doctor = null;
		this.staff = null;
	}
	public AuthResponse(Doctor doctor) {
		this.doctor = doctor;
		this.user = null;
		this.staff = null;
	}
	public AuthResponse(Receptionist staff) {
		this.staff = staff;
		this.doctor = null;
		this.user = null;
	}
	
	public Receptionist getStaff() {
		return staff;
	}
	public void setStaff(Receptionist staff) {
		this.staff = staff;
	}
	public Doctor getDoctor() {
		return doctor;
	}
	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	
}
