import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { PrescriptionDialogComponent } from './prescription-dialog/prescription-dialog.component';
import { UserHistoryDialogComponent } from './user-history-dialog/user-history-dialog.component';
import { DoctorDetailsDialogComponent } from './doctor-details-dialog/doctor-details-dialog.component';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Appointment } from '../../../shared/model/appointment';

@Component({
  selector: 'app-doctor',
  standalone: false,
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  currentDoctor: any = null;
  todayAppointments: any[] = [];
  appointmentCount: number = 0;
  isLoading: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const savedDoctor = sessionStorage.getItem('doctor');
    if (savedDoctor) {
      this.currentDoctor = JSON.parse(savedDoctor);
      this.loadAppointments();
      this.getAppointmentCount();
    }
  }

  handleLoginSuccess(doctor: any) {
    this.currentDoctor = doctor.doctor || doctor;
    sessionStorage.setItem('doctor', JSON.stringify(this.currentDoctor));
    this.loadAppointments();
    this.getAppointmentCount();
  }

  loadAppointments() {
    if (!this.currentDoctor) return;
    
    this.isLoading = true;
    this.doctorService.getTodayAppointments(this.currentDoctor.doctorId).subscribe({
      next: (appointments) => {
        if (!appointments || appointments.length === 0) {
          this.todayAppointments = [];
          this.isLoading = false;
          this.cdr.detectChanges();
          return;
        }

        // For each appointment, check if prescription exists
        const observables = appointments.map((appointment: Appointment) => 
          this.doctorService.checkPrescriptionExists(
            this.currentDoctor.doctorId, 
            appointment.appointmentId
          ).pipe(
            switchMap(exists => {
              // If prescription exists but not in our data, fetch it
              if (exists && !appointment.prescription) {
                return this.doctorService.getPrescriptionByAppointment(
                  this.currentDoctor.doctorId,
                  appointment.appointmentId
                ).pipe(
                  switchMap(prescription => {
                    appointment.prescription = prescription;
                    return of(appointment);
                  })
                );
              }
              return of(appointment);
            })
          )
        );

        // Wait for all checks to complete
        forkJoin<Appointment[]>(observables).subscribe({
          next: (updatedAppointments) => {
            this.todayAppointments = updatedAppointments;
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error checking prescriptions:', err);
            this.todayAppointments = appointments; // Fall back to appointments without checking
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
        this.todayAppointments = [];
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getAppointmentCount() {
    if (!this.currentDoctor) return;
    
    this.doctorService.getAppointmentCount(this.currentDoctor.doctorId).subscribe({
      next: (count) => {
        this.appointmentCount = count || 0;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error getting appointment count:', err);
        this.appointmentCount = 0;
      }
    });
  }

  openPrescriptionDialog(appointment: Appointment) {
    (document.activeElement as HTMLElement)?.blur();
    
    // Check if prescription exists first
    this.doctorService.checkPrescriptionExists(
      this.currentDoctor.doctorId, 
      appointment.appointmentId
    ).subscribe({
      next: (exists) => {
        // If exists but not in our data, fetch it first
        if (exists && !appointment.prescription) {
          this.doctorService.getPrescriptionByAppointment(
            this.currentDoctor.doctorId,
            appointment.appointmentId
          ).subscribe({
            next: (prescription) => {
              appointment.prescription = prescription;
              this.openDialog(appointment, true);
            },
            error: () => {
              // If we can't fetch it, assume it doesn't exist
              this.openDialog(appointment, false);
            }
          });
        } else {
          // Open dialog with current data
          this.openDialog(appointment, exists);
        }
      },
      error: () => {
        // On error, open dialog with current data
        this.openDialog(appointment, !!appointment.prescription);
      }
    });
  }

  private openDialog(appointment: any, prescriptionExists: boolean) {
    const dialogRef = this.dialog.open(PrescriptionDialogComponent, {
      width: '600px',
      data: {
        appointment,
        doctorId: this.currentDoctor.doctorId,
        userId: appointment.user?.userId,
        isUpdate: prescriptionExists
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        setTimeout(() => {
          this.loadAppointments();
        }, 500);
      }
    });
  }

  openUserHistoryDialog(user: any, event: Event) {
    event.stopPropagation();
    (document.activeElement as HTMLElement)?.blur();
    
    this.dialog.open(UserHistoryDialogComponent, {
      width: '600px',
      data: {
        doctorId: this.currentDoctor.doctorId,
        userId: user.userId,
        user: user
      }
    });
  }

  openDoctorDetailsDialog() {
    (document.activeElement as HTMLElement)?.blur();
    this.dialog.open(DoctorDetailsDialogComponent, {
      width: '500px',
      data: { doctor: this.currentDoctor }
    });
  }

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'images/profile.png';
  }

  logout() {
    this.currentDoctor = null;
    sessionStorage.removeItem('doctor');
  }
}
