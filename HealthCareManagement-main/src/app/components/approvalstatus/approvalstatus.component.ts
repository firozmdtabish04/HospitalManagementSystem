import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-approvalstatus',
  templateUrl: './approvalstatus.component.html',
  styleUrls: ['./approvalstatus.component.css']
})
export class ApprovalstatusComponent implements OnInit {
  currRole = '';
  loggedUser = '';
  mail = '';

  approval: Observable<Doctor[]> | undefined;
  appointment: Observable<Appointment[]> | undefined;

  showDoctorApproval = false;
  showPatientApproval = false;
  showMessageCard = false;
  hasSearchedPatient = false;

  pageVersion = 'v2.1.0 Enterprise';
  lastUpdated: Date = new Date();

  infoMessage = '';
  errorMessage = '';

  constructor(private _service: DoctorService) { }

  ngOnInit(): void {
    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = (sessionStorage.getItem('ROLE') || '').toLowerCase();

    if (this.currRole === 'doctor')
    {
      this.initializeDoctorView();
    } else if (this.currRole === 'user')
    {
      this.initializeUserView();
    } else
    {
      this.infoMessage = 'Role not recognized. Please log in again.';
    }
  }

  initializeDoctorView(): void {
    this.showDoctorApproval = true;
    this.showPatientApproval = false;
    this.showMessageCard = false;
    this.hasSearchedPatient = false;
    this.infoMessage = 'Your profile verification details are shown below.';
    this.errorMessage = '';

    this.approval = this._service.getDoctorListByEmail(this.loggedUser);
  }

  initializeUserView(): void {
    this.showDoctorApproval = false;
    this.showPatientApproval = false;
    this.showMessageCard = true;
    this.hasSearchedPatient = false;
    this.infoMessage = 'Search using the patient email address to view approval details.';
    this.errorMessage = '';
  }

  searchPatient(): void {
    const email = this.mail.trim();

    if (!email)
    {
      this.errorMessage = 'Please enter a valid patient email address.';
      return;
    }

    this.errorMessage = '';
    this.infoMessage = 'Showing approval and admission details for the searched patient.';
    this.appointment = this._service.getPatientListByEmail(email);
    this.hasSearchedPatient = true;
    this.showPatientApproval = true;
    this.lastUpdated = new Date();
  }

  clearSearch(): void {
    this.mail = '';
    this.appointment = undefined;
    this.hasSearchedPatient = false;
    this.showPatientApproval = false;
    this.errorMessage = '';
    this.infoMessage = 'Search has been cleared.';
  }

  refreshDoctorData(): void {
    this.approval = this._service.getDoctorListByEmail(this.loggedUser);
    this.lastUpdated = new Date();
    this.infoMessage = 'Doctor approval data refreshed successfully.';
  }

  getDoctorStatusLabel(status?: string): string {
    const normalized = (status || '').toLowerCase().trim();

    switch (normalized)
    {
      case 'accept':
        return 'Accepted';
      case 'false':
        return 'Pending';
      case 'reject':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }

  getDoctorStatusClass(status?: string): string {
    const normalized = (status || '').toLowerCase().trim();

    switch (normalized)
    {
      case 'accept':
        return 'accepted';
      case 'false':
        return 'pending';
      case 'reject':
        return 'rejected';
      default:
        return 'unknown';
    }
  }

  getAppointmentStatusLabel(status?: string): string {
    return this.getDoctorStatusLabel(status);
  }

  getAdmissionStatusLabel(status?: string): string {
    const normalized = (status || '').toLowerCase().trim();

    switch (normalized)
    {
      case 'accept':
        return 'Admitted';
      case 'false':
        return 'Pending';
      case 'reject':
        return 'Not Admitted';
      default:
        return 'Unknown';
    }
  }

  getTotalAppointments(appointments: Appointment[] | null | undefined): number {
    return appointments?.length || 0;
  }

  getAcceptedAppointments(appointments: Appointment[] | null | undefined): number {
    return appointments?.filter(item => (item.appointmentstatus || '').toLowerCase().trim() === 'accept').length || 0;
  }

  getPendingAppointments(appointments: Appointment[] | null | undefined): number {
    return appointments?.filter(item => (item.appointmentstatus || '').toLowerCase().trim() === 'false').length || 0;
  }

  getRejectedAppointments(appointments: Appointment[] | null | undefined): number {
    return appointments?.filter(item => (item.appointmentstatus || '').toLowerCase().trim() === 'reject').length || 0;
  }

  getAdmittedPatients(appointments: Appointment[] | null | undefined): number {
    return appointments?.filter(item => (item.admissionstatus || '').toLowerCase().trim() === 'accept').length || 0;
  }

  getAcceptedDoctors(doctors: Doctor[] | null | undefined): number {
    return doctors?.filter(d => (d.status || '').toLowerCase().trim() === 'accept').length || 0;
  }

  getPendingDoctors(doctors: Doctor[] | null | undefined): number {
    return doctors?.filter(d => (d.status || '').toLowerCase().trim() === 'false').length || 0;
  }

  getRejectedDoctors(doctors: Doctor[] | null | undefined): number {
    return doctors?.filter(d => (d.status || '').toLowerCase().trim() === 'reject').length || 0;
  }

  getDoctorPrimaryStatus(doctors: Doctor[] | null | undefined): string {
    if (!doctors || doctors.length === 0)
    {
      return 'No Data';
    }
    return this.getDoctorStatusLabel(doctors[0].status);
  }

  getDoctorPrimaryStatusClass(doctors: Doctor[] | null | undefined): string {
    if (!doctors || doctors.length === 0)
    {
      return 'unknown';
    }
    return this.getDoctorStatusClass(doctors[0].status);
  }

  getSearchSummary(): string {
    if (!this.mail.trim())
    {
      return 'No patient selected';
    }
    return this.mail.trim();
  }

  getRoleTitle(): string {
    if (this.currRole === 'doctor')
    {
      return 'Doctor Verification Workspace';
    }
    if (this.currRole === 'user')
    {
      return 'Patient Approval Workspace';
    }
    return 'Approval Workspace';
  }

  trackByDoctor(index: number, doctor: Doctor): string {
    return doctor.email || index.toString();
  }

  trackByPatient(index: number, patient: Appointment): string {
    return patient.patientid?.toString() || index.toString();
  }
}