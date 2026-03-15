import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // 1. Ye import add karo sorting ke liye
import { Slots } from 'src/app/models/slots';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-scheduleslots',
  templateUrl: './scheduleslots.component.html',
  styleUrls: ['./scheduleslots.component.css']
})
export class ScheduleslotsComponent implements OnInit {
  currRole = '';
  loggedUser = '';
  showForm: boolean = false;
  slot = new Slots();
  slots?: Observable<Slots[]>;
  successMsg = '';
  minDate: string = '';

  constructor(private _service: DoctorService, private _router: Router) { }

  ngOnInit(): void {
    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = sessionStorage.getItem('ROLE') || '';

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.initializeDefaultSlotValues();
    this.slot.email = this.loggedUser;
    this.fetchDoctorBasicInfo();
    this.loadSlots();
  }

  // 2. Updated loadSlots method with Sorting logic
  loadSlots() {
    this.slots = this._service.getSlotDetails(this.loggedUser).pipe(
      map((data: Slots[]) => {
        return data.sort((a, b) => {
          // Date ko compare karke descending order (Latest First) mein set kar raha hai
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      })
    );
  }

  initializeDefaultSlotValues() {
    this.slot.amslot = 'empty';
    this.slot.noonslot = 'empty';
    this.slot.pmslot = 'empty';
    this.slot.patienttype = 'Both IN & OUT Patients';
  }

  fetchDoctorBasicInfo() {
    this._service.getProfileDetails(this.loggedUser).subscribe(data => {
      if (data && data.length > 0) {
        this.slot.doctorname = data[0].doctorname;
        this.slot.specialization = data[0].specialization;
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.successMsg = '';
    if (this.showForm) {
      this.initializeDefaultSlotValues();
    }
  }

  addSlot(): void {
    this._service.addBookingSlots(this.slot).subscribe({
      next: (response) => {
        this.successMsg = "Slot added successfully!";
        this.loadSlots(); // Sorting ke saath refresh hoga

        const docName = this.slot.doctorname;
        const spec = this.slot.specialization;
        this.slot = new Slots();
        this.slot.email = this.loggedUser;
        this.slot.doctorname = docName;
        this.slot.specialization = spec;
        this.initializeDefaultSlotValues();

        setTimeout(() => {
          this.showForm = false;
          this.successMsg = '';
        }, 2000);
      },
      error: (error) => {
        if (error.status === 409) {
          alert("Error: Bhai is date ke liye slots pehle se bane huye hain. Please doosri date select karein.");
        } else {
          alert("Process Failed: Kuch technical issue hai.");
        }
      }
    });
  }
  // Is function ko class ke andar add karo
  deleteSlot(date: string): void {
    if (confirm("Bhai, kya aap sach mein ye slot delete karna chahte hain?")) {
      this._service.deleteSlot(this.loggedUser, date).subscribe({
        next: (res) => {
          // Response string hai toh check karne ki zaroorat nahi seedha refresh karo
          this.loadSlots();
          alert("Slot deleted successfully!");
        },
        error: (err) => {
          console.log("Delete failed", err);
          alert("Slot delete nahi ho paya, backend check karo!");
        }
      });
    }
  }
}