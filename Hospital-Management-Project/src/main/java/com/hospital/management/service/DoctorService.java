package com.hospital.management.service;

import java.util.List;
import java.util.Optional;

import com.hospital.management.dao.Doctor;
import com.hospital.management.error.GlobalException;

public interface DoctorService {
	public List<Doctor> getAllDoctors();

	public List<Doctor> saveDoctors(List<Doctor> doctor) throws GlobalException;

	public Doctor addDoctor(Doctor doctor) throws GlobalException;

	public Doctor getDoctorById(Integer id) throws GlobalException;

	public void deleteDoctor(Integer id);

	public List<Doctor> findDoctorsByName(String name) throws GlobalException;

	public Doctor findDoctorByEmail(String email) throws GlobalException;

	public List<Doctor> findDoctorsBySpecialization(String specialization) throws GlobalException;

	public Doctor updateDoctor(Integer did, Doctor doctor) throws GlobalException;
	
}
