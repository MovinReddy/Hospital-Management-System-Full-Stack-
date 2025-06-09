import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service'; 
import { UserProfileDialogComponent } from './user-profile-dialog/user-profile-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserAppointmentsComponent } from './user-appointments/user-appointments.component';
import { UserPrescriptionsComponent } from './user-prescriptions/user-prescriptions.component';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  currentUser: any;
  selectedTab: 'doctors' | 'appointments' | 'prescriptions' | '' = '';

  @ViewChild('userAppointments') userAppointments?: UserAppointmentsComponent;
  @ViewChild('userPrescriptions') userPrescriptions?: UserPrescriptionsComponent;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (savedUser) this.currentUser = JSON.parse(savedUser);
  }

  handleLoginSuccess(user: any) {
    this.currentUser = user.user || user;
    localStorage.setItem('user', JSON.stringify(this.currentUser));
    sessionStorage.setItem('user', JSON.stringify(this.currentUser));
    this.selectedTab = 'doctors';
  }

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'images/profile.png';
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    this.selectedTab = '';
  }

  selectTab(tab: 'doctors' | 'appointments' | 'prescriptions') {
    this.selectedTab = tab;
    setTimeout(() => {
      if (tab === 'appointments' && this.userAppointments) {
        this.userAppointments.loadAppointments();
      }
      if (tab === 'prescriptions' && this.userPrescriptions) {
        this.userPrescriptions.loadPrescriptions();
      }
    });
  }

  openUserProfileDialog() {
    const dialogRef = this.dialog.open(UserProfileDialogComponent, {
      width: '400px',
      data: { user: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.currentUser = { ...this.currentUser, ...result };
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        sessionStorage.setItem('user', JSON.stringify(this.currentUser));
      }
    });
  }
}
