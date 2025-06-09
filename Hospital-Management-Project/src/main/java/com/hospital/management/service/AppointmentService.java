package com.hospital.management.service;

import java.util.List;
import java.util.Optional;


import com.hospital.management.dao.Appointment;
import com.hospital.management.error.GlobalException;

public interface AppointmentService {

	public Optional<Appointment> getAppointmentById(Integer id);

	public List<Appointment> getAllAppointments();

	public Appointment addAppointment(Appointment appointment, Integer userId, Integer doctorId) throws GlobalException;

	public void deleteAppointment(Integer id);

	public List<Appointment> getAppointmentsByUserId(Integer userId);

	public List<Appointment> getAppointmentsByDoctorId(Integer doctorId) throws GlobalException;

	public boolean updateAppointmentStatus(Integer id);

	public List<Appointment> getAppointmentsByDoctorID(Integer doctorId);

	// Appointments for the particular Day - for Admin
	public List<Appointment> getTodayApprovedAppointments();
	
	// Approved Appointments for the Today - Doctor
	public List<Appointment> getTodayApprovedAppointmentsForDoctor(Integer doctorId);

	// All Appointments for today day
	public List<Appointment> getTodayAppointments();
	
	// Get Total Appointments Count - Staff
	public Integer getTotalAppointmentsToday();
	
	// Get All Appointments Count by Doctor - Staff, Doctor
	public Integer getTotalAppointmentsByDoctor(Integer doctorId);
	
	// Get Approved Appointments Count by Doctor - Staff, Doctor
	public Integer getApprovedAppointmentsTodayByDoctor(Integer doctorId);

	public List<Appointment> getAppointmentsByDoctorAndUser(Integer doctorId, Integer userId);

	public List<Appointment> getPatientHistoryForDoctor(Integer doctorId, Integer userId);

	public Appointment postponeAppointment(Integer id, String newDate, String newTime) throws GlobalException;

	public Appointment updateAppointmentStatusByStaff(Integer id, String status) throws GlobalException;

	public List<Appointment> getAppointmentsByDate(String date);

	public List<Appointment> getAppointmentsByDateAndDoctor(String date, Integer doctorId);

	public List<Appointment> searchAppointments(String date, Integer doctorId);
	
}
