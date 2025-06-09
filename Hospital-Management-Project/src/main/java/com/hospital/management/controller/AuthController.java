package com.hospital.management.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.dao.AuthResponse;
import com.hospital.management.dao.Doctor;
import com.hospital.management.dao.LoginRequest;
import com.hospital.management.dao.Receptionist;
import com.hospital.management.dao.User;
import com.hospital.management.error.GlobalException;
import com.hospital.management.service.DoctorService;
import com.hospital.management.service.StaffService;
import com.hospital.management.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
	@Autowired
    private UserService userService;
	
	@Autowired
	private DoctorService doctorService;

	@Autowired
	private StaffService staffService;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
	    Optional<User> user = userService.getUserByEmail(loginRequest.getEmail());
	    
	    if (user.isEmpty() || !user.get().getPassword().equals(loginRequest.getPassword())) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	    }
	    
	    return ResponseEntity.ok(new AuthResponse(user.get()));
	}

	@PostMapping("/registerUser")
	public ResponseEntity<?> register(@Valid @RequestBody User user) {
	    try {
	        User newUser = userService.addUser(user);
	        return ResponseEntity.ok(new AuthResponse(newUser));
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
	    }
	}
	
	@PostMapping("/doctor/login")
	public ResponseEntity<?> loginDoctor(@Valid @RequestBody LoginRequest loginRequest) throws GlobalException{
		Doctor doctor = doctorService.findDoctorByEmail(loginRequest.getEmail());
		if(doctor == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No User Found");
		}
		if(!doctor.getPassword().equals(loginRequest.getPassword())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
		}
		return ResponseEntity.ok(new AuthResponse(doctor));
	}
	
	@PostMapping("/staff/login")
	public ResponseEntity<?> staffLogin(@Valid @RequestBody LoginRequest loginRequest) throws GlobalException{
		Receptionist staff = staffService.findStaffByEmail(loginRequest.getEmail());
		if(staff==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Staff Found");
		}
		if(!staff.getPassword().equals(loginRequest.getPassword())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
		}
		return ResponseEntity.ok(new AuthResponse(staff));
	}	

}
