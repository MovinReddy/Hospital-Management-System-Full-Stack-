package com.hospital.management.repository;

import org.springframework.stereotype.Repository;

import com.hospital.management.dao.Doctor;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
	public Optional<Doctor> findByEmail(String email);
	
	@Query("SELECT d FROM Doctor d WHERE LOWER(d.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(d.lastName) LIKE LOWER(CONCAT('%', :name, '%'))")
	public List<Doctor> findByDoctorName(String name);
	
	@Query("SELECT d FROM Doctor d WHERE d.email = :email")
    Doctor findDoctorByEmail(@Param("email") String email);

    @Query("SELECT d FROM Doctor d WHERE LOWER(d.specialization) LIKE LOWER(CONCAT('%', :specialization, '%'))")
    List<Doctor> findDoctorsBySpecialization(@Param("specialization") String specialization);

    @Query("SELECT d FROM Doctor d WHERE d.doctorId = :id")
    Doctor findDoctorById(@Param("id") Integer id);
}
