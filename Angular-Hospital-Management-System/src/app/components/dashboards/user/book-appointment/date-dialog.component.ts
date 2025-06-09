import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-dialog',
  standalone: false,
  template: `
    <h2 mat-dialog-title>Select Appointment Date & Time</h2>
    <div mat-dialog-content>
      <mat-form-field appearance="fill" class="date-field">
        <mat-label>Date</mat-label>
        <input matInput [matDatepicker]="picker" [min]="data.minDate" 
               (dateChange)="onDateSelect($event)">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      
      <mat-form-field appearance="fill" class="time-field">
        <mat-label>Time</mat-label>
        <input matInput type="time" [(ngModel)]="selectedTime">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="cancel()">Cancel</button>
      <button mat-raised-button color="primary" 
              [disabled]="!selectedDate || !selectedTime" 
              (click)="confirm()">
        Confirm
      </button>
    </div>
  `,
  styles: [`
    .date-field, .time-field {
      width: 100%;
      margin-bottom: 15px;
    }
  `]
})
export class DateDialogComponent {
  selectedDate?: Date;
  selectedTime = "09:00";

  constructor(
    public dialogRef: MatDialogRef<DateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { minDate: Date }
  ) {}

  onDateSelect(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value || undefined;
  }

  confirm() {
    if (!this.selectedDate || !this.selectedTime) return;
    
    const [hours, minutes] = this.selectedTime.split(':');
    const dateWithTime = new Date(this.selectedDate);
    dateWithTime.setHours(parseInt(hours), parseInt(minutes));
    
    this.dialogRef.close(dateWithTime);
  }

  cancel() {
    this.dialogRef.close();
  }
}
