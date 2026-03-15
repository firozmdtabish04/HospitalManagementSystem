import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Prescription } from 'src/app/models/prescription';
import { DoctorService } from 'src/app/services/doctor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addprescription',
  templateUrl: './addprescription.component.html',
  styleUrls: ['./addprescription.component.css']
})
export class AddprescriptionComponent implements OnInit {
  currRole = '';
  loggedUser = '';
  message = '';
  prescriptionobj = new Prescription();
  appointment: Observable<Appointment[]> | undefined;

  isSubmitting = false;
  showForm = true;
  showMessageCard = false;
  messageType: 'success' | 'error' | 'info' = 'info';
  minPrescriptionLength = 15;
  maxPrescriptionLength = 1000;

  prescriptionTemplates: string[] = [
    'Tab Paracetamol 650 mg - 1 tablet after food, twice daily for 5 days.',
    'Tab Azithromycin 500 mg - 1 tablet once daily for 3 days.\nDrink plenty of fluids and take proper rest.',
    'Tab Pantoprazole 40 mg - 1 tablet before breakfast for 7 days.\nAvoid oily and spicy food.',
    'Steam inhalation twice daily.\nWarm saline gargles 3 times daily.\nTab Cetirizine 10 mg at bedtime for 5 days.',
    'ORS after each loose stool.\nMaintain hydration.\nCome for review if symptoms persist for more than 2 days.'
  ];

  constructor(
    private _service: DoctorService,
    private _router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser') || '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE') || '{}');
    this.currRole = this.currRole.replace(/"/g, '');

    this.appointment = this._service.getPatientList();

    if (!this.prescriptionobj.doctorname && this.loggedUser)
    {
      this.prescriptionobj.doctorname = this.loggedUser;
    }
  }

  get prescriptionLength(): number {
    return (this.prescriptionobj.prescription || '').trim().length;
  }

  useTemplate(template: string): void {
    this.prescriptionobj.prescription = template;
  }

  clearPrescription(): void {
    this.prescriptionobj.prescription = '';
  }

  resetFormState(): void {
    this.showForm = true;
    this.showMessageCard = false;
    this.message = '';
    this.messageType = 'info';
  }

  addPrescription() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    this._service.addPrescriptions(this.prescriptionobj).subscribe(
      data => {
        console.log('Prescriptions added Successfully');
        this.message =
          "Your prescription was added successfully. Please check the patient's admission status.";
        this.messageType = 'success';
        this.showForm = false;
        this.showMessageCard = true;
        this.isSubmitting = false;

        setTimeout(() => {
          this._router.navigate(['/doctordashboard']);
        }, 5000);
      },
      error => {
        console.log('process Failed');
        this.message =
          'There was a problem while adding your prescription. Please try again.';
        this.messageType = 'error';
        this.showForm = false;
        this.showMessageCard = true;
        this.isSubmitting = false;
        console.log(error?.error);
      }
    );
  }
}