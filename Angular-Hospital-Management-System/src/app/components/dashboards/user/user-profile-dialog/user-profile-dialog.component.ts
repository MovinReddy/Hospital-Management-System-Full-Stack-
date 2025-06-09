import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserUpdateDialogComponent } from '../user-update-dialog/user-update-dialog.component';

@Component({
  selector: 'app-user-profile-dialog',
  standalone: false,
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.css']
})
export class UserProfileDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UserProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  close() {
    this.dialogRef.close();
  }

  openUpdateDialog() {
    this.close();
    this.dialog.open(UserUpdateDialogComponent, {
      width: '500px',
      data: { user: this.data.user }
    });
  }
}