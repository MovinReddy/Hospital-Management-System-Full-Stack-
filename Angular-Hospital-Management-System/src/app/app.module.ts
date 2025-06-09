import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; // Optional for pagination
import { MatSortModule } from '@angular/material/sort'; // Optional for sorting
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// Forms and HTTP
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// Your Components
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdminComponent } from './components/dashboards/admin/admin.component';
import { StaffComponent } from './components/dashboards/staff/staff.component';
import { DoctorComponent } from './components/dashboards/doctor/doctor.component';
import { UserComponent } from './components/dashboards/user/user.component';
import { SidebarComponent } from './components/dashboards/sidebar/sidebar.component';
import { WebsiteComponent } from './components/dashboards/website/website.component';
import { AddDoctorComponent } from './components/dashboards/admin/add-doctor/add-doctor.component';
import { SearchDialogComponent } from './components/dashboards/admin/search-dialog/search-dialog.component';
import { ReusableTableComponent } from './shared/reusable-table/reusable-table.component';
import { AddStaffComponent } from './components/dashboards/admin/add-staff/add-staff.component';
import { EditDialogComponent } from './shared/edit-dialog/edit-dialog.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { UserAuthComponent } from './components/dashboards/user/user-auth/user-auth.component';
import { BookAppointmentComponent } from './components/dashboards/user/book-appointment/book-appointment.component';
import { UserAppointmentsComponent } from './components/dashboards/user/user-appointments/user-appointments.component';
import { UserPrescriptionsComponent } from './components/dashboards/user/user-prescriptions/user-prescriptions.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateDialogComponent } from './components/dashboards/user/book-appointment/date-dialog.component';
import { DoctorAuthComponent } from './components/dashboards/doctor/doctor-auth/doctor-auth.component';
import { PrescriptionDialogComponent } from './components/dashboards/doctor/prescription-dialog/prescription-dialog.component';
import { DoctorDetailsDialogComponent } from './components/dashboards/doctor/doctor-details-dialog/doctor-details-dialog.component'; 
import { DoctorUpdateDialogComponent } from './components/dashboards/doctor/doctor-update-dialog/doctor-update-dialog.component';
import { UserHistoryDialogComponent } from './components/dashboards/doctor/user-history-dialog/user-history-dialog.component';
import { PrescriptionDetailDialogComponent } from './components/dashboards/doctor/prescription-detail-dialog/prescription-detail-dialog.component';
import { UserProfileDialogComponent } from './components/dashboards/user/user-profile-dialog/user-profile-dialog.component';
import { UserUpdateDialogComponent } from './components/dashboards/user/user-update-dialog/user-update-dialog.component';
import { StaffProfileDialogComponent } from './components/dashboards/staff/staff-profile-dialog/staff-profile-dialog.component';
import { AppointmentActionDialogComponent } from './components/dashboards/staff/appointment-action-dialog/appointment-action-dialog.component';
import { StaffAuthComponent } from './components/dashboards/staff/staff-auth/staff-auth.component';
import { StaffProfileEditDialogComponent } from './components/dashboards/staff/staff-profile-edit-dialog/staff-profile-edit-dialog.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    StaffComponent,
    DoctorComponent,
    UserComponent,
    SidebarComponent,
    WebsiteComponent,
    AddDoctorComponent,
    SearchDialogComponent,
    ReusableTableComponent,
    AddStaffComponent,
    EditDialogComponent,
    ConfirmDialogComponent,
    UserAuthComponent,
    BookAppointmentComponent,
    UserAppointmentsComponent,
    DateDialogComponent,
    UserPrescriptionsComponent,
    DoctorAuthComponent,
    PrescriptionDialogComponent,
    DoctorDetailsDialogComponent,
    DoctorUpdateDialogComponent,
    UserHistoryDialogComponent,
    PrescriptionDetailDialogComponent,
    UserProfileDialogComponent,
    UserUpdateDialogComponent,
    StaffProfileDialogComponent,
    AppointmentActionDialogComponent,
    StaffAuthComponent,
    StaffProfileEditDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Material Modules
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
