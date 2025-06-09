import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prescription-detail-dialog',
  standalone: false,
  templateUrl: './prescription-detail-dialog.component.html',
  styleUrls: ['./prescription-detail-dialog.component.css']
})
export class PrescriptionDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PrescriptionDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }
}
