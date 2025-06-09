package com.hospital.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hospital.management.dao.Receptionist;

@Repository
public interface StaffRepository extends JpaRepository<Receptionist, Integer>{
	
	 @Query("SELECT r FROM Receptionist r WHERE LOWER(r.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(r.lastName) LIKE LOWER(CONCAT('%', :name, '%'))")
	 List<Receptionist> findReceptionistsByName(@Param("name") String name);

	 @Query("SELECT r FROM Receptionist r WHERE r.id = :id")
	 Receptionist findReceptionistById(@Param("id") Integer id);

	 @Query("SELECT r FROM Receptionist r WHERE r.email= :email")
	 Receptionist findReceptionistByEmail(@Param("email") String email);
}
