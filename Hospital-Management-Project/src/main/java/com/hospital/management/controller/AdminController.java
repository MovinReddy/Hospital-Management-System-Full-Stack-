package com.hospital.management.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hospital.management.dao.Appointment;
import com.hospital.management.dao.Doctor;
import com.hospital.management.dao.Receptionist;
import com.hospital.management.dao.User;
import com.hospital.management.error.GlobalException;
import com.hospital.management.service.AppointmentService;
import com.hospital.management.service.DoctorService;
import com.hospital.management.service.StaffService;
import com.hospital.management.service.UserService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private UserService userService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private StaffService staffService;
    
    // ======================== DOCTOR CRUD ==========================

    // Add Multiple Doctors
    @PostMapping("/admin/addDoctors")
    public List<Doctor> addDoctors(@Valid @RequestBody List<Doctor> doctor) throws GlobalException{
    	return doctorService.saveDoctors(doctor);
    }
    
    // Get all doctors
    @GetMapping("/admin/doctors")
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    // Get doctor by ID
    @GetMapping("/admin/doctors/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Integer id) throws GlobalException {
    	Doctor doc = doctorService.getDoctorById(id);
        return ResponseEntity.ok(doc);
    }

    // Add a new doctor
    @PostMapping("/admin/addDoctor")
    public Doctor addDoctor(@Valid @RequestBody Doctor doctor) throws GlobalException {
        return doctorService.addDoctor(doctor);
    }

    // Update a doctor
    @PutMapping("/admin/doctors/{id}")
    public Doctor updateDoctor(@PathVariable Integer id, @Valid @RequestBody Doctor updatedDoctor) throws GlobalException {
        Doctor existing = doctorService.getDoctorById(id);
        if (existing!=null) {
            existing.setFirstName(updatedDoctor.getFirstName());
            existing.setLastName(updatedDoctor.getLastName());
            existing.setMiddleName(updatedDoctor.getMiddleName());
            existing.setPhone(updatedDoctor.getPhone());
            existing.setExperienceYears(updatedDoctor.getExperienceYears());
            existing.setQualifications(updatedDoctor.getQualifications());
            existing.setSpecialization(updatedDoctor.getSpecialization());
            
            return doctorService.addDoctor(existing);
        } else {
            throw new RuntimeException("Doctor not found with id " + id);
        }
    }

    // Delete doctor
    @DeleteMapping("/admin/doctors/{id}")
    public void deleteDoctor(@PathVariable Integer id) {
        doctorService.deleteDoctor(id);
    }

    // ======================== USERS ==========================

    @PostMapping("/admin/addUsers")
    public List<User> addUsers(@Valid @RequestBody List<User> users){
    	return userService.addUsers(users);
    }
    @GetMapping("/admin/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // ======================== APPOINTMENTS ==========================

    // Get all appointments
    @GetMapping("/admin/appointments")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    /*
    // Get appointments by doctor ID
    @GetMapping("/admin/appointments/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctorId(@PathVariable Integer doctorId) throws GlobalException {
        return appointmentService.getAppointmentsByDoctorId(doctorId);
    }
    */
    // Get appointments by user ID
    @GetMapping("/admin/appointments/user/{userId}")
    public List<Appointment> getAppointmentsByUserId(@PathVariable Integer userId) {
        return appointmentService.getAppointmentsByUserId(userId);
    }
    
    // Get Appointments By doctor ID
    @GetMapping("/admin/appointments/doctor/{doctorId}")
	 public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(@PathVariable Integer doctorId){
    	List<Appointment> appointments = appointmentService.getAppointmentsByDoctorID(doctorId);
    	return ResponseEntity.ok(appointments);
    }
    
    
    // Get Today Appointments
    @GetMapping("/admin/todayAppointments")
    public ResponseEntity<List<Appointment>> getTodayAppointments(){
    	List<Appointment> appointments = appointmentService.getTodayApprovedAppointments();
    	return ResponseEntity.ok(appointments);
    }
    // ======================== STAFF ==========================
    
    // Get all Staff
    @GetMapping("/admin/staff")
    public List<Receptionist> getAllStaff(){
		return staffService.getAllStaff();    	
    }
    
    // Update Staff
    @PutMapping("/admin/updateStaff/{id}")
    public Receptionist updateStaff(@PathVariable Integer id, @Valid @RequestBody Receptionist receptionist) throws GlobalException{
    	return staffService.updateStaff(id, receptionist);
    }
    
    // Save multiple Staff
    @PostMapping("/admin/addStaffs")
    public List<Receptionist> saveStaffs(@Valid @RequestBody List<Receptionist> receptionists){
    	return staffService.saveAllStaff(receptionists);
    }
    // Save New Staff
    @PostMapping("/admin/addStaff")
    public Receptionist saveStaff(@Valid @RequestBody Receptionist receptionist) {
    	return staffService.saveStaff(receptionist);
    }
    
    // Delete Staff by Id
    @DeleteMapping("admin/deleteStaff/{id}")
    public void deleteStaff(@PathVariable Integer id) throws GlobalException{
    	try{
    		staffService.deleteStaff(id);
    	}catch(Exception e) {
    		throw new GlobalException(e.getMessage());
    	}
    }
    
 // ======================== SEARCH FUNCTIONALITY ==========================

    // --- Search Doctor ---
    @GetMapping("/searchDoctorById/{id}")
    public ResponseEntity<Doctor> searchDoctorById(@PathVariable Integer id) throws GlobalException {
        Doctor doctor = doctorService.getDoctorById(id);
        return ResponseEntity.ok(doctor);
    }

    @GetMapping("/searchDoctorByName/{name}")
    public ResponseEntity<List<Doctor>> searchDoctorByName(@PathVariable String name) throws GlobalException {
        List<Doctor> doctors = doctorService.findDoctorsByName(name);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/searchDoctorByEmail/{email}")
    public ResponseEntity<Doctor> searchDoctorByEmail(@PathVariable String email) throws GlobalException {
        Doctor doctor = doctorService.findDoctorByEmail(email);
        return ResponseEntity.ok(doctor);
    }

    @GetMapping("/searchDoctorBySpecialization/{specialization}")
    public ResponseEntity<List<Doctor>> searchDoctorBySpecialization(@PathVariable String specialization) throws GlobalException {
        List<Doctor> doctors = doctorService.findDoctorsBySpecialization(specialization);
        return ResponseEntity.ok(doctors);
    }

    // --- Search Staff ---
    @GetMapping("/searchStaffById/{id}")
    public ResponseEntity<Receptionist> searchStaffById(@PathVariable Integer id) throws GlobalException {
        Receptionist staff = staffService.findStaffById(id);
        return ResponseEntity.ok(staff);
    }

    @GetMapping("/searchStaffByName/{name}")
    public ResponseEntity<List<Receptionist>> searchStaffByName(@PathVariable String name) throws GlobalException {
        List<Receptionist> staffList = staffService.findStaffByName(name);
        return ResponseEntity.ok(staffList);
    }

    // --- Search User ---
    @GetMapping("/searchUserById/{id}")
    public ResponseEntity<User> searchUserById(@PathVariable Integer id) throws GlobalException {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/searchUserByName/{name}")
    public ResponseEntity<List<User>> searchUserByName(@PathVariable String name) throws GlobalException {
        List<User> users = userService.findUsersByName(name);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/searchUserByEmail/{email}")
    public ResponseEntity<User> searchUserByEmail(@PathVariable String email) throws GlobalException {
        User user = userService.findUserByEmail(email);
        return ResponseEntity.ok(user);
    }
}
