import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      role: ['user', Validators.required], // default role is 'user'
      specialization: [''],
      qualifications: [''],
      experience: [''],
      staffFirstName: [''],
      staffMiddleName: [''],
      staffLastName: [''],
      staffEmail: [''],
      staffPhone: [''],
      joiningDate: [''],
      photoURL: ['']
    });
  }

  isDoctor(): boolean {
    return this.registerForm.get('role')?.value === 'DOCTOR';
  }

  isStaff(): boolean {
    return this.registerForm.get('role')?.value === 'STAFF';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      this.authService.register(userData).subscribe(
        res => {
          alert('Registration successful!');

          // Auto-login after registration
          this.authService.login({
            email: userData.email,
            password: userData.password
          }).subscribe(
            loginRes => {
              alert('Logged in successfully!');
              this.router.navigate(['/home']); // Redirect to the home/dashboard
            },
            loginErr => {
              alert('Auto login failed! Please try logging in manually.');
              this.router.navigate(['/login']);
            }
          );
        },
        err => {
          console.error('Registration Error:', err);
          alert('Registration failed! Please check your input or try again.');
        }
      );
    }
  }
}
