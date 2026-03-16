import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  profileDetails: Observable<User[]> | undefined;
  user: User = new User();
  msg = '';
  currRole = '';
  loggedUser = '';
  temp = false;
  isEditMode = true;

  constructor(
    private _service: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = sessionStorage.getItem('ROLE') || 'User';
    this.getProfileDetails(this.loggedUser);
  }

  editProfile(): void {
    this.isEditMode = true;
  }

  cancelEdit(): void {
    this.isEditMode = false;
  }

  getProfileDetails(loggedUser: string): void {
    this.profileDetails = this._service.getProfileDetails(loggedUser);
    this.profileDetails.subscribe({
      next: (data: User[]) => {
        if (data && data.length > 0)
        {
          this.user = { ...data[0] };
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateUserProfile(): void {
    this._service.UpdateUserProfile(this.user).subscribe(
      data => {
        console.log('UserProfile Updated successfully');
        this.msg = 'Profile Updated Successfully !!!';
        this.temp = true;
        this.isEditMode = false;

        setTimeout(() => {
          this._router.navigate(['/userdashboard']);
        }, 3000);
      },
      error => {
        console.log('Profile Updation Failed');
        console.log(error.error);
        this.msg = 'Profile Updation Failed !!!';
      }
    );
  }

  backToDashboard(): void {
    this._router.navigate(['/userdashboard']);
  }
}