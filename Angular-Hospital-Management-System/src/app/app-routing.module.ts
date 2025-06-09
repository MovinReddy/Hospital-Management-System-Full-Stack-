import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UserComponent } from './components/dashboards/user/user.component';
import { DoctorComponent } from './components/dashboards/doctor/doctor.component';
import { AdminComponent } from './components/dashboards/admin/admin.component';
import { StaffComponent } from './components/dashboards/staff/staff.component';
import { WebsiteComponent } from './components/dashboards/website/website.component';
import { UserAuthComponent } from './components/dashboards/user/user-auth/user-auth.component';
import { BookAppointmentComponent } from './components/dashboards/user/book-appointment/book-appointment.component';
import { UserAppointmentsComponent } from './components/dashboards/user/user-appointments/user-appointments.component';
import { UserPrescriptionsComponent } from './components/dashboards/user/user-prescriptions/user-prescriptions.component';

// app-routing.module.ts
const routes: Routes = [
  {
    path: 'dashboards', children: [
      { path: '', redirectTo: 'website', pathMatch: 'full' },
      { path: 'website', component: WebsiteComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'doctor', component: DoctorComponent },
      { path: 'staff', component: StaffComponent },

      {
        path: 'user',
        component: UserComponent,
        /*children: [
          { path: '', redirectTo: 'auth', pathMatch: 'full' },
          { path: 'auth', component: UserAuthComponent },  // Login/Register,  
          { path: 'dashboard', component: UserComponent}, // User after login
          { path: 'book-appointment', component: BookAppointmentComponent },
          { path: 'appointments', component: UserAppointmentsComponent },
          { path: 'prescriptions', component: UserPrescriptionsComponent }
        ]*/
      },
      
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  { path: '**', redirectTo: 'dashboards/website' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
