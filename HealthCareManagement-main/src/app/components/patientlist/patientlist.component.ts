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

    this.doctorService.acceptRequestForPatientApproval(slot)
      .subscribe(() => {

        // refresh patient list after accept
        this.refreshPatients();

      });
  }


  rejectRequest(slot: string): void {

    this.doctorService.rejectRequestForPatientApproval(slot)
      .subscribe(() => {

        // refresh patient list after reject
        this.refreshPatients();

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

}
