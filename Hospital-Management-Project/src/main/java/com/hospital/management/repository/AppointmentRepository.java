package com.hospital.management.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hospital.management.dao.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer>{
	
	@Query("SELECT a FROM Appointment a WHERE a.user.userId = :userId")
	public List<Appointment> findByUserUserId(@Param("userId") Integer userId);

	public List<Appointment> findByDoctorDoctorId(Integer doctorId);
	
	@Query("SELECT a FROM Appointment a where a.doctor.doctorId= :doctorId")
	public List<Appointment> findByAppointmentByDoctorId(@Param("doctorId") Integer doctorId);	
	
	@Query("SELECT a FROM Appointment a WHERE a.user.userId = :userId AND a.doctor.doctorId = :doctorId AND a.dateOfAppointment = :date")
	Optional<Appointment> findByUserDoctorAndDate(@Param("userId") Integer userId, @Param("doctorId") Integer doctorId, @Param("date") LocalDate date);

	@Query("SELECT a FROM Appointment a WHERE a.appointmentStatus = 'APPROVED' and a.dateOfAppointment= :today")
	public List<Appointment> findApprovedAppointmentsForToday(@Param("today") LocalDate Today);
	
	// All Appointments for the Today for Staff
	@Query("SELECT a FROM Appointment a WHERE a.dateOfAppointment= :today")
	public List<Appointment> findTodayAppointments(@Param("today") LocalDate today);
	
	// Today Total Appointments
	@Query("SELECT COUNT(a) FROM Appointment a WHERE a.dateOfAppointment = :today")
	public Integer countTotalAppointmentsToday(@Param("today") LocalDate today);

	// Approved Appointments Today by Doctor ID
	@Query("SELECT COUNT(a) FROM Appointment a WHERE a.dateOfAppointment = :today AND a.appointmentStatus = 'APPROVED' AND a.doctor.doctorId = :doctorId")
	public Integer countApprovedAppointmentsTodayByDoctor(@Param("today") LocalDate today, @Param("doctorId") Integer doctorId);

	// Appointments Today by Doctor ID
	@Query("SELECT COUNT(a) FROM Appointment a WHERE a.dateOfAppointment= :today AND a.doctor.doctorId= :doctorId")
	public Integer countAppointmentsTodayByDoctor(@Param("today") LocalDate today, @Param("doctorId") Integer doctorId);

	@Query("SELECT a FROM Appointment a WHERE a.doctor.doctorId = :doctorId AND a.user.userId = :userId")
	List<Appointment> findByDoctorDoctorIdAndUserUserId(@Param("doctorId") Integer doctorId, @Param("userId") Integer userId);

	@Query("SELECT a FROM Appointment a WHERE a.doctor.doctorId = :doctorId AND a.user.userId = :userId ORDER BY a.dateOfAppointment DESC")
	List<Appointment> findByDoctorDoctorIdAndUserUserIdOrderByDateOfAppointmentDesc(@Param("doctorId") Integer doctorId, @Param("userId") Integer userId);

	@Query("SELECT a FROM Appointment a WHERE a.doctor.doctorId = :doctorId AND a.appointmentStatus = 'APPROVED' AND a.dateOfAppointment = :today")
	List<Appointment> findTodayApprovedAppointmentsByDoctor(@Param("doctorId") Integer doctorId, @Param("today") LocalDate today);

	 // Check if user already has appointment with this doctor on this day
    @Query("SELECT COUNT(a) > 0 FROM Appointment a WHERE a.user.userId = :userId AND a.doctor.doctorId = :doctorId AND a.dateOfAppointment = :date")
    boolean existsByUserAndDoctorAndDate(@Param("userId") Integer userId, @Param("doctorId") Integer doctorId, @Param("date") LocalDate date);

    @Query("SELECT a FROM Appointment a WHERE a.dateOfAppointment= :date")
    List<Appointment> findByDateOfAppointment(@Param("date") LocalDate date);
    
    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.prescription WHERE a.dateOfAppointment = :date")
    List<Appointment> findByDateOfAppointmentWithPrescription(@Param("date") LocalDate date);
    
    List<Appointment> findByDateOfAppointmentAndDoctorDoctorId(LocalDate date, Integer doctorId);

}
