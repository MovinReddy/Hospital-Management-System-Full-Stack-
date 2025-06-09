import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { StaffService } from '../../../services/staff.service';
import { StaffProfileDialogComponent } from './staff-profile-dialog/staff-profile-dialog.component';
import { AppointmentActionDialogComponent } from './appointment-action-dialog/appointment-action-dialog.component';

@Component({
  selector: 'app-staff',
  standalone: false,
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  currentStaff: any = null;
  appointments: any[] = [];
  searchDate: Date = new Date();
  doctorIdSearch: string = '';
  isLoading = false;

  constructor(
    private staffService: StaffService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    // Listen for navigation events to detect when returning to this component
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      // If we're on the staff route, reload data
      if ((event as NavigationEnd).url.includes('/staff')) {
        const savedStaff = sessionStorage.getItem('staff');
        if (savedStaff) {
          this.currentStaff = JSON.parse(savedStaff);
          this.loadAppointments();
        }
      }
    });
  }

  ngOnInit() {
    const savedStaff = sessionStorage.getItem('staff');
    if (savedStaff) {
      this.currentStaff = JSON.parse(savedStaff);
      this.loadAppointments();
    }
  }

  handleLoginSuccess(response: any) {
    this.currentStaff = response.staff || response;
    sessionStorage.setItem('staff', JSON.stringify(this.currentStaff));
    this.loadAppointments();
  }

  openProfileDialog() {
    const dialogRef = this.dialog.open(StaffProfileDialogComponent, {
      width: '400px',
      data: { staff: this.currentStaff }
    });

    dialogRef.afterClosed().subscribe(updatedStaff => {
      if (updatedStaff) {
        this.currentStaff = updatedStaff;
        sessionStorage.setItem('staff', JSON.stringify(updatedStaff));
      }
    });
  }

  logout() {
    sessionStorage.removeItem('staff');
    this.currentStaff = null;
    this.appointments = [];
    this.router.navigate(['/dashboards/staff']); // Navigate to home/login
  }
  

  loadAppointments() {
    this.isLoading = true;
    this.staffService.getTodayAppointments().subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
        this.showError('Failed to load appointments');
        this.isLoading = false;
      }
    });
  }

  searchAppointments() {
    this.isLoading = true;
    const dateStr = this.searchDate ? this.formatDate(this.searchDate) : '';
    const doctorId = this.doctorIdSearch ? parseInt(this.doctorIdSearch, 10) : undefined;

    if (dateStr && doctorId) {
      this.staffService.getAppointmentsByDateAndDoctor(dateStr, doctorId).subscribe({
        next: (appointments) => { this.appointments = appointments; this.isLoading = false; },
        error: (err) => { 
          console.error('Search failed:', err);
          this.showError('Search failed'); 
          this.isLoading = false; 
        }
      });
    } else if (dateStr) {
      this.staffService.getAppointmentsByDate(dateStr).subscribe({
        next: (appointments) => { this.appointments = appointments; this.isLoading = false; },
        error: (err) => { 
          console.error('Search failed:', err);
          this.showError('Search failed'); 
          this.isLoading = false; 
        }
      });
    } else if (doctorId) {
      this.staffService.getDoctorAppointments(doctorId).subscribe({
        next: (appointments) => { this.appointments = appointments; this.isLoading = false; },
        error: (err) => { 
          console.error('Search failed:', err);
          this.showError('Search failed'); 
          this.isLoading = false; 
        }
      });
    } else {
      this.loadAppointments();
    }
  }

  resetSearch() {
    this.searchDate = new Date();
    this.doctorIdSearch = '';
    this.loadAppointments();
  }

  openAppointmentActions(appointment: any) {
    const dialogRef = this.dialog.open(AppointmentActionDialogComponent, {
      width: '500px',
      data: { appointment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.action === 'postpone') {
          this.staffService.postponeAppointment(
            appointment.appointmentId, 
            result.date,
            result.time
          ).subscribe({
            next: () => this.searchAppointments(),
            error: (err) => {
              console.error('Failed to postpone appointment:', err);
              this.showError('Failed to postpone appointment');
            }
          });
        } else {
          // Make sure status is one of the valid enum values: APPROVED, CANCELLED, etc.
          const status = result.action.toUpperCase();
          console.log(`Updating appointment ${appointment.appointmentId} to status: ${status}`);
          
          this.staffService.updateAppointmentStatus(
            appointment.appointmentId, 
            status
          ).subscribe({
            next: () => this.searchAppointments(),
            error: (err) => {
              console.error('Failed to update status:', err);
              this.showError(`Failed to update status to ${status}`);
            }
          });
        }
      }
    });
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
  }
}
