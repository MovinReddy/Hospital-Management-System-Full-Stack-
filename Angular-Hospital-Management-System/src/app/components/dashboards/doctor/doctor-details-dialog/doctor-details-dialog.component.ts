import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DoctorUpdateDialogComponent } from '../doctor-update-dialog/doctor-update-dialog.component';

@Component({
  selector: 'app-doctor-details-dialog',
  standalone: false,
  templateUrl: './doctor-details-dialog.component.html',
  styleUrls: ['./doctor-details-dialog.component.css']
})
export class DoctorDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DoctorDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  close() {
    this.dialogRef.close();
  }

  openUpdateDialog() {
    this.close();
    this.dialog.open(DoctorUpdateDialogComponent, {
      width: '500px',
      data: { doctor: this.data.doctor }
    });
  }
}
