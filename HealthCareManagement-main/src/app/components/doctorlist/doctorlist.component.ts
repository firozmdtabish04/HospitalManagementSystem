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

  constructor(private _service: DoctorService) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctors = this._service.getDoctorList();
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
      case 'accept': return 'Approved Doctor';
      case 'false': return 'Approval Pending';
      case 'reject': return 'Not Approved';
      default: return 'Unknown';
    }

  }

  getStatusClass(status?: string): string {

    switch (status)
    {
      case 'accept': return 'approved';
      case 'false': return 'pending';
      case 'reject': return 'rejected';
      default: return '';
    }

  }
  

}