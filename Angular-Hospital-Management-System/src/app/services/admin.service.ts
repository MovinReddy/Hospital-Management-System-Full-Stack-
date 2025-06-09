import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../shared/model/doctor';
import { Receptionist } from '../shared/model/Receptionist';
import { User } from '../shared/model/user';
import { Appointment } from '../shared/model/appointment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:9090/api/admin';

  constructor(private http: HttpClient) { }

  // ====================== DOCTOR ======================

  addDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.apiUrl}/addDoctor`, doctor);
  }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/doctors`);
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/doctors/${id}`);
  }

  updateDoctor(id: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/doctors/${id}`, doctor);
  }

  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/doctors/${id}`);
  }

  // === Search Doctor ===

   // ====================== DOCTOR ======================
   searchDoctor(searchBy: string, searchValue: string | number): Observable<Doctor[]> {
    if (searchBy === 'name') {
      return this.http.get<Doctor[]>(`${this.apiUrl}/searchDoctorByName/${searchValue}`);
    } else if (searchBy === 'id') {
      return this.http.get<Doctor[]>(`${this.apiUrl}/searchDoctorById/${searchValue}`);
    } else if (searchBy === 'email') {
      return this.http.get<Doctor[]>(`${this.apiUrl}/searchDoctorByEmail/${searchValue}`);
    } else if (searchBy === 'specialization') {
      return this.http.get<Doctor[]>(`${this.apiUrl}/searchDoctorBySpecialization/${searchValue}`);
    } else {
      return this.http.get<Doctor[]>(`${this.apiUrl}/doctors`);
    }
  }

  // ====================== USERS ======================

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // === Search User ===

  searchUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/searchUserById/${id}`);
  }

  searchUserByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/searchUserByName/${name}`);
  }

  searchUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/searchUserByEmail/${email}`);
  }

  // ====================== APPOINTMENTS ======================

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments`);
  }

  getAppointmentsByUserId(userId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/user/${userId}`);
  }

  getAppointmentsByDoctorId(doctorId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/doctor/${doctorId}`);
  }

  getTodayAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/todayAppointments`);
  }

  // ====================== STAFF ======================

  getAllStaff(): Observable<Receptionist[]> {
    return this.http.get<Receptionist[]>(`${this.apiUrl}/staff`);
  }

  addStaff(staff: Receptionist): Observable<Receptionist> {
    return this.http.post<Receptionist>(`${this.apiUrl}/addStaff`, staff);
  }

  deleteStaff(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteStaff/${id}`);
  }

  updateStaff(id: number, staff: Receptionist): Observable<Receptionist> {
    return this.http.put<Receptionist>(`${this.apiUrl}/updateStaff/${id}`, staff);
  }

  // === Search Staff ===

  searchStaff(searchBy: string, searchValue: string | number): Observable<Receptionist[]> {
    if (searchBy === 'name') {
      return this.http.get<Receptionist[]>(`${this.apiUrl}/searchStaffByName/${searchValue}`);
    } else if (searchBy === 'id') {
      return this.http.get<Receptionist[]>(`${this.apiUrl}/searchStaffById/${searchValue}`);
    } else {
      return this.http.get<Receptionist[]>(`${this.apiUrl}/staff`);
    }
  }

}
