import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-approvedoctors',
  templateUrl: './approvedoctors.component.html',
  styleUrls: ['./approvedoctors.component.css']
})
export class ApprovedoctorsComponent implements OnInit {

  doctors!: Observable<Doctor[]>;
  searchText: string = '';

  currRole: string = '';
  loggedUser: string = '';

  loading: boolean = true;
  error: string = '';

  constructor(private _service: DoctorService) { }

  ngOnInit(): void {
    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = sessionStorage.getItem('ROLE') || '';
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loading = true;
    this.error = '';

    this.doctors = this._service.getDoctorList();

    this.doctors.subscribe({
      next: () => this.loading = false,
      error: () => {
        this.error = 'Failed to load doctors';
        this.loading = false;
      }
    });
  }

  acceptRequest(email: string): void {
    if (!email) return;

    this._service.acceptRequestForDoctorApproval(email).subscribe({
      next: () => {
        alert('Doctor Approved Successfully');
        this.loadDoctors();
      },
      error: () => alert('Approval Failed')
    });
  }

  rejectRequest(email: string): void {
    if (!email) return;

    this._service.rejectRequestForDoctorApproval(email).subscribe({
      next: () => {
        alert('Doctor Rejected Successfully');
        this.loadDoctors();
      },
      error: () => alert('Rejection Failed')
    });
  }

  filterDoctor(doctor: Doctor): boolean {
    if (!doctor) return false;
    if (!this.searchText) return true;

    const search = this.searchText.toLowerCase();

    return (
      doctor.doctorname?.toLowerCase().includes(search) ||
      doctor.email?.toLowerCase().includes(search) ||
      doctor.specialization?.toLowerCase().includes(search)
    );
  }

  getStatusLabel(status?: string): string {
    switch (status)
    {
      case 'accept':
        return 'Approved';
      case 'reject':
        return 'Rejected';
      case 'false':
      default:
        return 'Pending';
    }
  }

  getStatusClass(status?: string): string {
    switch (status)
    {
      case 'accept':
        return 'accepted';
      case 'reject':
        return 'rejected';
      case 'false':
      default:
        return 'pending';
    }
  }

  getDoctorImage(doctor: Doctor): string {
    return doctor.gender && doctor.gender.toLowerCase().trim() === 'female'
      ? 'assets/img/femaledoctor.png'
      : 'assets/img/maledoctor.png';
  }

  trackByDoctor(index: number, doctor: Doctor): string {
    return doctor.email || index.toString();
  }
}