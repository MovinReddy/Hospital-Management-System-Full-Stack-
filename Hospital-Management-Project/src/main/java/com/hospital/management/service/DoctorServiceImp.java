package com.hospital.management.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.management.dao.Doctor;
import com.hospital.management.error.GlobalException;
import com.hospital.management.repository.DoctorRepository;

@Service
public class DoctorServiceImp implements DoctorService{
	
	@Autowired
	private DoctorRepository doctorRepository;

	@Override
	public Doctor addDoctor(Doctor doctor) throws GlobalException{
		return doctorRepository.save(doctor);
	}

	@Override
	public List<Doctor> getAllDoctors() {
		return doctorRepository.findAll();
	}
	
	@Override
	public void deleteDoctor(Integer id) {
		doctorRepository.deleteById(id);
	}
	
	@Override
	public Doctor getDoctorById(Integer Id) throws GlobalException{
		Doctor doc = (Doctor) doctorRepository.getById(Id);
		if(doc==null) {
			throw new GlobalException("Doctor not found with ID:" + Id);
		}
		return doc;
	}
	
	@Override
	public List<Doctor> saveDoctors(List<Doctor> doctor) throws GlobalException{
		try {
			return doctorRepository.saveAll(doctor);
		}catch(Exception e) {
			throw new GlobalException(e.getMessage());
		}
	}

	@Override
	public List<Doctor> findDoctorsByName(String name) throws GlobalException {
		List<Doctor> doctors = doctorRepository.findByDoctorName(name);
		if(doctors.isEmpty()) {
			throw new GlobalException("No Doctor Present with Name:" + name);
		}
		return doctors;
	}

	@Override
	public Doctor findDoctorByEmail(String email) throws GlobalException {
		Doctor doc = doctorRepository.findDoctorByEmail(email);
		if(doc==null) {
			throw new GlobalException("Doctor not found");
		}
		return doc;
	}

	@Override
	public List<Doctor> findDoctorsBySpecialization(String specialization) throws GlobalException {
		List<Doctor> doctors = doctorRepository.findDoctorsBySpecialization(specialization);
		if(doctors.isEmpty()) {
			throw new GlobalException("No Doctor Present in " + specialization + " department.");
		}
		return doctors;
	}

	@Override
	public Doctor updateDoctor(Integer did, Doctor updatedDoctor) throws GlobalException {
	    Doctor existingDoctor = doctorRepository.findById(did)
	        .orElseThrow(() -> new GlobalException("Doctor not found with ID: " + did));

	    if (updatedDoctor.getDoctorId() != null && !updatedDoctor.getDoctorId().equals(did)) {
	        throw new GlobalException("ID in request body does not match path parameter");
	    }

	    // 3. Update only allowed fields
	    existingDoctor.setFirstName(updatedDoctor.getFirstName());
	    existingDoctor.setMiddleName(updatedDoctor.getMiddleName());
	    existingDoctor.setLastName(updatedDoctor.getLastName());
	    existingDoctor.setEmail(updatedDoctor.getEmail());
	    existingDoctor.setPhone(updatedDoctor.getPhone());
	    existingDoctor.setSpecialization(updatedDoctor.getSpecialization());
	    existingDoctor.setExperienceYears(updatedDoctor.getExperienceYears());
	    existingDoctor.setQualifications(updatedDoctor.getQualifications());
	    existingDoctor.setPhotoURL(updatedDoctor.getPhotoURL());

	    try {
	        return doctorRepository.save(existingDoctor);
	    } catch (Exception e) {
	        throw new GlobalException("Failed to update doctor: " + e.getMessage());
	    }
	}


}
