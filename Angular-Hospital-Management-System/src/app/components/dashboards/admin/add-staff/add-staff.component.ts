import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Receptionist {
    title?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    gender?: 'MALE' | 'FEMALE' | 'OTHER'; // Based on your Gender Enum
    photoURL?: string;
}

@Component({
  selector: 'app-add-staff',
  standalone: false,
  templateUrl: './add-staff.component.html',
  styleUrl: './add-staff.component.css'
})
export class AddStaffComponent implements OnInit{
  form!: FormGroup;
  title: string;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: Receptionist,
    public dialogRef: MatDialogRef<AddStaffComponent>
  ) {
    this.title = this.data?.title || 'Add Receptionist';
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [this.data?.firstName || '', Validators.required],
      middleName: [this.data?.middleName || ''],
      lastName: [this.data?.lastName || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: [this.data?.phone || '', Validators.required],
      gender: [this.data?.gender || '', Validators.required],
      photoURL: [this.data?.photoURL || '']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

