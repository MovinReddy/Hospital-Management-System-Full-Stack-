import { Component, EventEmitter, Output } from '@angular/core';
import { StaffService } from '../../../../services/staff.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-staff-auth',
  standalone: false,
  templateUrl: './staff-auth.component.html',
  styleUrls: ['./staff-auth.component.css']
})
export class StaffAuthComponent {
  @Output() loginSuccess = new EventEmitter<any>();
  isLoading = false;
  formData = { email: '', password: '' };

  constructor(
    private staffService: StaffService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.staffService.login(this.formData.email, this.formData.password).subscribe({
      next: (response) => {
        this.loginSuccess.emit(response);
        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open('Invalid credentials', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}
