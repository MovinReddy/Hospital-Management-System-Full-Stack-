import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-prescriptions',
  standalone: false,
  templateUrl: './user-prescriptions.component.html',
  styleUrls: ['./user-prescriptions.component.css']
})

export class UserPrescriptionsComponent implements OnInit {
  @Input() userId!: number;
  prescriptions: any[] = [];
  isLoading = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadPrescriptions();
  }
  
  public loadPrescriptions() {
    if (!this.userId) return;
    this.isLoading = true;
    this.prescriptions = [];
    this.userService.getPrescriptions(this.userId).subscribe({
      next: (prescs) => {
        this.prescriptions = prescs;
        this.isLoading = false;
      },
      error: (err) => {
        this.showError('Failed to load prescriptions');
        this.isLoading = false;
      }
    });
  }


  private showError(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
  }
}