import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  name = '';
  gender = '';
  loggedUser = '';
  currRole = '';

  patients!: Observable<any[]>;
  users!: Observable<any[]>;
  doctors!: Observable<any[]>;
  slots!: Observable<any[]>;

  isCollapsed = false;

  constructor(private _service: UserService) { }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit(): void {

    this.name = sessionStorage.getItem('loggedUser') || '';
    this.gender = sessionStorage.getItem('gender') || '';
    this.currRole = sessionStorage.getItem('ROLE') || '';

    this.patients = this._service.getTotalPatients();
    this.users = this._service.getTotalUsers();
    this.doctors = this._service.getTotalDoctors();
    this.slots = this._service.getTotalSlots();
  }

}