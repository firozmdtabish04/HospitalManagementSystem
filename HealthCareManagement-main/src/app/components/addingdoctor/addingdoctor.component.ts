import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-addingdoctor',
  templateUrl: './addingdoctor.component.html',
  styleUrls: ['./addingdoctor.component.css']
})
export class AddingdoctorComponent implements OnInit {

  doctor: Doctor = new Doctor();

  constructor(
    private doctorService: DoctorService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  addDoctor(): void {

    this.doctorService.addDoctorFromRemote(this.doctor).subscribe({

      next: () => {

        console.log("Doctor added successfully");
        this.router.navigate(['/admindashboard']);

      },

      error: (err) => {

        console.error("Error adding doctor", err);

      }

    });

  }

}
