import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {
  doctors!: Observable<Doctor[]>;
  searchText: string = '';

  isDeleting: boolean = false;

  showConfirmModal: boolean = false;
  showResultModal: boolean = false;

  selectedDoctorEmail: string = '';

  popupTitle: string = '';
  popupMessage: string = '';
  popupType: 'success' | 'error' = 'success';

  constructor(private _service: DoctorService) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctors = this._service.getDoctorList();
  }

  isAdmin(): boolean {
    return sessionStorage.getItem('ROLE') === 'admin';
  }

  openDeleteConfirm(email: string): void {
    if (!this.isAdmin())
    {
      this.showPopup('error', 'Access Denied', 'Only admin can delete doctor.');
      return;
    }

    this.selectedDoctorEmail = email;
    this.showConfirmModal = true;
  }

  closeDeleteConfirm(): void {
    this.showConfirmModal = false;
    this.selectedDoctorEmail = '';
  }

  confirmDeleteDoctor(): void {
    if (!this.selectedDoctorEmail)
    {
      this.showPopup('error', 'Invalid', 'Sorry, doctor email is missing.');
      return;
    }

    this.isDeleting = true;

    this._service.deleteDoctor(this.selectedDoctorEmail).subscribe({
      next: (res: any) => {
        this.isDeleting = false;
        this.showConfirmModal = false;
        this.selectedDoctorEmail = '';
        this.loadDoctors();
        this.showPopup('success', 'Delete Success', typeof res === 'string' ? res : 'Doctor deleted successfully.');
      },
      error: (err) => {
        this.isDeleting = false;
        this.showConfirmModal = false;

        let message = 'Invalid, sorry. Doctor delete failed.';
        if (err?.error && typeof err.error === 'string')
        {
          message = err.error;
        }

        this.showPopup('error', 'Delete Failed', message);
      }
    });
  }

  showPopup(type: 'success' | 'error', title: string, message: string): void {
    this.popupType = type;
    this.popupTitle = title;
    this.popupMessage = message;
    this.showResultModal = true;
  }

  closeResultModal(): void {
    this.showResultModal = false;
  }

  filterDoctor(doctor: Doctor): boolean {
    if (!this.searchText.trim()) return true;

    const search = this.searchText.toLowerCase();

    return (
      doctor.doctorname?.toLowerCase().includes(search) ||
      doctor.email?.toLowerCase().includes(search) ||
      doctor.specialization?.toLowerCase().includes(search) ||
      doctor.gender?.toLowerCase().includes(search)
    );
  }

  getDoctorStatus(status?: string): string {
    switch (status)
    {
      case 'accept':
        return 'Approved Doctor';
      case 'false':
        return 'Approval Pending';
      case 'reject':
        return 'Not Approved';
      default:
        return 'Unknown';
    }
  }

  getStatusClass(status?: string): string {
    switch (status)
    {
      case 'accept':
        return 'approved';
      case 'false':
        return 'pending';
      case 'reject':
        return 'rejected';
      default:
        return '';
    }
  }
}