import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Doctor } from '../../../shared/model/doctor';
import { User } from '../../../shared/model/user';
import { Receptionist } from '../../../shared/model/Receptionist';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  viewMode: 'doctor' | 'users' | 'receptionist' | null = null;
  
  // Update column definitions to REMOVE 'actions'
  doctorTableColumns = ['doctorId', 'firstName', 'middleName', 'lastName', 'email', 'phone', 'specialization', 'qualifications'];
  staffTableColumns = ['id', 'firstName', 'middleName', 'lastName', 'email', 'phone', 'gender'];
  usersTableColumns = ['userId', 'firstName', 'middleName', 'lastName', 'email', 'phone', 'gender'];


  // Data sources
  doctors: Doctor[] = [];
  users: User[] = [];
  receptionist: Receptionist[] = [];

  constructor(
    private dialog: MatDialog,
    private dataApi: AdminService,
    private snackBar: MatSnackBar
  ) {}

  fetchAndSetView(view: 'doctor' | 'users' | 'receptionist') {
    this.viewMode = view;
    switch(view) {
      case 'doctor': this.getAllDoctors(); break;
      case 'users': this.getAllUsers(); break;
      case 'receptionist': this.getAllStaff(); break;
    }
  }

  // Doctor Methods
  addDoctor() {
    const dialogRef = this.dialog.open(AddDoctorComponent, {
      width: '700px',
      disableClose: true,
      data: { title: 'Register New Doctor' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataApi.addDoctor(result).subscribe({
          next: () => this.showSuccess('Doctor registered successfully!'),
          error: (err) => this.showError('Failed to register doctor', err)
        });
      }
    });
  }

  // Staff Methods
  addStaff() {
    const dialogRef = this.dialog.open(AddStaffComponent, {
      width: '700px',
      disableClose: true,
      data: { title: 'Add New Receptionist' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataApi.addStaff(result).subscribe({
          next: () => this.showSuccess('Staff added successfully!'),
          error: (err) => this.showError('Failed to add staff', err)
        });
      }
    });
  }

  // Data Fetching
  getAllDoctors() {
    this.dataApi.getAllDoctors().subscribe({
      next: (res) => this.doctors = res,
      error: (err) => this.showError('Failed to load doctors', err)
    });
  }

  getAllUsers() {
    this.dataApi.getAllUsers().subscribe({
      next: (res) => this.users = res,
      error: (err) => this.showError('Failed to load users', err)
    });
  }

  getAllStaff() {
    this.dataApi.getAllStaff().subscribe({
      next: (res) => this.receptionist = res,
      error: (err) => this.showError('Failed to load staff', err)
    });
  }

  // Delete Confirmation
  confirmDelete(type: 'doctor' | 'staff', item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { 
        title: 'Confirm Delete',
        message: `Are you sure you want to delete this ${type}?` 
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if(confirmed) {
        const id = item.id || item.doctorId;
        const serviceCall = type === 'doctor' 
          ? this.dataApi.deleteDoctor(id)
          : this.dataApi.deleteStaff(id);

        serviceCall.subscribe({
          next: () => {
            this.showSuccess(`${type} deleted successfully!`);
            this.fetchAndSetView(this.viewMode!);
          },
          error: (err) => this.showError(`Failed to delete ${type}`, err)
        });
      }
    });
  }

  // Helper Methods
  private showSuccess(message: string) {
    this.snackBar.open(message, 'OK', { duration: 2000 });
  }

  private showError(message: string, error: any) {
    console.error(message, error);
    this.snackBar.open(message, 'Retry', { duration: 3000 });
  }
}
