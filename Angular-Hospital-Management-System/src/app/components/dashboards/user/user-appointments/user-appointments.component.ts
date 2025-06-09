import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-appointments',
  standalone: false,
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css']
})
export class UserAppointmentsComponent implements OnInit {
  @Input() userId!: number;
  appointments: any[] = [];
  isLoading = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadAppointments();
  }

  public loadAppointments() {
    if (!this.userId) return;
    this.isLoading = true;
    this.appointments = [];
    this.userService.getAppointments(this.userId).subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        this.isLoading = false;
      },
      error: (err) => {
        this.showError('Failed to load appointments');
        this.isLoading = false;
      }
    });
  }
  private showError(message: string) {
    this.snackBar.open(message, 'Close', { 
      duration: 3000, 
      panelClass: ['error-snackbar'] 
    });
  }
}
