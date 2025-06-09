# Hospital Management System (HMS)

## Overview

The **Hospital Management System (HMS)** is a web-based application designed to streamline hospital operations, improve patient care, and enhance doctor-patient interactions. The system allows doctors, patients, and staff to manage medical reports, appointments, prescriptions, and hospital functionalities efficiently. The platform ensures accessibility from anywhere, making healthcare management more seamless and efficient.

## Features

### **Admin Functionalities:**

- Manages doctors, staff, and hospital operations.
- Assigns roles and permissions to users.
- Monitors hospital resources such as beds, departments, and appointments.

### **Doctor Functionalities:**

- Views and manages patient records, reports, and prescriptions.
- Tracks OP (Outpatient) numbers and schedules for the day.
- Reviews laboratory reports submitted by lab staff.

### **Patient Functionalities:**

- Accesses medical records, prescriptions, and appointment schedules.
- Books, cancels, and modifies appointments.
- Reviews lab reports and doctor recommendations.

### **Staff Functionalities:**

- Performs CRUD operations on medical reports, appointments, beds, and hospital resources.
- Manages patient admissions and discharges.

### **Lab Staff Functionalities:**

- Updates patient health status.
- Uploads and manages lab reports, which doctors and nurses can review remotely.

## Technologies Used

- **Frontend:** AngularJS (for dynamic UI rendering and user interactions)
- **Backend:** Spring Boot (for REST API development and business logic implementation)
- **Database:** MySQL (for structured data storage and management)
- **ORM Framework:** Hibernate (for database interactions)
- **API Testing Tool:** Postman (for testing REST APIs)
- **Authentication & Security:** Spring Security (for user authentication and authorization)
- **Version Control:** Git & GitHub (for collaborative development and version tracking)

## System Flow

1. **User Authentication:** Users (Admin, Doctor, Patient, Staff, Lab Staff) log in with secure credentials.
2. **Role-Based Access Control:** The system grants access based on the user role (Admin, Doctor, etc.).
3. **Appointment Management:** Patients book appointments, and doctors view and manage their schedules.
4. **Medical Records & Reports:** Doctors, staff, and lab personnel update and review patient records.
5. **Hospital Resource Management:** Admin and staff handle hospital beds, departments, and other resources.
6. **Prescription & Lab Reports:** Doctors issue prescriptions, and lab staff upload test results for review.

## Conclusion

The **Hospital Management System** ensures efficient hospital operations, enabling real-time patient monitoring, remote access to medical data, and a streamlined workflow for hospital staff. It enhances doctor-patient interactions and improves hospital administration by integrating key healthcare services into a single platform.

With its user-friendly interface and robust backend, the system significantly reduces manual effort, minimizes errors, and improves the overall efficiency of hospital management.

