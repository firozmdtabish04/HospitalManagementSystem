import { Component, OnInit } from '@angular/core';
import { Slots } from 'src/app/models/slots';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-checkslots',
  templateUrl: './checkslots.component.html',
  styleUrls: ['./checkslots.component.css']
})
export class CheckslotsComponent implements OnInit {
  currRole: string = '';
  loggedUser: string = '';

  doctorSearch: string = '';
  specializationSearch: string = '';
  showOnlyAvailable: boolean = false;

  allSlots: Slots[] = [];
  filteredSlots: Slots[] = [];
  paginatedSlots: Slots[] = [];

  totalSchedules: number = 0;
  filteredCount: number = 0;

  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;

  approvedDoctorNames: Set<string> = new Set<string>();

  isLoading: boolean = true;

  constructor(private _service: DoctorService) { }

  ngOnInit(): void {
    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = sessionStorage.getItem('ROLE') || '';

    this.loadApprovedDoctorsAndSlots();
  }

  loadApprovedDoctorsAndSlots(): void {
    this.isLoading = true;

    this._service.getDoctorList().subscribe({
      next: (doctors: Doctor[]) => {
        const approvedDoctors = (doctors || []).filter(
          (doctor) => doctor.status?.toLowerCase() === 'accept'
        );

        this.approvedDoctorNames = new Set(
          approvedDoctors
            .map((doctor) => doctor.doctorname?.trim().toLowerCase())
            .filter((name): name is string => !!name)
        );

        this.loadSlots();
      },
      error: (err) => {
        console.error('Failed to load doctors', err);
        this.approvedDoctorNames = new Set<string>();
        this.loadSlots();
      }
    });
  }

  loadSlots(): void {
    this._service.getSlotList().subscribe({
      next: (data: Slots[]) => {
        const upcomingSlots = (data || [])
          .filter((slot) => this.isRecentOrToday(slot.date))
          .filter((slot) => this.isDoctorApproved(slot.doctorname))
          .sort(
            (a, b) =>
              this.convertToDate(a.date).getTime() -
              this.convertToDate(b.date).getTime()
          );

        this.allSlots = upcomingSlots;
        this.totalSchedules = this.allSlots.length;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load slots', err);
        this.allSlots = [];
        this.totalSchedules = 0;
        this.applyFilters();
        this.isLoading = false;
      }
    });
  }

  isDoctorApproved(doctorName: string): boolean {
    if (!doctorName) return false;
    return this.approvedDoctorNames.has(doctorName.trim().toLowerCase());
  }

  filterSlot(slot: Slots): boolean {
    const doctorName = this.doctorSearch.toLowerCase().trim();
    const specialization = this.specializationSearch.toLowerCase().trim();

    const nameMatch =
      !doctorName || slot.doctorname?.toLowerCase().includes(doctorName);

    const specializationMatch =
      !specialization || slot.specialization?.toLowerCase().includes(specialization);

    const availableMatch =
      !this.showOnlyAvailable || this.hasAnyAvailableSlot(slot);

    return nameMatch && specializationMatch && availableMatch;
  }

  applyFilters(): void {
    this.filteredSlots = this.allSlots.filter((slot) => this.filterSlot(slot));
    this.filteredCount = this.filteredSlots.length;
    this.currentPage = 1;
    this.updatePagination();
  }

  clearFilters(): void {
    this.doctorSearch = '';
    this.specializationSearch = '';
    this.showOnlyAvailable = false;
    this.currentPage = 1;
    this.applyFilters();
  }

  toggleAvailableOnly(): void {
    this.showOnlyAvailable = !this.showOnlyAvailable;
    this.applyFilters();
  }

  updatePagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.filteredSlots.length / this.itemsPerPage));

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedSlots = this.filteredSlots.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages)
    {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1)
    {
      this.currentPage--;
      this.updatePagination();
    }
  }

  get startRecord(): number {
    if (this.filteredCount === 0) return 0;
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endRecord(): number {
    const end = this.currentPage * this.itemsPerPage;
    return end > this.filteredCount ? this.filteredCount : end;
  }

  hasAnyAvailableSlot(slot: Slots): boolean {
    return (
      (slot.amslot !== 'empty' && slot.amstatus === 'unbooked') ||
      (slot.noonslot !== 'empty' && slot.noonstatus === 'unbooked') ||
      (slot.pmslot !== 'empty' && slot.pmstatus === 'unbooked')
    );
  }

  isRecentOrToday(dateValue: string): boolean {
    if (!dateValue) return false;

    const slotDate = this.convertToDate(dateValue);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    slotDate.setHours(0, 0, 0, 0);

    return slotDate.getTime() >= today.getTime();
  }

  convertToDate(dateValue: string): Date {
    if (!dateValue) return new Date(0);

    const normalized = dateValue.replace(/\//g, '-');
    const parts = normalized.split('-');

    if (parts.length === 3)
    {
      if (parts[0].length === 4)
      {
        return new Date(+parts[0], +parts[1] - 1, +parts[2]);
      }

      return new Date(+parts[2], +parts[1] - 1, +parts[0]);
    }

    return new Date(dateValue);
  }
}