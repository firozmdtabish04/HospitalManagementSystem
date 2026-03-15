import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { User } from 'src/app/models/user';
import { DoctorService } from 'src/app/services/doctor.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user = new User();
  doctor = new Doctor();
  msg: string = '';

  activeTab: 'user' | 'doctor' = 'user';

  userConfirmPassword: string = '';
  doctorConfirmPassword: string = '';

  showUserPassword: boolean = false;
  showUserConfirmPassword: boolean = false;
  showDoctorPassword: boolean = false;
  showDoctorConfirmPassword: boolean = false;

  userAcceptedTerms: boolean = false;
  doctorAcceptedTerms: boolean = false;

  isUserSubmitting: boolean = false;
  isDoctorSubmitting: boolean = false;

  constructor(
    private _registrationService: RegistrationService,
    private _doctorService: DoctorService,
    private _router: Router
  ) { }

  ngOnInit(): void { }

  setTab(tab: 'user' | 'doctor'): void {
    this.activeTab = tab;
    this.msg = '';
  }

  toggleUserPassword(): void {
    this.showUserPassword = !this.showUserPassword;
  }

  toggleUserConfirmPassword(): void {
    this.showUserConfirmPassword = !this.showUserConfirmPassword;
  }

  toggleDoctorPassword(): void {
    this.showDoctorPassword = !this.showDoctorPassword;
  }

  toggleDoctorConfirmPassword(): void {
    this.showDoctorConfirmPassword = !this.showDoctorConfirmPassword;
  }

  isUserPasswordMismatch(): boolean {
    return !!this.userConfirmPassword && this.user.password !== this.userConfirmPassword;
  }

  isDoctorPasswordMismatch(): boolean {
    return !!this.doctorConfirmPassword && this.doctor.password !== this.doctorConfirmPassword;
  }

  registerUser(): void {
    this.msg = '';

    if (this.isUserPasswordMismatch())
    {
      this.msg = 'User password and confirm password do not match.';
      return;
    }

    if (!this.userAcceptedTerms)
    {
      this.msg = 'Please accept Terms & Conditions.';
      return;
    }

    this.isUserSubmitting = true;

    this._registrationService.registerUserFromRemote(this.user).subscribe(
      (data: any) => {
        console.log('User Registration Success');
        sessionStorage.setItem('username', this.user.username);
        sessionStorage.setItem('gender', this.user.gender);
        this.isUserSubmitting = false;
        this._router.navigate(['/registrationsuccess']);
      },
      (error: any) => {
        console.log('User Registration Failed');
        console.log(error.error);
        this.isUserSubmitting = false;
        this.msg = 'User with ' + this.user.email + ' already exists !!!';
      }
    );
  }

  registerDoctor(): void {
    this.msg = '';

    if (this.isDoctorPasswordMismatch())
    {
      this.msg = 'Doctor password and confirm password do not match.';
      return;
    }

    if (!this.doctorAcceptedTerms)
    {
      this.msg = 'Please accept Terms & Conditions.';
      return;
    }

    this.isDoctorSubmitting = true;

    this._registrationService.registerDoctorFromRemote(this.doctor).subscribe(
      (data: any) => {
        console.log('Doctor Registration Success');
        sessionStorage.setItem('doctorname', this.doctor.doctorname);
        sessionStorage.setItem('gender', this.doctor.gender);
        this.isDoctorSubmitting = false;
        this._router.navigate(['/registrationsuccess']);
      },
      (error: any) => {
        console.log('Doctor Registration Failed');
        console.log(error.error);
        this.isDoctorSubmitting = false;
        this.msg = 'Doctor with ' + this.doctor.email + ' already exists !!!';
      }
    );
  }
}