package com.hospital.management.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.hospital.management.dao.Prescription;
import com.hospital.management.error.GlobalException;

public interface PrescriptionService {

	public ResponseEntity<Prescription> createPrescription(Integer did, Integer uid, Integer aid, Prescription prescription) throws GlobalException;

	public Prescription updatePrescription(Integer did, Integer uid, Integer aid, Prescription prescription) throws GlobalException;

	public List<Prescription> getPrescriptionsByDoctorId(Integer did);

	public List<Prescription> getPrescriptionsByUserId(Integer uid);

	public Prescription getPrescriptionByAppointmentId(Integer did, Integer aid) throws GlobalException;

	public boolean existsByAppointmentId(Integer aid);

	public Optional<Prescription> getPrescriptionByAppointment(Integer appointmentId);

}
