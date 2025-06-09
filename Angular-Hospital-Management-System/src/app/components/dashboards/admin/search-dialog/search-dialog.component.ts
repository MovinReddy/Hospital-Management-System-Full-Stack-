import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../../services/admin.service'; 
import { Doctor } from '../../../../shared/model/doctor'; 
import { Receptionist } from '../../../../shared/model/Receptionist'; 

@Component({
  selector: 'app-search-dialog',
  standalone: false,
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent {
  dialogOpen = true; // Set to true when dialog is open and false when it closes.
  searchBy: string = 'name'; // Default search type
  searchValue: string | number = ''; // Allow both string and number
  results: Doctor[] | Receptionist[] = [];
  specializations: string[] = ['Neurology', 'Cardiology', 'Orthopedics']; // example specializations

  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: 'doctor' | 'staff' | 'user' },
    private adminService: AdminService
  ) {}

  // Get search options based on type
  getSearchOptions() {
    if (this.data.type === 'doctor') {
      return [
        { value: 'name', label: 'Name' },
        { value: 'id', label: 'ID' },
        { value: 'email', label: 'Email' },
        { value: 'specialization', label: 'Specialization' }
      ];
    } else if (this.data.type === 'staff') {
      return [
        { value: 'name', label: 'Name' },
        { value: 'id', label: 'ID' }
      ];
    }
    return [];
  }

  // Search action
  search() {
    // Convert searchValue to integer when searching by ID
    if (this.searchBy === 'id') {
      this.searchValue = parseInt(this.searchValue as string, 10); // cast as string first
    }

    if (this.data.type === 'doctor') {
      this.adminService.searchDoctor(this.searchBy, this.searchValue).subscribe((res) => {
        this.results = res;
      });
    } else if (this.data.type === 'staff') {
      this.adminService.searchStaff(this.searchBy, this.searchValue).subscribe((res) => {
        this.results = res;
      });
    }
  }
}
