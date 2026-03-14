import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Slots } from 'src/app/models/slots';
import { DoctorService } from 'src/app/services/doctor.service';

declare var $: any;

@Component({
  selector: 'app-scheduleslots',
  templateUrl: './scheduleslots.component.html',
  styleUrls: ['./scheduleslots.component.css']
})
export class ScheduleslotsComponent implements OnInit {

  currRole = '';
  loggedUser = '';

  slot = new Slots();

  slots?: Observable<Slots[]>;

  constructor(
    private _service: DoctorService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    $("#slotform").hide();

    $(".add-slot-btn").click(() => {
      $("#slotform").show();
      $("#slot-preview").hide();
    });

    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = sessionStorage.getItem('ROLE') || '';

    this.slots = this._service.getSlotDetails(this.loggedUser);
  }

  addSlot(): void {

    this._service.addBookingSlots(this.slot).subscribe({

      next: () => {
        console.log("Slots added successfully");
        this._router.navigate(['/doctordashboard']);
      },

      error: (error) => {
        console.log("Process Failed");
        console.log(error.error);
      }

    });

  }

}
