package com.hospital.management.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hospital.management.dao.Prescription;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Integer> {
    
    @Query("SELECT p FROM Prescription p WHERE p.doctor.doctorId = :doctorId")
    List<Prescription> findPrescriptionsByDoctorDoctorId(@Param("doctorId") Integer doctorId);
    
    @Query("SELECT p FROM Prescription p WHERE p.user.userId = :userId")
    List<Prescription> findPrescriptionsByUserUserId(@Param("userId") Integer userId);
    
    // Add this method for finding prescriptions by user ID
    List<Prescription> findByUserUserId(Integer userId);
    
    // Method to check if prescription exists
    boolean existsByAppointmentAppointmentId(Integer appointmentId);
    
    // In PrescriptionRepository.java
    Optional<Prescription> findByAppointmentAppointmentId(Integer appointmentId);

    /*@Query("SELECT p FROM Prescription p WHERE p.appointment.appointmentId = :appointmentId")
    Optional<Prescription> findByAppointmentAppointmentId(@Param("appointmentId") Integer appointmentId);*/

    /*@Query("SELECT p FROM Prescription p WHERE p.appointment.appointmentId = :appointmentId")
    Prescription findByAppointmentAppointmentId(@Param("appointmentId") Integer appointmentId);*/
    
    // method to check if prescription exists for an appointment
    @Query("SELECT COUNT(p) > 0 FROM Prescription p WHERE p.appointment.appointmentId = :appointmentId")
    boolean existsByAppointmentId(@Param("appointmentId") Integer appointmentId);
}
	