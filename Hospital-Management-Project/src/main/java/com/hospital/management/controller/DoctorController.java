package com.hospital.management.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hospital.management.dao.Appointment;
import com.hospital.management.dao.Doctor;
import com.hospital.management.dao.Prescription;
import com.hospital.management.error.GlobalException;
import com.hospital.management.service.AppointmentService;
import com.hospital.management.service.DoctorService;
import com.hospital.management.service.PrescriptionService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class DoctorController {

	@Autowired
    private DoctorService doctorService;
	
	@Autowired
	private PrescriptionService prescriptionService;
	
	@Autowired
	private AppointmentService appointmentService;
	

    @GetMapping("/doctors/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Integer id) throws GlobalException {
    	Doctor doc = doctorService.getDoctorById(id);
        return ResponseEntity.ok(doc);
    }

    
    // All appointments for the specific Doctor
    @GetMapping("/doctors/{did}/getAppointments")
    public List<Appointment> getDoctorAppointments(@PathVariable Integer did) throws GlobalException {
    	return appointmentService.getAppointmentsByDoctorId(did);
    }
    
    // Count of Approved Appointments for today for a doctor
    @GetMapping("/doctors/countApprovedAppointmentsToday/{did}")
    public ResponseEntity<Integer> getApprovedAppointmentsToday(@PathVariable Integer did) {
    	return ResponseEntity.ok(appointmentService.getApprovedAppointmentsTodayByDoctor(did));
    }
    	
    // Count of Total Appointments for Today for a doctor
    @GetMapping("doctors/countAllAppointmentsToday/{did}")
    public ResponseEntity<Integer> getAllAppointmentsToday(@PathVariable Integer did){
    	return ResponseEntity.ok(appointmentService.getTotalAppointmentsByDoctor(did));
    }
    // ===================== Prescriptions ========================
    
    // Post or Insert Prescription
    @PostMapping("/doctors/{did}/prescription/{uid}/{aid}")
    public ResponseEntity<Prescription> createPrescription(@PathVariable Integer did, 
    														@PathVariable Integer uid,
    														@PathVariable Integer aid,
    														@Valid @RequestBody Prescription prescription) throws GlobalException{
    	return prescriptionService.createPrescription(did, uid, aid, prescription);
    }
    
    // Update Prescription
    @PutMapping("/doctors/{did}/updateprescription/{uid}/{aid}")
    public ResponseEntity<Prescription> updatePrescription(@PathVariable Integer did, 
    														@PathVariable Integer uid,
    														@PathVariable Integer aid,
    														@Valid @RequestBody Prescription prescription) throws GlobalException{
    	Prescription prescription2 = prescriptionService.updatePrescription(did, uid, aid, prescription);
    	return ResponseEntity.ok(prescription2);
    }	
    
    // Get Prescriptions
    @GetMapping("/doctors/{did}/prescriptions")
    public ResponseEntity<List<Prescription>> getPrescriptionsByDoctor(@PathVariable Integer did){
    	List<Prescription> prescriptions = prescriptionService.getPrescriptionsByDoctorId(did);
    	return ResponseEntity.ok(prescriptions);
    }
    
    // Get prescriptions by appointment id and doctor id and user id
    @GetMapping("/doctors/{did}/appointments/{aid}/prescription")
    public ResponseEntity<Prescription> getPrescriptionByAppointmentId(
            @PathVariable Integer did, 
            @PathVariable Integer aid) {
        try {
            Prescription prescription = prescriptionService.getPrescriptionByAppointmentId(did, aid);
            return ResponseEntity.ok(prescription);
        } catch (GlobalException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    // Check whether Prescription exists
    @GetMapping("/doctors/{did}/appointments/{aid}/exists")
    public ResponseEntity<Boolean> checkPrescriptionExists(
            @PathVariable Integer did, 
            @PathVariable Integer aid) {
        try {
            // This uses the existsByAppointmentId method you mentioned
            boolean exists = prescriptionService.existsByAppointmentId(aid);
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }
    
    // Update Doctor
    @PutMapping("/doctors/updateDoctor/{did}")
    public ResponseEntity<?> updateDoctor(@PathVariable Integer did, @Valid @RequestBody Doctor doctor) throws GlobalException{
    	Doctor newDoctor = doctorService.updateDoctor(did, doctor);
    	return ResponseEntity.ok(newDoctor);
    }
    
    // Get appointments for a specific doctor with a specific user
    @GetMapping("/doctors/{doctorId}/users/{userId}/appointments")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctorAndUser(
            @PathVariable Integer doctorId, 
            @PathVariable Integer userId) {
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctorAndUser(doctorId, userId);
        for (Appointment appointment : appointments) {
            Optional<Prescription> prescOpt = prescriptionService.getPrescriptionByAppointment(appointment.getAppointmentId());
            if(prescOpt.isPresent()) {
            	appointment.setPrescription(prescOpt.get());
            }
        }
        return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/doctors/{doctorId}/patients/{userId}/history")
    public ResponseEntity<List<Appointment>> getPatientHistory(
            @PathVariable Integer doctorId,
            @PathVariable Integer userId) {
        List<Appointment> history = appointmentService.getPatientHistoryForDoctor(doctorId, userId);
        for (Appointment appointment : history) {
            Optional<Prescription> prescOpt = prescriptionService.getPrescriptionByAppointment(appointment.getAppointmentId());
            if(prescOpt.isPresent()) {
                appointment.setPrescription(prescOpt.get());
            }
        }
        return ResponseEntity.ok(history);
    }
    
    // Strictly get only approved appointments for this doctor
    @GetMapping("/doctors/appointmentsToday/{doctorId}")
    public ResponseEntity<List<Appointment>> getTodayApprovedAppointments(@PathVariable Integer doctorId) {
        List<Appointment> appointments = appointmentService.getTodayApprovedAppointmentsForDoctor(doctorId);
        return ResponseEntity.ok(appointments);
    }
    
}