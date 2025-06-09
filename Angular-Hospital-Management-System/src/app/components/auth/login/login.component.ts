import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  roles = ['USER', 'ADMIN', 'DOCTOR', 'STAFF'];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required] // Role field for login
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password, role } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe(
        (res: any) => {
          alert('Login successful!');
          this.authService.saveUserToLocalStorage(res);
          const role = res.role.toLowerCase(); // user/admin/doctor/staff

          // Redirect to respective dashboard based on role
          this.router.navigate([`/dashboards/${role}`]);  // Example: /admin-dashboard
        },
        err => {
          console.error(err);
          alert('Login failed. Check your credentials.');
        }
      );
    }
  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getUserRole();
      this.router.navigate([`/dashboards/${role}`]);
    }
  }
  
}
