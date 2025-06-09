package com.hospital.management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.management.repository.UserRepository;
import com.hospital.management.repository.DoctorRepository;
import com.hospital.management.repository.StaffRepository;
import com.hospital.management.error.GlobalException;

@Service
public class EmailValidationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private StaffRepository staffRepository;

    public void validateUniqueEmail(String email) throws GlobalException {
        boolean emailExists =
                userRepository.findByEmail(email).isPresent() ||
                doctorRepository.findDoctorByEmail(email) != null ||
                staffRepository.findReceptionistByEmail(email) != null;

        if (emailExists) {
            throw new GlobalException("Email already exists in system: " + email);
        }
    }
}
