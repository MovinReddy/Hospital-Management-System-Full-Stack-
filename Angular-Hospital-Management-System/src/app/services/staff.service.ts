import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = 'http://localhost:9090/api';

  constructor(private http: HttpClient) { }

  // Staff Login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/staff/login`, { email, password });
  }

  // Appointments
  getTodayAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/staff/appointmentsToday`);
  }

  // Add this method - Get appointments by date and doctor
  getAppointmentsByDateAndDoctor(date: string, doctorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/staff/appointments-by-date-and-doctor/${date}/${doctorId}`);
  }

  // Add this method - Get appointments by date
  getAppointmentsByDate(date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/staff/appointments-by-date/${date}`);
  }

  // Add this method - Get appointments by doctor
  getDoctorAppointments(doctorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/staff/doctors/${doctorId}/getAppointments`);
  }

  searchAppointments(date: string, doctorId?: number): Observable<any[]> {
    const params: any = { date };
    if(doctorId) params.doctorId = doctorId;
    return this.http.get<any[]>(`${this.apiUrl}/staff/appointments-by-date/${date}`, { params });
  }

  // Check your StaffService implementation - it should be:
  updateAppointmentStatus(appointmentId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/staff/update-appointment-status/${appointmentId}/${status}`, {});
  }

  postponeAppointment(appointmentId: number, newDate: string, newTime: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/staff/postpone-appointment/${appointmentId}`, { 
      dateOfAppointment: newDate,
      appointmentTime: newTime
    });
  }

  // Profile
  updateStaffProfile(staff: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/staff/updatereceptionist/${staff.id}`, staff);
  }
}
