import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Slots } from 'src/app/models/slots';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-checkslots',
  templateUrl: './checkslots.component.html',
  styleUrls: ['./checkslots.component.css']
})
export class CheckslotsComponent implements OnInit {

  currRole: string = '';
  loggedUser: string = '';

  slots!: Observable<Slots[]>;

  // ⭐ Search variables
  doctorSearch: string = '';
  specializationSearch: string = '';

  constructor(private _service: DoctorService) { }

  ngOnInit(): void {

    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = sessionStorage.getItem('ROLE') || '';

    this.slots = this._service.getSlotList();

  }

  // ⭐ Filter function
  filterSlot(doctor: Slots): boolean {

    const doctorName = this.doctorSearch.toLowerCase();
    const specialization = this.specializationSearch.toLowerCase();

    const nameMatch =
      !doctorName ||
      doctor.doctorname?.toLowerCase().includes(doctorName);

    const specializationMatch =
      !specialization ||
      doctor.specialization?.toLowerCase().includes(specialization);

    return nameMatch && specializationMatch;

  }

}