import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  name = 'admin';
  gender = '';
  loggedUser = '';
  currRole = '';

  menuOpen = true; // sidebar toggle

  patients!: Observable<any[]>;
  users!: Observable<any[]>;
  doctors!: Observable<any[]>;
  slots!: Observable<any[]>;
  appointments!: Observable<any[]>;
  prescriptions!: Observable<any[]>;

  constructor(private _route: Router, private _service: UserService) {}

  ngOnInit(): void {

    this.name = JSON.stringify(sessionStorage.getItem('ROLE') || '{}');
    this.name = this.name.replace(/"/g, '');

    this.gender = JSON.stringify(sessionStorage.getItem('gender') || '{}');
    this.gender = this.gender.replace(/"/g, '');

    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser') || '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE') || '{}');
    this.currRole = this.currRole.replace(/"/g, '');

    // dashboard counts
    this.patients = this._service.getTotalPatients();
    this.users = this._service.getTotalUsers();
    this.doctors = this._service.getTotalDoctors();
    this.slots = this._service.getTotalSlots();
    this.appointments = this._service.getTotalAppointments();
    this.prescriptions = this._service.getTotalPrescriptions();
  }

  // hamburger toggle
  toggleMenu(){
    this.menuOpen = !this.menuOpen;
  }

}