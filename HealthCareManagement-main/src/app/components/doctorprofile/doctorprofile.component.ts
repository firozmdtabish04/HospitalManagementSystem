import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {
  profileDetails!: Observable<Doctor[]>;
  doctor: Doctor = new Doctor();

  msg: string = '';
  errorMsg: string = '';
  currRole: string = '';
  loggedUser: string = '';
  isEditMode: boolean = false;
  updateSuccess: boolean = false;
  profileVersion: string = 'v2.0.0 Enterprise';

  constructor(
    private _service: DoctorService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = sessionStorage.getItem('ROLE') || 'Doctor';

    this.getProfileDetails(this.loggedUser);
  }

  getProfileDetails(email: string): void {
    this.profileDetails = this._service.getProfileDetails(email);

    this.profileDetails.subscribe({
      next: (data: Doctor[]) => {
        if (data && data.length > 0)
        {
          this.doctor = { ...data[0] };
        }
      },
      error: (error) => {
        console.error('Profile Load Failed', error);
        this.errorMsg = 'Unable to load profile details.';
      }
    });
  }

  editProfile(): void {
    this.isEditMode = true;
    this.msg = '';
    this.errorMsg = '';
    this.updateSuccess = false;
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.msg = '';
    this.errorMsg = '';
    this.updateSuccess = false;
    this.getProfileDetails(this.loggedUser);
  }

  updateDoctorProfile(): void {
    this.msg = '';
    this.errorMsg = '';
    this.updateSuccess = false;

    this._service.UpdateDoctorProfile(this.doctor).subscribe({
      next: () => {
        this.msg = 'Profile updated successfully.';
        this.updateSuccess = true;
        this.isEditMode = false;
        this.getProfileDetails(this.loggedUser);

        setTimeout(() => {
          this._router.navigate(['/doctordashboard']);
        }, 3000);
      },
      error: (error) => {
        console.error('Profile Update Failed', error);
        this.errorMsg = 'Profile update failed. Please try again.';
      }
    });
  }

  getProfileImage(gender: string | undefined): string {
    if ((gender || '').toLowerCase() === 'female')
    {
      return 'assets/img/femaledoctor.png';
    }
    return 'assets/img/maledoctor.png';
  }

  getExperienceLabel(exp: any): string {
    const value = Number(exp || 0);
    if (value <= 1)
    {
      return 'Junior Specialist';
    } else if (value <= 5)
    {
      return 'Experienced Doctor';
    } else if (value <= 10)
    {
      return 'Senior Consultant';
    }
    return 'Expert Consultant';
  }

  getInitials(name: string | undefined): string {
    if (!name)
    {
      return 'DR';
    }

    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }
}