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

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.loggedUser =
      sessionStorage.getItem('loggedUser') || '';

    this.currRole =
      sessionStorage.getItem('ROLE') || '';

    if (this.loggedUser === 'admin@gmail.com')
    {

      this.title = 'Admin Dashboard';

    }
    else if (this.currRole === 'doctor')
    {

      this.title = 'Doctor Dashboard';

    }
    else if (this.currRole === 'user')
    {

      this.title = 'User Dashboard';

    }

  }

  logout(): void {

    sessionStorage.clear();

    this.router.navigate(['/login']);

  }

  navigateHome(): void {

    if (this.loggedUser === 'admin@gmail.com')
    {

      this.router.navigate(['/admindashboard']);

    }
    else if (this.currRole === 'doctor')
    {

      this.router.navigate(['/doctordashboard']);

    }
    else if (this.currRole === 'user')
    {

      this.router.navigate(['/userdashboard']);

    }
    else
    {

      this.router.navigate(['/']);

    }

  }

}
