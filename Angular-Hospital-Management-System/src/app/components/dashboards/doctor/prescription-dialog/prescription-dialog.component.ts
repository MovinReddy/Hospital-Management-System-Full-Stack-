import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from '../../../../services/doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, throwError } from 'rxjs';

@Component({
  selector: 'app-prescription-dialog',
  standalone: false,
  templateUrl: './prescription-dialog.component.html',
  styleUrls: ['./prescription-dialog.component.css']
})
export class PrescriptionDialogComponent {
  prescription = {
    symptoms: '',
    notes: '',
    medicines: ''
  };
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<PrescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private doctorService: DoctorService,
    private snackBar: MatSnackBar
  ) {
    // Initialize with existing prescription data if available
    if (data.appointment.prescription) {
      this.prescription = {
        symptoms: data.appointment.prescription.symptoms || '',
        notes: data.appointment.prescription.notes || '',
        medicines: data.appointment.prescription.medicines || ''
      };
    }
  }

  savePrescription() {
    if (!this.prescription.symptoms || !this.prescription.medicines) {
      this.showMessage('Please enter symptoms and medicines');
      return;
    }

    this.isLoading = true;
    const doctorId = this.data.doctorId;
    const userId = this.data.userId;
    const appointmentId = this.data.appointment.appointmentId;

    // Based on isUpdate flag passed from parent or prescription existence
    if (this.data.isUpdate || this.data.appointment.prescription) {
      const prescriptionToUpdate = {
        ...this.prescription,
        prescriptionId: this.data.appointment.prescription?.prescriptionId
      };

      this.doctorService.updatePrescription(doctorId, userId, appointmentId, prescriptionToUpdate)
        .pipe(
          catchError(error => {
            this.isLoading = false;
            if (error.status === 404 && error.error?.message?.includes('not found')) {
              // Prescription not found, switch to create
              this.showMessage('Prescription not found. Creating new one...');
              return this.doctorService.createPrescription(doctorId, userId, appointmentId, this.prescription);
            }
            this.showMessage('Failed to update prescription: ' + this.getErrorMessage(error));
            return EMPTY;
          })
        )
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.showMessage('Prescription updated successfully');
            this.dialogRef.close(true);
          }
        });
    } else {
      this.doctorService.createPrescription(doctorId, userId, appointmentId, this.prescription)
        .pipe(
          catchError(error => {
            this.isLoading = false;
            
            // Check if this is a "prescription already exists" error
            if (error.status === 404 && 
                error.error?.message?.includes('Prescription already exists')) {
              
              this.showMessage('Prescription exists. Switching to update mode...');
              
              // Fetch existing prescription then update
              return this.doctorService.getPrescriptionByAppointment(doctorId, appointmentId)
                .pipe(
                  catchError(err => {
                    this.showMessage('Failed to fetch existing prescription');
                    return EMPTY;
                  }),
                  catchError(error => {
                    this.showMessage('Failed to update existing prescription');
                    return EMPTY;
                  })
                );
            }
            
            this.showMessage('Failed to add prescription: ' + this.getErrorMessage(error));
            return EMPTY;
          })
        )
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.showMessage('Prescription added successfully');
            this.dialogRef.close(true);
          }
        });
    }
  }

  private getErrorMessage(err: any): string {
    if (err.error?.message) {
      return err.error.message;
    }
    if (err.error && typeof err.error === 'string') {
      return err.error;
    }
    return 'An unknown error occurred';
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}
