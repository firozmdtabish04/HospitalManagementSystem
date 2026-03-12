import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

declare var $: any;

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {

  profileDetails!: Observable<Doctor[]>;
  doctor: Doctor = new Doctor();

  msg: string = '';
  currRole: string = '';
  loggedUser: string = '';
  temp: boolean = false;

  constructor(
    private _service: DoctorService,
    private activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {

    // Get logged user
    this.loggedUser = sessionStorage.getItem('loggedUser') || '';

    // Get role
    this.currRole = sessionStorage.getItem('ROLE') || '';

    // Show profile card and hide form
    $("#profilecard").show();
    $("#profileform").hide();

    // Load profile details
    this.getProfileDetails(this.loggedUser);
  }


  // Show edit form
  editProfile(): void {

    $("#profilecard").hide();
    $("#profileform").show();

  }


  // Load profile details
  getProfileDetails(email: string): void {

    this.profileDetails = this._service.getProfileDetails(email);

    console.log("Profile Loaded:", this.profileDetails);

  }


  // Update profile
  updateDoctorProfile(): void {

    this._service.UpdateDoctorProfile(this.doctor).subscribe({

      next: (data) => {

        console.log("Profile Updated Successfully");

        this.msg = "Profile Updated Successfully!";
        this.temp = true;

        $(".editbtn").hide();
        $("#message").show();

        $("#profilecard").show();
        $("#profileform").hide();

        // redirect after 6 seconds
        setTimeout(() => {

          this._router.navigate(['/userdashboard']);

        }, 6000);

      },

      error: (error) => {

        console.log("Profile Update Failed", error);

        this.msg = "Profile Update Failed!";

      }

    });

  }

}
