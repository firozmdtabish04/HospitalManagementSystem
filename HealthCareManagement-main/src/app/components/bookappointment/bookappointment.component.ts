import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Appointment } from 'src/app/models/appointment';
import { Slots } from 'src/app/models/slots';
import { DoctorService } from 'src/app/services/doctor.service';
import { UserService } from 'src/app/services/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})
export class BookappointmentComponent implements OnInit {
  currRole = '';
  loggedUser = '';
  message = '';

  appointment = new Appointment();

  slots: Observable<Slots[]> | undefined;
  doctors: Observable<Slots[]> | undefined;
  specializations: Observable<Slots[]> | undefined;

  minDate = '';
  isSubmitting = false;
  isBookingFailed = true;

  constructor(
    private _service: DoctorService,
    private _router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser') || '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE') || '{}');
    this.currRole = this.currRole.replace(/"/g, '');

    this.doctors = this._service.getSlotListWithUniqueDoctors();
    this.specializations = this._service.getSlotListWithUniqueSpecializations();
    this.slots = this._service.getSlotList();

    this.minDate = this.getTodayDate();

    $('#messagecard').hide();
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  resetForm(form: NgForm): void {
    form.resetForm({
      patientname: '',
      email: '',
      doctorname: '',
      specialization: '',
      date: '',
      slot: 'AM slot',
      age: '',
      gender: 'Male',
      problem: ''
    });
  }

  showFormAgain(): void {
    $('#messagecard').hide();
    $('#appointmentform').show();
    $('#appointmentcontent').show();
  }

  bookAppointment() {
    this.isSubmitting = true;

    this.userService.addBookingAppointments(this.appointment).subscribe(
      data => {
        console.log('appointment booked Successfully');
        this.isSubmitting = false;
        this._router.navigate(['/userdashboard']);
      },
      error => {
        console.log('process Failed');
        this.isSubmitting = false;
        this.isBookingFailed = true;
        $('#appointmentform').hide();
        $('#appointmentcontent').hide();
        $('#messagecard').show();
        this.message =
          'There is a problem in booking your appointment. Please check slot availability and try again.';
        console.log(error.error);
      }
    );
  }
}