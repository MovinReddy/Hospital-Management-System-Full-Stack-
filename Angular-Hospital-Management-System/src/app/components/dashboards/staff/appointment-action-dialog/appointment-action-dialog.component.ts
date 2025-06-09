import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-appointment-action-dialog',
  standalone: false,
  templateUrl: './appointment-action-dialog.component.html',
  styleUrl: './appointment-action-dialog.component.css'
})
export class AppointmentActionDialogComponent {
  actionForm: FormGroup;
  showDatePicker = false;

  constructor(
    public dialogRef: MatDialogRef<AppointmentActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.actionForm = this.fb.group({
      date: new FormControl(new Date()),
      time: new FormControl('09:00')
    });
  }

  // Add getters for type safety
  get dateControl(): FormControl {
    return this.actionForm.get('date') as FormControl;
  }

  get timeControl(): FormControl {
    return this.actionForm.get('time') as FormControl;
  }

  performAction(action: string) {
    if(action === 'postpone') {
      this.showDatePicker = true;
    } else {
      this.dialogRef.close({ action });
    }
  }

  submitPostpone() {
    const rawDate = this.dateControl.value;
    const formattedDate = rawDate.toISOString().split('T')[0];
    
    this.dialogRef.close({
      action: 'postpone',
      date: formattedDate,
      time: this.timeControl.value
    });
  }
}