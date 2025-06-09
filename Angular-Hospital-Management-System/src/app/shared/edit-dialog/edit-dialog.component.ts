import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  standalone: false,
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css'
})
export class EditDialogComponent implements OnInit{ 
  editForm: FormGroup;
  fields: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { role: string; item: any; fields: string[] }
  ) {
    this.fields = data.fields;
    this.editForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.fields.forEach(field => {
      const value = this.data.item[field] || '';
      const control = this.fb.control(value, field === 'email' ? [Validators.required, Validators.email] : Validators.required);
      this.editForm.addControl(field, control);
    });
  }

  save() {
    if (this.editForm.valid) {
      const updatedData = { ...this.data.item, ...this.editForm.value };
      this.dialogRef.close(updatedData);
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
