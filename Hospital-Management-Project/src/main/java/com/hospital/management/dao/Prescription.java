package com.hospital.management.dao;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


@Entity
@Table(name = "prescription")
public class Prescription {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer prescriptionId;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "appointment_id", referencedColumnName = "appointment_id")
    private Appointment appointment;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"appointments", "prescriptions"})
    private User user;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    @JsonIgnoreProperties({"appointments", "prescriptions"})
    private Doctor doctor;

    @CreationTimestamp
    @Column(name = "date_created", updatable = false)
    private LocalDate dateCreated;

    @NotBlank(message = "Symptoms description is required")
    @Column(name = "symptoms", nullable = false)
    private String symptoms;

    @NotBlank(message = "Medicines list is required")
    @Column(name = "medicines", nullable = false)
    private String medicines;

    @Column(name = "notes")
    private String notes;

    // Automatically set dateCreated when new object is persisted
    @PrePersist
    protected void onCreate() {
        this.dateCreated = LocalDate.now();
    }

    // Constructors
    public Prescription() {}

    public Prescription(User user, Doctor doctor, String notes, String symptoms, String medicines) {
        this.user = user;
        this.doctor = doctor;
        this.notes = notes;
        this.symptoms = symptoms;
        this.medicines = medicines;
    }

    // Getters and Setters

    public Integer getPrescriptionId() {
        return prescriptionId;
    }

    public void setPrescriptionId(Integer prescriptionId) {
        this.prescriptionId = prescriptionId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getMedicines() {
        return medicines;
    }

    public void setMedicines(String medicines) {
        this.medicines = medicines;
    }

	@Override
	public String toString() {
		return "Prescription [prescriptionId=" + prescriptionId + ", user=" + user + ", doctor=" + doctor
				+ ", dateCreated=" + dateCreated + ", notes=" + notes + ", symptoms=" + symptoms + ", medicines="
				+ medicines + "]";
	}

	public Appointment getAppointment() {
		return appointment;
	}

	public void setAppointment(Appointment appointment) {
		this.appointment = appointment;
	}
    
}
