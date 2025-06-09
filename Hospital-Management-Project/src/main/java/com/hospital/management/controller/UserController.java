package com.hospital.management.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hospital.management.dao.Appointment;
import com.hospital.management.dao.Doctor;
import com.hospital.management.dao.Prescription;
import com.hospital.management.dao.User;
import com.hospital.management.error.GlobalException;
import com.hospital.management.service.AppointmentService;
import com.hospital.management.service.DoctorService;
import com.hospital.management.service.PrescriptionService;
import com.hospital.management.service.UserService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
    private UserService userService;
	
	@Autowired
	private AppointmentService appointmentService;
	
	@Autowired
	private PrescriptionService prescriptionService;
	
	@Autowired
	private DoctorService doctorService;

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }
    
    // Get All Doctors
    @GetMapping("/users/doctors")
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @PostMapping("/users/addUser")
    public User addUser(@Valid @RequestBody User user) {
        return userService.addUser(user);
    }
    
    @GetMapping("/users/appointments/{id}")
    public List<Appointment> getAppointmentsByUserId(@PathVariable Integer id) {
    	List<Appointment> appoinments = appointmentService.getAppointmentsByUserId(id);
    	for(Appointment app : appoinments) {
    		Optional<Prescription> prescription = prescriptionService.getPrescriptionByAppointment(app.getAppointmentId());
    		if(prescription.isPresent()) {
    			app.setPrescription(prescription.get());
    		}
    	}
        return appoinments;
    }

    // See Prescriptions
    @GetMapping("/users/getPrescriptions/{uid}")
    public ResponseEntity<List<Prescription>> getPrescriptions(@PathVariable Integer uid){
    	List<Prescription> prescriptions = prescriptionService.getPrescriptionsByUserId(uid);
    	return ResponseEntity.ok(prescriptions);
    }
    
    // Add Appointment
    @PostMapping("/users/{uid}/addAppointment/{did}")
	public Appointment addAppointment(@Valid @RequestBody Appointment appointment, @PathVariable Integer uid, @PathVariable Integer did) throws GlobalException {
    	return appointmentService.addAppointment(appointment, uid, did);
	}
    
    @GetMapping("/users/specialization/{specialization}")
    public ResponseEntity<List<Doctor>> getDoctorsBySpecialization(@PathVariable String specialization) throws GlobalException{
    	List<Doctor> doctor = doctorService.findDoctorsBySpecialization(specialization);
    	return ResponseEntity.ok(doctor);
    }
    
    // Update User
    @PutMapping("/users/updateUser/{uid}")
    public ResponseEntity<?> updateUser(@PathVariable Integer uid, @Valid @RequestBody User user) throws GlobalException{
    	User existing = userService.updateUser(uid, user);
    	return ResponseEntity.ok(existing);
    }
}