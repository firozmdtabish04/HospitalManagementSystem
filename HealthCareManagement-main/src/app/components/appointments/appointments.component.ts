import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Slots } from 'src/app/models/slots';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  loggedUser: string = '';
  currRole: string = '';

  appointments!: Observable<Appointment[]>;
  slots!: Observable<Slots[]>;

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {

    this.loggedUser =
      sessionStorage.getItem('loggedUser') || '';

    this.currRole =
      sessionStorage.getItem('ROLE') || '';

    this.loadAppointments();

  }

  loadAppointments(): void {

    this.appointments =
      this.doctorService
        .getPatientListByDoctorEmailAndDate(this.loggedUser);

    this.slots =
      this.doctorService
        .getSlotDetails(this.loggedUser);

  }

}
