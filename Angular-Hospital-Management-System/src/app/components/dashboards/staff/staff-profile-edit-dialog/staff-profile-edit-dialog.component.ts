import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffService } from '../../../../services/staff.service';

@Component({
  selector: 'app-staff-profile-edit-dialog',
  standalone: false,
  templateUrl: './staff-profile-edit-dialog.component.html',
  styleUrls: ['./staff-profile-edit-dialog.component.css']
})
export class StaffProfileEditDialogComponent {
  profileForm: FormGroup;
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<StaffProfileEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private staffService: StaffService
  ) {
    this.profileForm = this.fb.group({
      firstName: [data.staff.firstName, Validators.required],
      middleName: [data.staff.middleName],
      lastName: [data.staff.lastName, Validators.required],
      email: [data.staff.email, [Validators.required, Validators.email]],
      phone: [data.staff.phone, Validators.required],
      photoURL: [data.staff.photoURL]
    });
  }

  save() {
    if (this.profileForm.invalid) return;
    this.isLoading = true;
    const updatedStaff = { ...this.data.staff, ...this.profileForm.value };
    console.log(updatedStaff);
    this.staffService.updateStaffProfile(updatedStaff).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.dialogRef.close(result);
      },
      error: () => {
        this.isLoading = false;
        alert('Update failed');
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
