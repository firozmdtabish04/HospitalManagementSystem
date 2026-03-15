import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  route: string;
}

interface ScheduleItem {
  time: string;
  title: string;
  patient: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
}

interface ActivityItem {
  icon: string;
  title: string;
  subtitle: string;
  time: string;
}

interface AppointmentItem {
  patientName: string;
  department: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
}

@Component({
  selector: 'app-doctordashboard',
  templateUrl: './doctordashboard.component.html',
  styleUrls: ['./doctordashboard.component.css']
})
export class DoctordashboardComponent implements OnInit {
  name = '';
  gender = '';
  loggedUser = '';
  currRole = '';

  isSidebarOpen = true;
  currentDate: Date = new Date();
  dashboardVersion = 'v2.0.0 Enterprise';
  appName = 'HealthCare Management System';

  patients$: Observable<any[]> | undefined;
  users$: Observable<any[]> | undefined;
  doctors$: Observable<any[]> | undefined;
  slots$: Observable<any[]> | undefined;
  prescriptions$: Observable<any[]> | undefined;

  totalPatients = 0;
  totalDoctors = 0;
  totalSlots = 0;
  totalPrescriptions = 0;
  totalUsers = 0;

  completionRate = 92;
  patientSatisfaction = 96;
  monthlyAppointments = 128;
  activeCases = 14;
  availableSlotsToday = 11;
  pendingApprovals = 3;

  quickActions: QuickAction[] = [
    {
      title: 'Edit Profile',
      description: 'Update your doctor profile and account details',
      icon: 'fa-edit',
      route: '/editdoctorprofile'
    },
    {
      title: 'Approval Status',
      description: 'Review onboarding and verification progress',
      icon: 'fa-check-circle',
      route: '/approvalstatus'
    },
    {
      title: 'Manage Schedule',
      description: 'Configure slots and availability timings',
      icon: 'fa-clock-o',
      route: '/scheduleslots'
    },
    {
      title: 'Doctor Directory',
      description: 'Browse all registered doctors',
      icon: 'fa-user-md',
      route: '/doctorlist'
    },
    {
      title: 'Patient Records',
      description: 'Access and manage patient details',
      icon: 'fa-users',
      route: '/patientlist'
    },
    {
      title: 'Add Prescription',
      description: 'Create and assign prescriptions quickly',
      icon: 'fa-sticky-note-o',
      route: '/addprescription'
    }
  ];

  todaySchedule: ScheduleItem[] = [
    {
      time: '09:00 AM',
      title: 'General Consultation',
      patient: 'Rahul Sharma',
      status: 'Confirmed'
    },
    {
      time: '10:30 AM',
      title: 'Dental Checkup',
      patient: 'Priya Das',
      status: 'Pending'
    },
    {
      time: '12:00 PM',
      title: 'Follow-up Visit',
      patient: 'Amit Kumar',
      status: 'Confirmed'
    },
    {
      time: '03:00 PM',
      title: 'Cardiology Review',
      patient: 'Sneha Reddy',
      status: 'Completed'
    }
  ];

  recentActivities: ActivityItem[] = [
    {
      icon: 'fa-user-plus',
      title: 'New patient registered',
      subtitle: 'A patient profile was added successfully',
      time: '10 mins ago'
    },
    {
      icon: 'fa-calendar-check-o',
      title: 'Appointment scheduled',
      subtitle: 'A new consultation has been booked for today',
      time: '25 mins ago'
    },
    {
      icon: 'fa-file-text-o',
      title: 'Prescription created',
      subtitle: 'Prescription added for completed consultation',
      time: '1 hour ago'
    },
    {
      icon: 'fa-clock-o',
      title: 'Slot availability updated',
      subtitle: 'Weekly doctor schedule was updated',
      time: '2 hours ago'
    }
  ];

  recentAppointments: AppointmentItem[] = [
    {
      patientName: 'Rahul Sharma',
      department: 'General Medicine',
      date: '15 Mar 2026',
      time: '09:00 AM',
      status: 'Confirmed'
    },
    {
      patientName: 'Priya Das',
      department: 'Dental',
      date: '15 Mar 2026',
      time: '10:30 AM',
      status: 'Pending'
    },
    {
      patientName: 'Amit Kumar',
      department: 'Neurology',
      date: '15 Mar 2026',
      time: '12:00 PM',
      status: 'Completed'
    },
    {
      patientName: 'Sneha Reddy',
      department: 'Cardiology',
      date: '15 Mar 2026',
      time: '03:00 PM',
      status: 'Confirmed'
    }
  ];

  constructor(
    private _route: Router,
    private _service: UserService
  ) { }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('loggedUser') || 'Doctor';
    this.gender = sessionStorage.getItem('gender') || '';
    this.loggedUser = sessionStorage.getItem('loggedUser') || 'doctor@hospital.com';
    this.currRole = sessionStorage.getItem('ROLE') || 'Doctor';

    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.patients$ = this._service.getTotalPatients();
    this.users$ = this._service.getTotalUsers();
    this.doctors$ = this._service.getTotalDoctors();
    this.slots$ = this._service.getTotalSlots();
    this.prescriptions$ = this._service.getTotalPrescriptions();

    this.patients$?.subscribe({
      next: (data: any[]) => {
        this.totalPatients = this.extractCount(data);
      },
      error: () => {
        this.totalPatients = 0;
      }
    });

    this.users$?.subscribe({
      next: (data: any[]) => {
        this.totalUsers = this.extractCount(data);
      },
      error: () => {
        this.totalUsers = 0;
      }
    });

    this.doctors$?.subscribe({
      next: (data: any[]) => {
        this.totalDoctors = this.extractCount(data);
      },
      error: () => {
        this.totalDoctors = 0;
      }
    });

    this.slots$?.subscribe({
      next: (data: any[]) => {
        this.totalSlots = this.extractCount(data);
        this.availableSlotsToday = this.totalSlots;
      },
      error: () => {
        this.totalSlots = 0;
      }
    });

    this.prescriptions$?.subscribe({
      next: (data: any[]) => {
        this.totalPrescriptions = this.extractCount(data);
      },
      error: () => {
        this.totalPrescriptions = 0;
      }
    });
  }

  extractCount(data: any): number {
    if (Array.isArray(data) && data.length > 0)
    {
      if (typeof data[0] === 'number')
      {
        return data[0];
      }

      if (typeof data[0] === 'string')
      {
        return +data[0] || 0;
      }

      if (typeof data[0] === 'object' && data[0] !== null)
      {
        const firstKey = Object.keys(data[0])[0];
        return +data[0][firstKey] || 0;
      }
    }

    if (typeof data === 'number')
    {
      return data;
    }

    return 0;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  navigateTo(route: string): void {
    this._route.navigate([route]);
  }

  getProfileImage(): string {
    if (this.gender?.toLowerCase() === 'female')
    {
      return 'assets/img/femaledoctor.png';
    }
    return 'assets/img/maledoctor.png';
  }

  getGreeting(): string {
    const hour = new Date().getHours();

    if (hour < 12)
    {
      return 'Good Morning';
    } else if (hour < 17)
    {
      return 'Good Afternoon';
    } else
    {
      return 'Good Evening';
    }
  }

  getShortName(): string {
    if (!this.name)
    {
      return 'DR';
    }

    return this.name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }
}