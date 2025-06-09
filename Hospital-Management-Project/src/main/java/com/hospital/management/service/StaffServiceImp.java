package com.hospital.management.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hospital.management.dao.Receptionist;
import com.hospital.management.error.GlobalException;
import com.hospital.management.repository.StaffRepository;

@Service
public class StaffServiceImp implements StaffService{
	
	@Autowired
	private StaffRepository staffRepository;
	
	@Override
	public List<Receptionist> getAllStaff(){
		return staffRepository.findAll();
	}
	
	@Override
	public Receptionist getStaffById(Integer id) {
		return staffRepository.findById(id).orElse(null);
	}
	
	@Override
	public Receptionist saveStaff(Receptionist r) {
		return staffRepository.save(r);
	}
	
	@Override
	public void deleteStaff(Integer id) throws GlobalException {
		Optional<Receptionist> rec = staffRepository.findById(id);
		if(!rec.isPresent()) {
			throw new GlobalException("Receptionist Not Found with ID: " + id);
		}
		staffRepository.delete(rec.get());
	}

	@Override
	public List<Receptionist> saveAllStaff(List<Receptionist> receptionists) {
		return staffRepository.saveAll(receptionists);
	}

	@Override
	public Receptionist updateStaff(Integer id, Receptionist receptionist) throws GlobalException{
		Optional<Receptionist> optionalStaff = Optional.of(staffRepository.getById(id));
		if (optionalStaff.isPresent()) {
	        Receptionist existingStaff = optionalStaff.get();

	        existingStaff.setFirstName(receptionist.getFirstName());
	        existingStaff.setLastName(receptionist.getLastName());
	        existingStaff.setMiddleName(receptionist.getMiddleName());
	        existingStaff.setPhone(receptionist.getPhone());
	        existingStaff.setEmail(receptionist.getEmail());
	        existingStaff.setPassword(receptionist.getPassword());
	        existingStaff.setPhotoURL(receptionist.getPhotoURL());

	        return staffRepository.save(existingStaff);
	    } else {
	        throw new GlobalException("Staff not found with id " + id);
	    }
	}

	@Override
	public Receptionist findStaffById(Integer id) throws GlobalException {
		Receptionist rec = staffRepository.findReceptionistById(id);
		if(rec==null) {
			throw new GlobalException("Receptionist Not Found with ID: " + id);
		}
		return rec;
	}

	@Override
	public List<Receptionist> findStaffByName(String name) throws GlobalException {
		List<Receptionist> receptionists = staffRepository.findReceptionistsByName(name);
		if(receptionists.isEmpty()) {
			throw new GlobalException("Not Found Any Receptionist with Name " + name);
		}
		return receptionists;
	}

	@Override
	public Receptionist findStaffByEmail(String email) throws GlobalException {
		Receptionist rec = staffRepository.findReceptionistByEmail(email);
		if(rec==null) {
			throw new GlobalException("No Staff found with mail: " + email);
		}
		return rec;
	}

}
