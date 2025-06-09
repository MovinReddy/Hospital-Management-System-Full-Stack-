import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../../shared/model/user';

@Component({
  selector: 'app-user-update-dialog',
  standalone: false,
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.css']
})
export class UserUpdateDialogComponent {
  userForm: FormGroup;
  isLoading = false;
  maxDate = new Date();

  constructor(
    public dialogRef: MatDialogRef<UserUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      firstName: [data.user.firstName, Validators.required],
      middleName: [data.user.middleName],
      lastName: [data.user.lastName, Validators.required],
      email: [data.user.email, [Validators.required, Validators.email]],
      phone: [data.user.phone, Validators.required],
      gender: [data.user.gender],
      dateOfBirth: [data.user.dateOfBirth ? new Date(data.user.dateOfBirth) : null],
      photoURL: [data.user.photoURL]
    });
  }

  onSave() {
    if (this.userForm.valid) {
      this.isLoading = true;
      const formValue = this.userForm.value;
      
      const updatedUser: User = {
        ...this.data.user,
        ...formValue,
        dateOfBirth: formValue.dateOfBirth ? 
          formValue.dateOfBirth.toISOString().split('T')[0] : 
          this.data.user.dateOfBirth
      };

      this.userService.updateUser(updatedUser).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close(response);
        },
        error: (err) => {
          this.isLoading = false;
          this.snackBar.open('Update failed: ' + (err.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
