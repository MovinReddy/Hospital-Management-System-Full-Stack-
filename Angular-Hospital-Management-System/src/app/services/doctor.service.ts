import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:9090/api';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/doctor/login`, { email, password });
  }

  getTodayAppointments(doctorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors/appointmentsToday/${doctorId}`);
  }

  getAllAppointments(doctorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors/${doctorId}/getAppointments`);
  }

  getAppointmentCount(doctorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors/countApprovedAppointmentsToday/${doctorId}`);
  }

  // Check if prescription exists for an appointment
  checkPrescriptionExists(doctorId: number, appointmentId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/doctors/${doctorId}/appointments/${appointmentId}/exists`)
      .pipe(
        map(response => !!response), // Convert any response to boolean
        catchError(err => {
          console.error('Error checking prescription existence:', err);
          return of(false); // Default to false on error
        })
      );
  }

  // Get existing prescription
  getPrescriptionByAppointment(doctorId: number, appointmentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors/${doctorId}/appointments/${appointmentId}/prescription`)
      .pipe(
        catchError(err => {
          console.error('Error fetching prescription:', err);
          return throwError(() => err);
        })
      );
  }

  // Create new prescription
  createPrescription(doctorId: number, userId: number, appointmentId: number, prescription: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/doctors/${doctorId}/prescription/${userId}/${appointmentId}`, 
      prescription
    ).pipe(
      catchError(err => {
        console.error('Error creating prescription:', err);
        return throwError(() => err);
      })
    );
  }

  // Update existing prescription
  updatePrescription(doctorId: number, userId: number, appointmentId: number, prescription: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/doctors/${doctorId}/updateprescription/${userId}/${appointmentId}`, 
      prescription
    ).pipe(
      catchError(err => {
        console.error('Error updating prescription:', err);
        return throwError(() => err);
      })
    );
  }

  getPrescriptions(doctorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors/${doctorId}/prescriptions`);
  }

  updateDoctor(doctor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/doctors/updateDoctor/${doctor.doctorId}`, doctor);
  }

  getAppointmentsForUser(doctorId: number, userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors/${doctorId}/users/${userId}/appointments`);
  }

  getPatientHistory(doctorId: number, userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors/${doctorId}/patients/${userId}/history`);
  }
}
