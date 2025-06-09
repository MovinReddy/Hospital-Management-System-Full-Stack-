import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9090/api';

  constructor(private http: HttpClient) { }

  // Auth endpoints
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/registerUser`, user);
  }

  // User data endpoints
  getDoctors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/doctors`);
  }

  getAppointments(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/appointments/${userId}`);
  }

  getPrescriptions(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/getPrescriptions/${userId}`);
  }

  addAppointment(appointment: any, userId: number, doctorId: number): Observable<any> {
    console.log('Sending appointment data:', appointment);
    console.log('URL:', `${this.apiUrl}/users/${userId}/addAppointment/${doctorId}`);
    
    return this.http.post(
      `${this.apiUrl}/users/${userId}/addAppointment/${doctorId}`,
      appointment
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/users/updateUser/${user.userId}`, 
      user
    ).pipe(
      tap(updatedUser => {
        // Update storage with new user data
        const storage = localStorage.getItem('currentUser') ? localStorage : sessionStorage;
        storage.setItem('currentUser', JSON.stringify(updatedUser));
      })
    );
  }
  
}
