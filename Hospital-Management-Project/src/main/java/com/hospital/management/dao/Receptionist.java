package com.hospital.management.dao;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "receptionist")
public class Receptionist {
	   @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "staff_id")
	    private Integer id;

	    @NotBlank(message = "First name is required")
	    @Size(max = 50, message = "First name must be less than 50 characters")
	    @Column(name = "first_name", nullable = false)
	    private String firstName;

	    @Size(max = 50, message = "Middle name must be less than 50 characters")
	    @Column(name = "middle_name")
	    private String middleName;

	    @NotBlank(message = "Last name is required")
	    @Size(max = 50, message = "Last name must be less than 50 characters")
	    @Column(name = "last_name", nullable = false)
	    private String lastName;

	    @NotBlank(message = "Email is required")
	    @Email(message = "Invalid email format")
	    @Column(name = "email", unique = true, nullable = false)
	    private String email;

	    @NotBlank(message = "Password is required")
	    @Size(min = 6, message = "Password must be at least 6 characters")
	    @Column(name = "password", nullable = false)
	    private String password;

	    @NotBlank(message = "Phone number is required")
	    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Invalid phone number format")
	    @Column(name = "phone", unique = true, nullable = false)
	    private String phone;

	    @Enumerated(EnumType.STRING)
	    @Column(columnDefinition = "ENUM('FEMALE', 'MALE', 'OTHER')")
	    private Gender gender;

	    @JsonFormat(pattern = "yyyy-MM-dd")
	    @Column(name = "joining_date", updatable = false)
	    private LocalDate joiningDate;

	    @Column(name = "photo_url", length = 255)
	    private String photoURL;

	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private UserRole role = UserRole.STAFF;
	    
	public Receptionist() {
		super();
	}


	public Receptionist(String staffFirstName, String staffMiddleName, String staffLastName, String staffEmail,
	        String staffPhone, String password, Gender gender, LocalDate joiningDate, String photoURL) {
	    this.firstName = staffFirstName;
	    this.middleName = staffMiddleName;
	    this.lastName = staffLastName;
	    this.email = staffEmail;
	    this.phone = staffPhone;
	    this.password = password;
	    this.gender = gender;
	    this.joiningDate = joiningDate;
	    this.photoURL = photoURL;
	    this.role = UserRole.STAFF;
	}


	public Gender getGender() {
		return gender;
	}


	public void setGender(Gender gender) {
		this.gender = gender;
	}


	public LocalDate getJoiningDate() {
		return joiningDate;
	}


	public void setJoiningDate(LocalDate joiningDate) {
		this.joiningDate = joiningDate;
	}


	public String getPhotoURL() {
		return photoURL;
	}


	public void setPhotoURL(String photoURL) {
		this.photoURL = photoURL;
	}


	public UserRole getRole() {
		return role;
	}


	public void setRole(UserRole role) {
		this.role = role;
	}


	

	
	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Integer getId() {
		return id;
	}
	
	
}
