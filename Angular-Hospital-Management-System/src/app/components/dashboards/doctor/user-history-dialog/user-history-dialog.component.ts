import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DoctorService } from '../../../../services/doctor.service';
import { PrescriptionDetailDialogComponent } from '../prescription-detail-dialog/prescription-detail-dialog.component';

@Component({
  selector: 'app-user-history-dialog',
  standalone: false,
  templateUrl: './user-history-dialog.component.html',
  styleUrls: ['./user-history-dialog.component.css']
})
export class UserHistoryDialogComponent implements OnInit {
  appointments: any[] = [];
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<UserHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private doctorService: DoctorService,
    private dialog: MatDialog
  ) {
    console.log('Dialog data:', this.data); // Debug data received
  }

  ngOnInit() {
    this.loadUserAppointments();
  }

  loadUserAppointments() {
    if (!this.data.doctorId || !this.data.userId) {
      console.error('Missing doctorId or userId');
      return;
    }

    this.isLoading = true;
    this.doctorService.getPatientHistory(this.data.doctorId, this.data.userId).subscribe({
      next: (appointments) => {
        this.appointments = appointments || [];
        this.isLoading = false;
        console.log('User appointments:', this.appointments);
      },
      error: (err) => {
        console.error('Error loading user appointments:', err);
        this.isLoading = false;
        this.appointments = [];
      }
    });
  }

  openPrescriptionDetail(appointment: any) {
    (document.activeElement as HTMLElement)?.blur();
    this.dialog.open(PrescriptionDetailDialogComponent, {
      width: '500px',
      data: { appointment }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
