import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedUser = '';
  currRole = '';
  title = 'Hospital Management System';
  homeRoute = '/';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = (sessionStorage.getItem('ROLE') || '').toLowerCase();

    if (this.loggedUser.toLowerCase() === 'admin@gmail.com')
    {
      this.title = 'Admin Dashboard';
      this.homeRoute = '/admindashboard';
    } else if (this.currRole === 'doctor')
    {
      this.title = 'Doctor Dashboard';
      this.homeRoute = '/doctordashboard';
    } else if (this.currRole === 'user')
    {
      this.title = 'User Dashboard';
      this.homeRoute = '/userdashboard';
    } else
    {
      this.title = 'Hospital Management System';
      this.homeRoute = '/';
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}