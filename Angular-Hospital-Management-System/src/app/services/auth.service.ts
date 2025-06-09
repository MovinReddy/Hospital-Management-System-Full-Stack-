import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:9090/api';

  constructor(private http: HttpClient) {}

  // Register only USER or ADMIN (Doctor/Staff registration done by admin)
  register(userData: any): Observable<any> {
    const endpoint = `${this.BASE_URL}/users/addUser`;
    return this.http.post(endpoint, userData);
  }

  // Login for all roles: USER, ADMIN, DOCTOR, STAFF
  login(credentials: { email: string, password: string }): Observable<any> {
    const endpoint = `${this.BASE_URL}/auth/login`;
    return this.http.post(endpoint, credentials);
  }

  // Save user data after login
  saveUserToLocalStorage(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('userEmail', user.email);
  }

  // Get current user
  getLoggedInUser(): any {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  // Check login status
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // Get user role
  getUserRole(): string | null {
    const user = this.getLoggedInUser();
    return user ? user.role.toLowerCase() : null;
  }

  // Logout
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
  }
}
