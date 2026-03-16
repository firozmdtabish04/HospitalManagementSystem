import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Slots } from 'src/app/models/slots';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-scheduleslots',
  templateUrl: './scheduleslots.component.html',
  styleUrls: ['./scheduleslots.component.css']
})
export class ScheduleslotsComponent implements OnInit {
  currRole = '';
  loggedUser = '';

  slot: Slots = new Slots();
  slots?: Observable<Slots[]>;

  showAddForm = false;
  minDate = '';
  pageVersion = 'v3.1.0 Enterprise';

  infoMessage = '';
  errorMessage = '';
  successMessage = '';

  morningOptions: string[] = [
    '9.00 AM - 11.00 AM',
    '9.30 AM - 11.30 AM',
    '10.00 AM - 12.00 PM'
  ];

  noonOptions: string[] = [
    '1.00 PM - 3.00 PM',
    '1.30 PM - 3.30 PM',
    '2.00 PM - 4.00 PM'
  ];

  eveningOptions: string[] = [
    '5.00 PM - 7.00 PM',
    '5.30 PM - 7.30 PM',
    '6.00 PM - 8.00 PM'
  ];

  patientTypeOptions: string[] = [
    'IN Patients',
    'OUT Patients',
    'Both IN & OUT Patients',
    'Emergency Operations'
  ];

  constructor(private _service: DoctorService) { }

  ngOnInit(): void {
    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = (sessionStorage.getItem('ROLE') || '').toLowerCase();
    this.minDate = this.getTodayDate();

    this.resetFormData();
    this.loadSlots();
    this.infoMessage = 'Manage and publish your patient visiting slots from this workspace.';
  }

  loadSlots(): void {
    if (!this.loggedUser)
    {
      this.errorMessage = 'Logged in user not found in session.';
      this.infoMessage = '';
      return;
    }

    this.slots = this._service.getSlotDetails(this.loggedUser);
  }

  refreshSlots(): void {
    this.loadSlots();
    this.successMessage = '';
    this.errorMessage = '';
    this.infoMessage = 'Slot data refreshed successfully.';
  }

  openAddForm(): void {
    this.showAddForm = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.infoMessage = 'Enter slot details and publish availability.';
    this.resetFormData();
  }

  backToPreview(): void {
    this.showAddForm = false;
    this.successMessage = '';
    this.errorMessage = '';
    this.infoMessage = 'Viewing your published slot schedule.';
  }

  addSlot(): void {
    this.normalizeEmptySlots();

    if (!this.isSlotFormValid())
    {
      this.errorMessage = 'Please fill all required fields and select at least one available slot.';
      this.successMessage = '';

      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill all required fields and select at least one available slot.',
        confirmButtonColor: '#f59e0b'
      });
      return;
    }

    this.setDefaultStatuses();

    this._service.addBookingSlots(this.slot).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Slot Added',
          text: 'Your slot has been published successfully.',
          timer: 2000,
          showConfirmButton: false
        });

        this.successMessage = 'Slots added successfully.';
        this.errorMessage = '';
        this.infoMessage = 'Your new availability has been published.';
        this.resetFormData();
        this.showAddForm = false;
        this.loadSlots();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Unable to add slot details. Please try again.',
          confirmButtonColor: '#dc2626'
        });

        this.successMessage = '';
        this.errorMessage = 'Failed to add slot details. Please try again.';
        console.log(error?.error);
      }
    });
  }

  resetFormData(): void {
    const preservedEmail = this.loggedUser || '';
    this.slot = new Slots();

    this.slot.doctorname = '';
    this.slot.email = preservedEmail;
    this.slot.specialization = '';
    this.slot.date = '';
    this.slot.patienttype = '';
    this.slot.amslot = '';
    this.slot.noonslot = '';
    this.slot.pmslot = '';
    this.slot.amstatus = '';
    this.slot.noonstatus = '';
    this.slot.pmstatus = '';
  }

  clearForm(): void {
    this.resetFormData();
    this.errorMessage = '';
    this.successMessage = '';
    this.infoMessage = 'Form cleared successfully.';
  }

  isSlotFormValid(): boolean {
    const hasBasicFields =
      !!this.slot.doctorname?.trim() &&
      !!this.slot.email?.trim() &&
      !!this.slot.specialization?.trim() &&
      !!this.slot.date?.trim() &&
      !!this.slot.patienttype?.trim();

    const hasAnySlot =
      !!this.slot.amslot?.trim() ||
      !!this.slot.noonslot?.trim() ||
      !!this.slot.pmslot?.trim();

    return hasBasicFields && hasAnySlot;
  }

  normalizeEmptySlots(): void {
    this.slot.amslot = this.slot.amslot?.trim() ? this.slot.amslot : 'empty';
    this.slot.noonslot = this.slot.noonslot?.trim() ? this.slot.noonslot : 'empty';
    this.slot.pmslot = this.slot.pmslot?.trim() ? this.slot.pmslot : 'empty';
  }

  setDefaultStatuses(): void {
    this.slot.amstatus = this.slot.amslot !== 'empty' ? 'unbooked' : 'empty';
    this.slot.noonstatus = this.slot.noonslot !== 'empty' ? 'unbooked' : 'empty';
    this.slot.pmstatus = this.slot.pmslot !== 'empty' ? 'unbooked' : 'empty';
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, '0');
    const day = `${today.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getDoctorName(slots: Slots[] | null | undefined): string {
    return slots?.[0]?.doctorname || 'Doctor';
  }

  getDoctorEmail(slots: Slots[] | null | undefined): string {
    return slots?.[0]?.email || this.loggedUser || 'Not Available';
  }

  getDoctorSpecialization(slots: Slots[] | null | undefined): string {
    return slots?.[0]?.specialization || 'Not Available';
  }

  getTotalSchedules(slots: Slots[] | null | undefined): number {
    return slots?.length || 0;
  }

  getAvailableSlotCount(slots: Slots[] | null | undefined): number {
    if (!slots?.length) return 0;

    return slots.reduce((count, item) => {
      if (item.amslot && item.amslot !== 'empty' && item.amstatus === 'unbooked') count++;
      if (item.noonslot && item.noonslot !== 'empty' && item.noonstatus === 'unbooked') count++;
      if (item.pmslot && item.pmslot !== 'empty' && item.pmstatus === 'unbooked') count++;
      return count;
    }, 0);
  }

  getBookedSlotCount(slots: Slots[] | null | undefined): number {
    if (!slots?.length) return 0;

    return slots.reduce((count, item) => {
      if (item.amstatus === 'booked') count++;
      if (item.noonstatus === 'booked') count++;
      if (item.pmstatus === 'booked') count++;
      return count;
    }, 0);
  }

  getNoSlotCount(slots: Slots[] | null | undefined): number {
    if (!slots?.length) return 0;

    return slots.reduce((count, item) => {
      if (item.amslot === 'empty') count++;
      if (item.noonslot === 'empty') count++;
      if (item.pmslot === 'empty') count++;
      return count;
    }, 0);
  }

  getTotalPublishedWindows(slots: Slots[] | null | undefined): number {
    if (!slots?.length) return 0;
    return this.getAvailableSlotCount(slots) + this.getBookedSlotCount(slots);
  }

  getSlotBadgeClass(slotValue?: string, slotStatus?: string): string {
    if (!slotValue || slotValue === 'empty')
    {
      return 'noslot';
    }

    if ((slotStatus || '').toLowerCase() === 'booked')
    {
      return 'accepted';
    }

    return 'pending';
  }

  getSlotLabel(slotValue?: string, slotStatus?: string): string {
    if (!slotValue || slotValue === 'empty')
    {
      return 'No Slot';
    }

    if ((slotStatus || '').toLowerCase() === 'booked')
    {
      return 'Booked';
    }

    return slotValue;
  }

  trackBySlot(index: number, slotItem: Slots): string {
    return `${slotItem.email || 'slot'}-${slotItem.date || index}-${index}`;
  }
}