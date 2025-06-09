import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../../services/user.service'; 

@Component({
  selector: 'app-user-auth',
  standalone: false,
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  @Output() loginSuccess = new EventEmitter<any>();

  isLoginMode = true;
  userData: any = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    middleName: '',
    gender: '',
    photoURL: '',
    dateOfBirth: ''
  };
  rememberMe = false;

  constructor(private userService: UserService) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.resetForm();
  }

  private resetForm() {
    this.userData = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      middleName: '',
      gender: '',
      photoURL: '',
      dateOfBirth: ''
    };
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.handleLogin();
    } else {
      this.handleRegistration();
    }
  }

  private handleLogin() {
    this.userService.login(this.userData.email, this.userData.password).subscribe({
      next: (user) => {
        this.handleAuthSuccess(user);
      },
      error: (err) => this.handleError('Login Failed!', err)
    });
  }

  private handleRegistration() {
    this.userService.register(this.userData).subscribe({
      next: (user) => {
        this.handleAuthSuccess(user);
      },
      error: (err) => this.handleError('Registration Failed!', err)
    });
  }

  private handleAuthSuccess(user: any) {
    if (this.rememberMe) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    sessionStorage.setItem('user', JSON.stringify(user));

    // Add detailed console logging
  console.log('User successfully logged in:', user);
  console.log('Authentication type:', this.isLoginMode ? 'Login' : 'Registration');
  console.log('Remember Me enabled:', this.rememberMe);
  console.log('Session storage:', sessionStorage.getItem('user'));
  console.log('Local storage:', localStorage.getItem('user'));
    this.loginSuccess.emit(user);
  }

  private handleError(message: string, error: any) {
    console.error(message, error);
    alert(`${message} ${error.error?.error || ''}`);
  }
}
