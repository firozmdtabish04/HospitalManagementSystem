import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Prescription } from 'src/app/models/prescription';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-prescriptionlist',
  templateUrl: './prescriptionlist.component.html',
  styleUrls: ['./prescriptionlist.component.css']
})
export class PrescriptionlistComponent implements OnInit {
  prescriptionlist: Observable<Prescription[]> | undefined;
  name: string = '';

  showSearchCard = true;
  showPrescriptionPages = false;
  hasSearched = false;

  constructor(private _service: UserService) { }

  ngOnInit(): void {
    this.showSearchCard = true;
    this.showPrescriptionPages = false;
  }

  searchPrescription(): void {
    const patientName = this.name?.trim();

    if (!patientName)
    {
      return;
    }

    this.prescriptionlist = this._service.getPrescriptionsByName(patientName);
    this.showSearchCard = false;
    this.showPrescriptionPages = true;
    this.hasSearched = true;
  }

  clearSearch(): void {
    this.name = '';
    this.prescriptionlist = undefined;
    this.showSearchCard = true;
    this.showPrescriptionPages = false;
    this.hasSearched = false;
  }

  onPrint(): void {
    window.print();
  }

  getPatientImage(gender: string | undefined): string {
    const normalizedGender = (gender || '').toLowerCase().trim();

    if (normalizedGender === 'female')
    {
      return 'assets/img/femaleuser.png';
    }

    return 'assets/img/maleuser.png';
  }

  getAdmissionStatusLabel(status: string | undefined): string {
    switch (status)
    {
      case 'accept':
        return 'Admitted';
      case 'false':
        return 'Admission Pending';
      case 'reject':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }

  getAdmissionStatusClass(status: string | undefined): string {
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

  trackByPrescription(index: number, item: Prescription): string {
    return item.patientid?.toString() || index.toString();
  }
}