import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrationsuccess',
  templateUrl: './registrationsuccess.component.html',
  styleUrls: ['./registrationsuccess.component.css']
})
export class RegistrationsuccessComponent implements OnInit, OnDestroy {
  redirectSeconds: number = 5;
  private countdownInterval: any;
  private redirectTimeout: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startRedirectTimer();
  }

  startRedirectTimer(): void {
    this.countdownInterval = setInterval(() => {
      if (this.redirectSeconds > 0)
      {
        this.redirectSeconds--;
      }
    }, 1000);

    this.redirectTimeout = setTimeout(() => {
      this.goToLogin();
    }, 3000);
  }

  goToLogin(): void {
    this.clearTimers();
    this.router.navigate(['/login']);
  }

  goToHome(): void {
    this.clearTimers();
    this.router.navigate(['/']);
  }

  clearTimers(): void {
    if (this.countdownInterval)
    {
      clearInterval(this.countdownInterval);
    }

    if (this.redirectTimeout)
    {
      clearTimeout(this.redirectTimeout);
    }
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }
}