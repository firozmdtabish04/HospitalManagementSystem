import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Slots } from 'src/app/models/slots';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {
  currRole: string = '';
  loggedUser: string = '';

  patients$!: Observable<Appointment[]>;
  slots$!: Observable<Slots[]>;

  searchText: string = '';
  statusFilter: string = 'all';
  admissionFilter: string = 'all';
  selectedDate: string = '';
  sortDirection: 'asc' | 'desc' = 'desc';

  actionLoadingSlot: string | null = null;

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = sessionStorage.getItem('ROLE') || '';

    if (this.currRole.toLowerCase() === 'user')
    {
      this.patients$ = this.doctorService.getPatientListByDoctorEmail(this.loggedUser);
    } else
    {
      this.patients$ = this.doctorService.getPatientList();
    }

    this.slots$ = this.doctorService.getSlotDetails(this.loggedUser);
  }

  acceptRequest(slot: string): void {
    if (!slot) return;

    this.actionLoadingSlot = slot;

    this.doctorService.acceptRequestForPatientApproval(slot).subscribe({
      next: () => {
        this.refreshPatients();
        this.actionLoadingSlot = null;
      },
      error: () => {
        this.actionLoadingSlot = null;
      }
    });
  }

  rejectRequest(slot: string): void {
    if (!slot) return;

    this.actionLoadingSlot = slot;

    this.doctorService.rejectRequestForPatientApproval(slot).subscribe({
      next: () => {
        this.refreshPatients();
        this.actionLoadingSlot = null;
      },
      error: () => {
        this.actionLoadingSlot = null;
      }
    });
  }

  refreshPatients(): void {
    if (this.currRole.toLowerCase() === 'user')
    {
      this.patients$ = this.doctorService.getPatientListByDoctorEmail(this.loggedUser);
    } else
    {
      this.patients$ = this.doctorService.getPatientList();
    }
  }

  clearFilters(): void {
    this.searchText = '';
    this.statusFilter = 'all';
    this.admissionFilter = 'all';
    this.selectedDate = '';
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  getPatientImage(gender?: string): string {
    return gender?.toLowerCase() === 'female'
      ? 'assets/img/femaleuser.png'
      : 'assets/img/maleuser.png';
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

  getStatusClass(status?: string): string {
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

  matchesSearch(patient: Appointment): boolean {
    const term = this.searchText.toLowerCase().trim();
    if (!term) return true;

    return (
      String(patient.patientid || '').toLowerCase().includes(term) ||
      String(patient.patientname || '').toLowerCase().includes(term) ||
      String(patient.problem || '').toLowerCase().includes(term) ||
      String(patient.slot || '').toLowerCase().includes(term) ||
      String(patient.date || '').toLowerCase().includes(term) ||
      String(patient.age || '').toLowerCase().includes(term)
    );
  }

  matchesAppointmentStatus(patient: Appointment): boolean {
    if (this.statusFilter === 'all') return true;
    return patient.appointmentstatus === this.statusFilter;
  }

  matchesAdmissionStatus(patient: Appointment): boolean {
    if (this.admissionFilter === 'all') return true;
    return patient.admissionstatus === this.admissionFilter;
  }

  matchesDate(patient: Appointment): boolean {
    if (!this.selectedDate) return true;
    return patient.date === this.selectedDate;
  }

  getFilteredPatients(patients: Appointment[] | null | undefined): Appointment[] {
    if (!patients) return [];

    const filtered = patients.filter(patient =>
      this.matchesSearch(patient) &&
      this.matchesAppointmentStatus(patient) &&
      this.matchesAdmissionStatus(patient) &&
      this.matchesDate(patient)
    );

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date || '').getTime();
      const dateB = new Date(b.date || '').getTime();

      if (this.sortDirection === 'asc')
      {
        return dateA - dateB;
      }
      return dateB - dateA;
    });
  }

  getTotalPatients(patients: Appointment[] | null | undefined): number {
    return this.getFilteredPatients(patients).length;
  }

  getAcceptedPatients(patients: Appointment[] | null | undefined): number {
    return this.getFilteredPatients(patients)
      .filter(patient => patient.appointmentstatus === 'accept').length;
  }

  getPendingPatients(patients: Appointment[] | null | undefined): number {
    return this.getFilteredPatients(patients)
      .filter(patient => patient.appointmentstatus === 'false').length;
  }

  getRejectedPatients(patients: Appointment[] | null | undefined): number {
    return this.getFilteredPatients(patients)
      .filter(patient => patient.appointmentstatus === 'reject').length;
  }

  getAdmittedPatients(patients: Appointment[] | null | undefined): number {
    return this.getFilteredPatients(patients)
      .filter(patient => patient.admissionstatus === 'accept').length;
  }

  getSlotDisplay(patient: Appointment, slots: Slots[] | null | undefined): string {
    if (!slots || !patient) return '-';

    for (const slot of slots)
    {
      if (patient.slot === 'AM slot' && slot.amstatus === 'booked' && patient.date === slot.date)
      {
        return slot.amslot || 'AM slot';
      }

      if (patient.slot === 'Noon slot' && slot.noonstatus === 'booked' && patient.date === slot.date)
      {
        return slot.noonslot || 'Noon slot';
      }

      if (patient.slot === 'PM slot' && slot.pmstatus === 'booked' && patient.date === slot.date)
      {
        return slot.pmslot || 'PM slot';
      }
    }

    return patient.slot || '-';
  }

  canDoctorTakeAction(patient: Appointment): boolean {
    return this.currRole.toLowerCase() === 'doctor' && patient.appointmentstatus === 'false';
  }

  isActionLoading(slot: string): boolean {
    return this.actionLoadingSlot === slot;
  }

  trackByPatient(index: number, patient: Appointment): string {
    return patient.patientid?.toString() || index.toString();
  }
}