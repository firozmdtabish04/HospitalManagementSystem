import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddingdoctorComponent } from './components/addingdoctor/addingdoctor.component';
import { AddprescriptionComponent } from './components/addprescription/addprescription.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ApprovalstatusComponent } from './components/approvalstatus/approvalstatus.component';
import { ApprovedoctorsComponent } from './components/approvedoctors/approvedoctors.component';
import { BookappointmentComponent } from './components/bookappointment/bookappointment.component';
import { CheckslotsComponent } from './components/checkslots/checkslots.component';
import { DoctordashboardComponent } from './components/doctordashboard/doctordashboard.component';
import { DoctorlistComponent } from './components/doctorlist/doctorlist.component';
import { DoctorprofileComponent } from './components/doctorprofile/doctorprofile.component';
import { LoginComponent } from './components/login/login.component';
import { PatientlistComponent } from './components/patientlist/patientlist.component';
import { PrescriptionlistComponent } from './components/prescriptionlist/prescriptionlist.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationsuccessComponent } from './components/registrationsuccess/registrationsuccess.component';
import { ScheduleslotsComponent } from './components/scheduleslots/scheduleslots.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { PaymentComponent } from './components/payment/payment.component';

import { AdminGuard } from './guards/admin.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { RouterGuard } from './guards/router.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', component: WelcomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'registrationsuccess', component: RegistrationsuccessComponent },

  { path: 'userdashboard', component: UserdashboardComponent, canActivate: [RouterGuard] },
  { path: 'admindashboard', component: AdmindashboardComponent, canActivate: [RouterGuard] },
  { path: 'doctordashboard', component: DoctordashboardComponent, canActivate: [RouterGuard] },

  { path: 'addDoctor', component: AddingdoctorComponent, canActivate: [AdminGuard] },
  { path: 'approvedoctors', component: ApprovedoctorsComponent, canActivate: [AdminGuard] },

  { path: 'doctorlist', component: DoctorlistComponent, canActivate: [RouterGuard] },
  { path: 'userlist', component: UserlistComponent, canActivate: [RouterGuard] },
  { path: 'patientlist', component: PatientlistComponent, canActivate: [RouterGuard] },
  { path: 'approvalstatus', component: ApprovalstatusComponent, canActivate: [RouterGuard] },

  { path: 'appointments', component: AppointmentsComponent, canActivate: [DoctorGuard] },
  { path: 'scheduleslots', component: ScheduleslotsComponent, canActivate: [DoctorGuard] },
  { path: 'addprescription', component: AddprescriptionComponent, canActivate: [DoctorGuard] },
  { path: 'editdoctorprofile', component: DoctorprofileComponent, canActivate: [DoctorGuard] },

  { path: 'bookappointment', component: BookappointmentComponent, canActivate: [UserGuard] },
  { path: 'checkslots', component: CheckslotsComponent },
  { path: 'prescriptionlist', component: PrescriptionlistComponent, canActivate: [UserGuard] },
  { path: 'edituserprofile', component: UserprofileComponent, canActivate: [UserGuard] },

  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'payment', component: PaymentComponent, canActivate: [UserGuard] },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }