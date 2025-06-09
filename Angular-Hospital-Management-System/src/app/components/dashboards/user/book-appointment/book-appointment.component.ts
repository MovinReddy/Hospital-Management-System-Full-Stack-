import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'; 
import { Doctor } from '../../../../shared/model/doctor'; 
import { MatDialog } from '@angular/material/dialog';
import { DateDialogComponent } from './date-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-appointment',
  standalone: false,
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  @Input() userId!: number;
  doctors: Doctor[] = [];
  isLoading = false;
  defaultDoctorImage = 'images/default-doctor.png';

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadDoctors();
  }

  private loadDoctors() {
    this.isLoading = true;
    this.userService.getDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.isLoading = false;
        console.log('Doctors loaded:', doctors);
      },
      error: (err) => {
        this.showError('Failed to load doctors');
        this.isLoading = false;
        console.error('Error loading doctors:', err);
      }
    });
  }

  selectDoctor(doctor: Doctor) {
    console.log('Selected doctor:', doctor);
    const dialogRef = this.dialog.open(DateDialogComponent, {
      width: '400px',
      data: { minDate: new Date() }
    });

    dialogRef.afterClosed().subscribe(date => {
      if (date) {
        this.bookAppointment(doctor, date);
      }
    });
  }
  private bookAppointment(doctor: Doctor, date: Date) {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }
  
    // Format date as YYYY-MM-DD (local time)
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
  
    // Format time as HH:MM:SS (local time)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:00`;
  
    // Only send the required fields that the backend expects
    const appointmentData = {
      dateOfAppointment: formattedDate,
      appointmentTime: formattedTime
    };
  
    console.log('Booking appointment:', {
      userId: this.userId,
      doctorId: doctor.doctorId,
      appointmentData
    });
  
    this.isLoading = true;
    this.userService.addAppointment(
      appointmentData,
      this.userId,
      doctor.doctorId
    ).subscribe({
      next: (response) => {
        this.showSuccess('Appointment booked successfully!');
        this.isLoading = false;
        console.log('Appointment created:', response);
      },
      error: (err) => {
        let errorMessage = 'Failed to book appointment';
        if (err.error && err.error.message) {
          errorMessage += ': ' + err.error.message;
        }
        this.showError(errorMessage);
        this.isLoading = false;
        console.error('Error creating appointment:', err);
      }
    });
  }
  

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultDoctorImage;
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', { 
      duration: 3000, 
      panelClass: ['error-snackbar'] 
    });
  }
}
