import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }

  /* Navigate to Login */
  navigate(): void {
    this.router.navigate(['/login']);
  }

  /* Smooth Scroll to Services */
  scrollToServices(): void {
    const element = document.getElementById('services');

    if (element)
    {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

}
