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
  // Is method ko replace karo apne puraane method se
  getProfileDetails(email: string): void {
    // 1. Screen par dikhane ke liye (Observable)
    this.profileDetails = this._service.getProfileDetails(email);

    // 2. Form ke inputs bharne ke liye (Subscription)
    this._service.getProfileDetails(email).subscribe({
      next: (data: any) => {
        // Kyunki aapka API List<Doctor> bhej raha hai (backend code dekha maine)
        // Isliye hum first element [0] lenge.
        if (data && data.length > 0) {
          this.doctor = data[0];
          console.log("Form pre-filled with:", this.doctor);
        }
      },
      error: (err) => console.log("Data load nahi hua", err)
    });
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

          this._router.navigate(['/doctordashboard']);

        }, 6000);

      },

      error: (error) => {

        console.log("Profile Update Failed", error);

        this.msg = "Profile Update Failed!";

      }

    });

  }

}
