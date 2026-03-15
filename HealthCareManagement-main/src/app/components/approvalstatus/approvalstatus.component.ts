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

  constructor(private _service: DoctorService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser') || '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE') || '{}');
    this.currRole = this.currRole.replace(/"/g, '');

    this.approval = this._service.getDoctorListByEmail(this.loggedUser);

    if (this.currRole.toLowerCase() === 'doctor')
    {
      this.showDoctorApproval = true;
      this.showPatientApproval = false;
      this.showMessageCard = false;
    } else if (this.currRole.toLowerCase() === 'user')
    {
      this.showMessageCard = true;
      this.showPatientApproval = false;
      this.showDoctorApproval = false;
    }
  }

  searchPatient(): void {
    if (!this.mail || !this.mail.trim())
    {
      return;
    }

    this.appointment = this._service.getPatientListByEmail(this.mail.trim());
    this.hasSearchedPatient = true;
    this.showPatientApproval = true;
  }

  clearSearch(): void {
    this.mail = '';
    this.appointment = undefined;
    this.hasSearchedPatient = false;
    this.showPatientApproval = false;
  }

  getDoctorStatusLabel(status?: string): string {
    switch (status)
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
    switch (status)
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
    switch (status)
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

  getAdmissionStatusLabel(status?: string): string {
    switch (status)
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
    return appointments?.filter(item => item.appointmentstatus === 'accept').length || 0;
  }

  getPendingAppointments(appointments: Appointment[] | null | undefined): number {
    return appointments?.filter(item => item.appointmentstatus === 'false').length || 0;
  }

  getRejectedAppointments(appointments: Appointment[] | null | undefined): number {
    return appointments?.filter(item => item.appointmentstatus === 'reject').length || 0;
  }

  getAdmittedPatients(appointments: Appointment[] | null | undefined): number {
    return appointments?.filter(item => item.admissionstatus === 'accept').length || 0;
  }

  getAcceptedDoctors(doctors: Doctor[] | null | undefined): number {
    return doctors?.filter(d => d.status === 'accept').length || 0;
  }

  getPendingDoctors(doctors: Doctor[] | null | undefined): number {
    return doctors?.filter(d => d.status === 'false').length || 0;
  }

  getRejectedDoctors(doctors: Doctor[] | null | undefined): number {
    return doctors?.filter(d => d.status === 'reject').length || 0;
  }

  trackByDoctor(index: number, doctor: Doctor): string {
    return doctor.email || index.toString();
  }

  trackByPatient(index: number, patient: Appointment): string {
    return patient.patientid?.toString() || index.toString();
  }
}