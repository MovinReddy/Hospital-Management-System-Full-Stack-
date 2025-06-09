package com.hospital.management.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.dao.Appointment;
import com.hospital.management.dao.Receptionist;
import com.hospital.management.error.GlobalException;
import com.hospital.management.service.AppointmentService;
import com.hospital.management.service.StaffService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class StaffController {
	
	@Autowired
	private StaffService staffService;
	
	@Autowired
	private AppointmentService appointmentService;
	
	@GetMapping("/staff/receptionist/{id}")
	public ResponseEntity<Receptionist> getStaffById(@PathVariable Integer id){
		Receptionist rec = staffService.getStaffById(id);
		if(rec == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.ok(rec);
	}
	
	// Update Staff Profile
	@PutMapping("/staff/updatereceptionist/{id}")
	public ResponseEntity<?> updateStaff(@PathVariable Integer id, @Valid @RequestBody Receptionist receptionist) throws GlobalException{
		Receptionist res = staffService.updateStaff(id, receptionist);
		if(res == null) {
			throw new GlobalException("Receptionist not Found!");
		}
		return ResponseEntity.ok(res);
	}
	
	// Update Appointment Status - Approved or Cancelled
	@PutMapping("/staff/update-appointment-status/{id}/{status}")
	public ResponseEntity<?> updateAppointmentStatus(@PathVariable Integer id, @PathVariable String status) throws GlobalException {
	    Appointment appointment = appointmentService.updateAppointmentStatusByStaff(id, status);
		return ResponseEntity.ok(appointment);
	}

	@PutMapping("/staff/postpone-appointment/{id}")
	public Appointment postponeAppointment(@PathVariable Integer id, @RequestBody Map<String, String> body) throws GlobalException {
	    String newDate = body.get("dateOfAppointment");
	    String newTime = body.get("appointmentTime");
	    return appointmentService.postponeAppointment(id, newDate, newTime);
	}

	@GetMapping("/staff/appointments-by-date/{date}")
	public ResponseEntity<List<Appointment>> getAppointmentsByDate(@PathVariable String date) {
	    List<Appointment> appointments = appointmentService.getAppointmentsByDate(date);
	    return ResponseEntity.ok(appointments);
	}

	@GetMapping("/staff/appointments-by-date-and-doctor/{date}/{doctorId}")
	public ResponseEntity<List<Appointment>> getAppointmentsByDateAndDoctor(
	        @PathVariable String date, @PathVariable Integer doctorId) {
	    List<Appointment> appointments = appointmentService.getAppointmentsByDateAndDoctor(date, doctorId);
	    return ResponseEntity.ok(appointments);
	}

    @GetMapping("/staff/doctors/{did}/getAppointments")
    public ResponseEntity<List<Appointment>> getDoctorAppointments(@PathVariable Integer did) {
        try {
    	    return ResponseEntity.ok(appointmentService.getAppointmentsByDoctorId(did));
        } catch (GlobalException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @GetMapping("/staff/approvedAppointmentsToday")
    public ResponseEntity<List<Appointment>> getApprovedAppointmentsToday(){
    	List<Appointment> appointments = appointmentService.getTodayApprovedAppointments();
    	return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/staff/approvedAppointmentsToday/{doctorId}")
    public ResponseEntity<List<Appointment>> getApprovedAppointmentsByDoctorId(@PathVariable Integer doctorId){
    	List<Appointment> appointments = appointmentService.getTodayApprovedAppointmentsForDoctor(doctorId);
    	return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/staff/appointmentsToday")
    public ResponseEntity<List<Appointment>> getAppointmentsToday(){
    	List<Appointment> appointments = appointmentService.getTodayAppointments();
    	return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/staff/countApprovedAppointmentsTodayByDoctor/{did}")
    public ResponseEntity<Integer> getApprovedAppointmentCountByDoctor(@PathVariable Integer did) {
    	return ResponseEntity.ok(appointmentService.getApprovedAppointmentsTodayByDoctor(did));
    }
    	
    @GetMapping("/staff/countAllAppointmentsTodayByDoctor/{did}")
    public ResponseEntity<Integer> getTotalAppointmentCountByDoctor(@PathVariable Integer did){
    	return ResponseEntity.ok(appointmentService.getTotalAppointmentsByDoctor(did));
    }
    
    @GetMapping("/staff/countAllAppointmentsToday")
    public ResponseEntity<Integer> getTotalAppointmentsCount(){
    	return ResponseEntity.ok(appointmentService.getTotalAppointmentsToday());
    }
    
    @GetMapping("/staff/appointments/search")
    public List<Appointment> searchAppointments(
        @RequestParam(required = false) String date,
        @RequestParam(required = false) Integer doctorId
    ) {
        return appointmentService.searchAppointments(date, doctorId);
    }
}
