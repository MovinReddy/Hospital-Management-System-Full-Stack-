import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../../../services/doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctor-update-dialog',
  standalone: false,
  templateUrl: './doctor-update-dialog.component.html',
  styleUrls: ['./doctor-update-dialog.component.css']
})
export class DoctorUpdateDialogComponent {
  doctorForm: FormGroup;
  isLoading = false; // <-- ADD THIS

  constructor(
    public dialogRef: MatDialogRef<DoctorUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private snackBar: MatSnackBar
  ) {
    this.doctorForm = this.fb.group({
      firstName: [data.doctor.firstName, Validators.required],
      middleName: [data.doctor.middleName],
      lastName: [data.doctor.lastName, Validators.required],
      email: [data.doctor.email, [Validators.required, Validators.email]],
      phone: [data.doctor.phone, Validators.required],
      specialization: [data.doctor.specialization, Validators.required],
      experienceYears: [data.doctor.experienceYears, [Validators.required, Validators.min(0)]],
      qualifications: [data.doctor.qualifications, Validators.required],
      photoURL: [data.doctor.photoURL]
    });
  }

  onSave() {
    if (this.doctorForm.valid) {
      this.isLoading = true;
      const updatedDoctor = { ...this.data.doctor, ...this.doctorForm.value };
      this.doctorService.updateDoctor(updatedDoctor).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open('Details updated!', 'Close', { duration: 2000 });
          this.dialogRef.close(true);
        },
        error: () => {
          this.isLoading = false;
          this.snackBar.open('Update failed!', 'Close', { duration: 2000 });
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
