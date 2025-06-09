import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DoctorData {
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  gender?: string;
  specialization?: string;
  experienceYears?: number;
  qualifications?: string;
  photoURL?: string;
}

@Component({
  selector: 'app-add-doctor',
  standalone: false,
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
})
export class AddDoctorComponent implements OnInit {
  form!: FormGroup;
  title: string;
  specializations: string[] = [
    'Cardiology',
    'Orthopedics',
    'Dermatology',
    'Neurology',
    'Pediatrics',
    'Gynecology',
    'General Medicine'
  ];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: DoctorData,
    public dialogRef: MatDialogRef<AddDoctorComponent>
  ) {
    this.title = this.data?.title || 'Add Doctor';
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [this.data?.firstName || '', Validators.required],
      middleName: [this.data?.middleName || ''],
      lastName: [this.data?.lastName || '', Validators.required],
      email: [this.data?.email || '', Validators.required],
      password: ['', Validators.required],
      phone: [this.data?.phone || '', Validators.required],
      gender: [this.data?.gender || '', Validators.required],
      specialization: [this.data?.specialization || '', Validators.required],
      experienceYears: [
        this.data?.experienceYears != null ? this.data.experienceYears : null,
        [Validators.required, Validators.min(0)]
      ],
      qualifications: [this.data?.qualifications || '', Validators.required],
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
