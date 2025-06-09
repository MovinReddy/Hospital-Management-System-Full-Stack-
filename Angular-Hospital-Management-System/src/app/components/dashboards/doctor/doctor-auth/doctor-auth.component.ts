import { Component, EventEmitter, Output } from '@angular/core';
import { DoctorService } from '../../../../services/doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctor-auth',
  standalone: false,
  templateUrl: './doctor-auth.component.html',
  styleUrls: ['./doctor-auth.component.css']
})
export class DoctorAuthComponent {
  @Output() loginSuccess = new EventEmitter<any>();
  
  email: string = '';
  password: string = '';
  isLoading = false;

  constructor(
    private doctorService: DoctorService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.showMessage('Please enter email and password');
      return;
    }

    this.isLoading = true;
    this.doctorService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        const doctor = response.doctor || response;
        console.log('Doctor logged in:', doctor);
        
        // Store doctor info
        sessionStorage.setItem('doctor', JSON.stringify(doctor));
        this.loginSuccess.emit(doctor);
      },
      error: (err) => {
        this.isLoading = false;
        this.showMessage('Login failed: ' + (err.error || 'Invalid credentials'));
        console.error('Login error:', err);
      }
    });
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}
