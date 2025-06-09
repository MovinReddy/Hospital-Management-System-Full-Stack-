package com.hospital.management.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.dao.Appointment;
import com.hospital.management.error.GlobalException;
import com.hospital.management.service.AppointmentService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class AppointmentController {
	 @Autowired
	 private AppointmentService appointmentService;

	 @GetMapping("/appointments")
	 public List<Appointment> getAllAppointments() {
		 return appointmentService.getAllAppointments();
	 }

	 @GetMapping("/appointments/{id}")
	 public Optional<Appointment> getAppointmentById(@PathVariable Integer id) {
		 return appointmentService.getAppointmentById(id);
	 }

	 @PostMapping("/appointments/{uid}/addAppointment/{did}")
	 public Appointment addAppointment( @Valid @RequestBody Appointment appointment, @PathVariable Integer uid, @PathVariable Integer did) throws GlobalException {
		 return appointmentService.addAppointment(appointment, uid, did);
	 }

	 @DeleteMapping("/appointments/{id}")
	 public void deleteAppointment(@PathVariable Integer id) {
		 appointmentService.deleteAppointment(id);
	 }

	 @GetMapping("/appointments/user/{userId}")
	 public List<Appointment> getAppointmentsByUserId(@PathVariable Integer userId) {
		 return appointmentService.getAppointmentsByUserId(userId);
	 }
	 
}
