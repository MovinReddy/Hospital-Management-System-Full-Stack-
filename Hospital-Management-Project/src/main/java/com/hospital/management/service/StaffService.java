package com.hospital.management.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.hospital.management.dao.Receptionist;
import com.hospital.management.error.GlobalException;

public interface StaffService {

	List<Receptionist> getAllStaff();

	Receptionist getStaffById(Integer id);

	Receptionist saveStaff(Receptionist r);

	void deleteStaff(Integer id) throws GlobalException;

	List<Receptionist> saveAllStaff(List<Receptionist> receptionists);

	Receptionist updateStaff(Integer id, Receptionist receptionist) throws GlobalException;

	Receptionist findStaffById(Integer id) throws GlobalException;

	List<Receptionist> findStaffByName(String name) throws GlobalException;

	Receptionist findStaffByEmail(String email) throws GlobalException;

}
