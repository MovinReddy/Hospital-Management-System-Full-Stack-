package com.hospital.management.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.management.dao.Appointment;
import com.hospital.management.dao.AppointmentStatus;
import com.hospital.management.dao.Doctor;
import com.hospital.management.dao.Prescription;
import com.hospital.management.dao.User;
import com.hospital.management.error.GlobalException;
import com.hospital.management.error.RestResponseEntityExceptionHandler;
import com.hospital.management.repository.AppointmentRepository;
import com.hospital.management.repository.DoctorRepository;
import com.hospital.management.repository.PrescriptionRepository;
import com.hospital.management.repository.UserRepository;

@Service
public class AppointmentServiceImp implements AppointmentService{

    @Autowired
	 private AppointmentRepository appointmentRepository;
	 
	 @Autowired
	 private DoctorRepository doctorRepository;
	 
	 @Autowired
	 private UserRepository userRepository;
	 
	 @Autowired
	 private PrescriptionRepository prescriptionRepository;

    AppointmentServiceImp(RestResponseEntityExceptionHandler restResponseEntityExceptionHandler) {
    }

	 @Override
	 public List<Appointment> getAllAppointments() {
		 return appointmentRepository.findAll();
	 }

	 @Override
	 public Optional<Appointment> getAppointmentById(Integer id) {
		 return appointmentRepository.findById(id);
	 }
	 
	 @Override
	 public Appointment addAppointment(Appointment appointment, Integer userId, Integer doctorId) throws GlobalException {
	     // Check for existing appointment
	     boolean hasAppointment = appointmentRepository.existsByUserAndDoctorAndDate(
	         userId, doctorId, appointment.getDateOfAppointment()
	     );
	     if (hasAppointment) {
	         throw new GlobalException("You already have an appointment with this doctor on this date.");
	     }

	     // Fetch doctor and user
	     Doctor doctor = doctorRepository.findById(doctorId)
	         .orElseThrow(() -> new GlobalException("Doctor not found with ID: " + doctorId));
	     User user = userRepository.findById(userId)
	         .orElseThrow(() -> new GlobalException("User not found with ID: " + userId));
	     // Set doctor, user, and default status
	     appointment.setDoctor(doctor);
	     appointment.setUser(user);
	     if (appointment.getAppointmentStatus() == null) {
	         appointment.setAppointmentStatus(AppointmentStatus.PENDING);
	     }
	     return appointmentRepository.save(appointment);
	 }

	 
	 @Override
	 public void deleteAppointment(Integer id) {
		 appointmentRepository.deleteById(id);
	 }

	 @Override
	 public List<Appointment> getAppointmentsByUserId(Integer userId) {
		 return appointmentRepository.findByUserUserId(userId);
	 }

	 @Override
	 public List<Appointment> getAppointmentsByDoctorId(Integer doctorId) {
		 return appointmentRepository.findByDoctorDoctorId(doctorId);
	 }

	@Override
	public boolean updateAppointmentStatus(Integer id) {
		Optional<Appointment> optional = appointmentRepository.findById(id);
        if (optional.isPresent()) {
            Appointment appointment = optional.get();
            appointment.setAppointmentStatus(AppointmentStatus.APPROVED);
            appointmentRepository.save(appointment);
            return true;
        }
        return false;
	}

	@Override
	public List<Appointment> getAppointmentsByDoctorID(Integer doctorId) {
		return appointmentRepository.findByAppointmentByDoctorId(doctorId);
	}

	@Override
	public List<Appointment> getTodayApprovedAppointments() {
		LocalDate today = LocalDate.now();
		return appointmentRepository.findApprovedAppointmentsForToday(today);
	}

	@Override
	public List<Appointment> getTodayApprovedAppointmentsForDoctor(Integer doctorId) {
		LocalDate today = LocalDate.now();
		return appointmentRepository.findTodayApprovedAppointmentsByDoctor(doctorId, today);
	}

	@Override
	public List<Appointment> getTodayAppointments() {
		LocalDate today = LocalDate.now();
		return appointmentRepository.findTodayAppointments(today);
	}

	@Override
	public Integer getTotalAppointmentsToday() {
		LocalDate date = LocalDate.now();
		return appointmentRepository.countTotalAppointmentsToday(date);	
	}

	@Override
	public Integer getTotalAppointmentsByDoctor(Integer doctorId) {
		return appointmentRepository.countAppointmentsTodayByDoctor(LocalDate.now(), doctorId);
	}

	@Override
	public Integer getApprovedAppointmentsTodayByDoctor(Integer doctorId) {
		return appointmentRepository.countApprovedAppointmentsTodayByDoctor(LocalDate.now(), doctorId);
	}

	@Override
	public List<Appointment> getAppointmentsByDoctorAndUser(Integer doctorId, Integer userId) {
		return appointmentRepository.findByDoctorDoctorIdAndUserUserId(doctorId, userId);
	}

	@Override
	public List<Appointment> getPatientHistoryForDoctor(Integer doctorId, Integer userId) {
		return appointmentRepository.findByDoctorDoctorIdAndUserUserIdOrderByDateOfAppointmentDesc(doctorId, userId);
	}
	
	@Override
	public Appointment updateAppointmentStatusByStaff(Integer id, String status) throws GlobalException {
	    Optional<Appointment> optionalAppointment = appointmentRepository.findById(id);
	    if (!optionalAppointment.isPresent()) {
	        throw new GlobalException("Appointment not found with ID: " + id);
	    }
	    
	    Appointment appointment = optionalAppointment.get();
	    try {
	    	
	        AppointmentStatus newStatus = AppointmentStatus.valueOf(status.toUpperCase());
	        appointment.setAppointmentStatus(newStatus);
	        return appointmentRepository.save(appointment);
	    } catch (IllegalArgumentException e) {
	        throw new GlobalException("Invalid appointment status: " + status);
	    }
	}

	@Override
	public Appointment postponeAppointment(Integer id, String newDate, String newTime) throws GlobalException {
	    Optional<Appointment> optionalAppointment = appointmentRepository.findById(id);
	    if (!optionalAppointment.isPresent()) {
	        throw new GlobalException("Appointment not found with ID: " + id);
	    }
	    
	    Appointment appointment = optionalAppointment.get();
	    try {
	        LocalDate date = LocalDate.parse(newDate);
	        appointment.setDateOfAppointment(date);
	        appointment.setAppointmentTime(LocalTime.parse(newTime));
	       
	        return appointmentRepository.save(appointment);
	    } catch (DateTimeParseException e) {
	        throw new GlobalException("Invalid date format. Use YYYY-MM-DD");
	    }
	}

	@Override
	public List<Appointment> getAppointmentsByDate(String dateStr) {
	    try {
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	        LocalDate date = LocalDate.parse(dateStr, formatter);
	        return appointmentRepository.findByDateOfAppointment(date);
	    } catch (DateTimeParseException e) {
	        System.err.println("Invalid date format: " + dateStr);
	        return new ArrayList<>();
	    }
	}

	/*
	@Override
	public List<Appointment> getAppointmentsByDate(String dateStr) {
	    try {
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	        LocalDate date = LocalDate.parse(dateStr, formatter);
	        List<Appointment> appointments = appointmentRepository.findByDateOfAppointment(date);
	        
	        // Attach prescriptions to each appointment
	        for (Appointment appointment : appointments) {
	            Optional<Prescription> prescription = prescriptionRepository.findByAppointmentAppointmentId(appointment.getAppointmentId());
	            prescription.ifPresent(appointment::setPrescription);
	        }
	        
	        return appointments;
	    } catch (DateTimeParseException e) {
	        System.err.println("Invalid date format: " + dateStr);
	        return new ArrayList<>();
	    }
	}*/

	@Override
	public List<Appointment> getAppointmentsByDateAndDoctor(String dateStr, Integer doctorId) {
	    try {
	        LocalDate date = LocalDate.parse(dateStr);
	        return appointmentRepository.findByDateOfAppointmentAndDoctorDoctorId(date, doctorId);
	    } catch (DateTimeParseException
	    		e) {
	        return new ArrayList();
	    }
	}

	@Override
	public List<Appointment> searchAppointments(String dateStr, Integer doctorId) {
		if (dateStr != null && doctorId != null) {
            LocalDate date = LocalDate.parse(dateStr);
            return appointmentRepository.findByDateOfAppointmentAndDoctorDoctorId(date, doctorId);
        } else if (dateStr != null) {
            LocalDate date = LocalDate.parse(dateStr);
            return appointmentRepository.findByDateOfAppointment(date);
        } else if (doctorId != null) {
            return appointmentRepository.findByDoctorDoctorId(doctorId);
        } else {
            return appointmentRepository.findAll(); // Or recent appointments if preferred
        }
	}
}
