import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StaffProfileEditDialogComponent } from '../staff-profile-edit-dialog/staff-profile-edit-dialog.component';

@Component({
  selector: 'app-staff-profile-dialog',
  standalone: false,
  templateUrl: './staff-profile-dialog.component.html',
  styleUrls: ['./staff-profile-dialog.component.css']
})
export class StaffProfileDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StaffProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  openEditDialog() {
    this.dialogRef.close();
    this.dialog.open(StaffProfileEditDialogComponent, {
      width: '400px',
      data: { staff: this.data.staff }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
