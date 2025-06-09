package com.hospital.management.dao;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "appointment")
public class Appointment {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "appointment_id")
	 private Integer appointmentId;

	    //@NotNull(message = "User is required")
	    @ManyToOne
	    @JoinColumn(name = "user_id", nullable = false)
	    @JsonIgnoreProperties({"appointments", "prescriptions"})
	    private User user;

	    //@NotNull(message = "Doctor is required")
	    @ManyToOne
	    @JoinColumn(name = "doctor_id", nullable = false)
	    @JsonIgnoreProperties({"appointments", "prescriptions"})
	    private Doctor doctor;

	    @NotNull(message = "Appointment date is required")
	    @Column(name = "appointment_date", nullable = true)
		@JsonFormat(pattern = "yyyy-MM-dd")
	    private LocalDate dateOfAppointment;

	    @NotNull(message = "Appointment time is required")
	    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
		@Column(name = "appointment_time")
	    private LocalTime appointmentTime;

	    @JsonManagedReference
	    @OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL)
	    private Prescription prescription;

	    @NotNull(message = "Appointment status is required")
	    @Enumerated(EnumType.STRING)
	    private AppointmentStatus appointmentStatus = AppointmentStatus.PENDING;
	 
	
	public Appointment() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Appointment(User user, Doctor doctor, LocalDate dateOfAppointment, LocalTime appointmentTime,
			AppointmentStatus appointmentStatus) {
		super();
		this.user = user;
		this.doctor = doctor;
		this.dateOfAppointment = dateOfAppointment;
		this.appointmentTime = appointmentTime;
		this.appointmentStatus = appointmentStatus;
	}


	public Integer getAppointmentID() {
		return appointmentId;
	}
	

	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public Integer getAppointmentId() {
		return appointmentId;
	}


	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public LocalDate getDateOfAppointment() {
		return dateOfAppointment;
	}

	public void setDateOfAppointment(LocalDate dateOfAppointment) {
		this.dateOfAppointment = dateOfAppointment;
	}

	public LocalTime getAppointmentTime() {
		return appointmentTime;
	}

	public void setAppointmentTime(LocalTime appointmentTime) {
		this.appointmentTime = appointmentTime;
	}

	public AppointmentStatus getAppointmentStatus() {
		return appointmentStatus;
	}

	public void setAppointmentStatus(AppointmentStatus appointmentStatus) {
		this.appointmentStatus = appointmentStatus;
	}


	public Prescription getPrescription() {
		return prescription;
	}


	public void setPrescription(Prescription prescription) {
		this.prescription = prescription;
	}
	
}
