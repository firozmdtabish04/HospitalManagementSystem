import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, startWith } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  exact?: boolean;
}

interface DashboardCard {
  title: string;
  icon: string;
  suffix: string;
  count$: Observable<number>;
  cardClass: string;
  route: string;
  description: string;
}

interface QuickAction {
  label: string;
  icon: string;
  route: string;
  buttonClass: string;
}

interface ActivityItem {
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  badgeClass: string;
}

interface SystemStatusItem {
  label: string;
  value: string;
  statusClass: string;
}

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdmindashboardComponent implements OnInit {
  name = 'Admin';
  gender = '';
  loggedUser = '';
  currRole = 'Administrator';

  isMenuOpen = false;

  usersCount$!: Observable<number>;
  doctorsCount$!: Observable<number>;
  slotsCount$!: Observable<number>;
  patientsCount$!: Observable<number>;
  appointmentsCount$!: Observable<number>;
  prescriptionsCount$!: Observable<number>;

  totalPlatformCount$!: Observable<number>;

  menuItems: MenuItem[] = [];
  dashboardCards: DashboardCard[] = [];
  quickActions: QuickAction[] = [];
  recentActivities: ActivityItem[] = [];
  systemStatus: SystemStatusItem[] = [];

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.loadSessionValues();
    this.initializeCounts();
    this.initializeMenu();
    this.initializeDashboardCards();
    this.initializeQuickActions();
    this.initializeRecentActivity();
    this.initializeSystemStatus();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenuOnMobile(): void {
    this.isMenuOpen = false;
  }

  trackByMenu(index: number, item: MenuItem): string {
    return item.route;
  }

  trackByCard(index: number, item: DashboardCard): string {
    return item.title;
  }

  trackByAction(index: number, item: QuickAction): string {
    return item.route;
  }

  trackByActivity(index: number, item: ActivityItem): string {
    return item.title + item.subtitle;
  }

  trackByStatus(index: number, item: SystemStatusItem): string {
    return item.label;
  }

  private loadSessionValues(): void {
    this.name = this.getSessionValue('ROLE', 'Admin');
    this.gender = this.getSessionValue('gender');
    this.loggedUser = this.getSessionValue('loggedUser', 'Admin User');
    this.currRole = this.getSessionValue('ROLE', 'Administrator');
  }

  private getSessionValue(key: string, fallback = ''): string {
    const value = sessionStorage.getItem(key);
    return value ? value.trim() : fallback;
  }

  private initializeMenu(): void {
    this.menuItems = [
      { label: 'Dashboard', icon: 'fa fa-th-large', route: '/admindashboard', exact: true },
      { label: 'Add Doctor', icon: 'fa fa-plus-circle', route: '/addDoctor' },
      { label: 'Approve Doctors', icon: 'fa fa-check-circle', route: '/approvedoctors' },
      { label: 'Doctor List', icon: 'fa fa-user-md', route: '/doctorlist' },
      { label: 'Users', icon: 'fa fa-users', route: '/userlist' },
      { label: 'Patients', icon: 'fa fa-user-o', route: '/patientlist' },
      { label: 'About', icon: 'fa fa-info-circle', route: '/about' },
      { label: 'Services', icon: 'fa fa-cogs', route: '/services' }
    ];
  }

  private initializeQuickActions(): void {
    this.quickActions = [
      {
        label: 'Add New Doctor',
        icon: 'fa fa-user-md',
        route: '/addDoctor',
        buttonClass: 'primary-action'
      },
      {
        label: 'Approve Registrations',
        icon: 'fa fa-check',
        route: '/approvedoctors',
        buttonClass: 'success-action'
      },
      {
        label: 'View Users',
        icon: 'fa fa-users',
        route: '/userlist',
        buttonClass: 'info-action'
      },
      {
        label: 'Manage Patients',
        icon: 'fa fa-heartbeat',
        route: '/patientlist',
        buttonClass: 'warning-action'
      }
    ];
  }

  private initializeRecentActivity(): void {
    this.recentActivities = [
      {
        title: 'Doctor management module',
        subtitle: 'You can add and approve doctors from the admin panel.',
        icon: 'fa fa-user-md',
        badge: 'Active',
        badgeClass: 'badge-success'
      },
      {
        title: 'Appointment operations',
        subtitle: 'Appointment insights are available from dashboard metrics.',
        icon: 'fa fa-calendar-check-o',
        badge: 'Monitored',
        badgeClass: 'badge-info'
      },
      {
        title: 'Prescription analytics',
        subtitle: 'Prescription totals are being tracked in real time.',
        icon: 'fa fa-file-text-o',
        badge: 'Healthy',
        badgeClass: 'badge-warning'
      },
      {
        title: 'User administration',
        subtitle: 'User and patient records are accessible from quick navigation.',
        icon: 'fa fa-users',
        badge: 'Ready',
        badgeClass: 'badge-primary'
      }
    ];
  }

  private initializeSystemStatus(): void {
    this.systemStatus = [
      { label: 'Admin Access', value: 'Enabled', statusClass: 'status-green' },
      { label: 'Role Security', value: 'Protected', statusClass: 'status-blue' },
      { label: 'Dashboard Sync', value: 'Live', statusClass: 'status-purple' },
      { label: 'Platform Health', value: 'Stable', statusClass: 'status-orange' }
    ];
  }

  private initializeCounts(): void {
    this.usersCount$ = this.toCount(this.userService.getTotalUsers());
    this.doctorsCount$ = this.toCount(this.userService.getTotalDoctors());
    this.slotsCount$ = this.toCount(this.userService.getTotalSlots());
    this.patientsCount$ = this.toCount(this.userService.getTotalPatients());
    this.appointmentsCount$ = this.toCount(this.userService.getTotalAppointments());
    this.prescriptionsCount$ = this.toCount(this.userService.getTotalPrescriptions());

    this.totalPlatformCount$ = of(0);
  }

  private initializeDashboardCards(): void {
    this.dashboardCards = [
      {
        title: 'Total Users',
        icon: 'fa fa-users',
        suffix: 'registered users',
        count$: this.usersCount$,
        cardClass: 'users-card',
        route: '/userlist',
        description: 'Manage all registered platform users'
      },
      {
        title: 'Total Doctors',
        icon: 'fa fa-user-md',
        suffix: 'approved doctors',
        count$: this.doctorsCount$,
        cardClass: 'doctors-card',
        route: '/doctorlist',
        description: 'View doctor directory and profiles'
      },
      {
        title: 'Total Slots',
        icon: 'fa fa-calendar',
        suffix: 'slots available',
        count$: this.slotsCount$,
        cardClass: 'slots-card',
        route: '/admindashboard',
        description: 'Appointment time slot availability'
      },
      {
        title: 'Total Patients',
        icon: 'fa fa-user-o',
        suffix: 'active patients',
        count$: this.patientsCount$,
        cardClass: 'patients-card',
        route: '/patientlist',
        description: 'Monitor patient records and activity'
      },
      {
        title: 'Prescriptions',
        icon: 'fa fa-sticky-note',
        suffix: 'medical prescriptions',
        count$: this.prescriptionsCount$,
        cardClass: 'prescriptions-card',
        route: '/admindashboard',
        description: 'Track prescribed medications and usage'
      },
      {
        title: 'Appointments',
        icon: 'fa fa-check-square-o',
        suffix: 'scheduled appointments',
        count$: this.appointmentsCount$,
        cardClass: 'appointments-card',
        route: '/admindashboard',
        description: 'Overview of booking and appointment flow'
      }
    ];
  }

  private toCount(source$: Observable<any>): Observable<number> {
    return source$.pipe(
      map((response: any) => {
        if (typeof response === 'number')
        {
          return response;
        }

        if (Array.isArray(response))
        {
          if (response.length === 1 && typeof response[0] === 'number')
          {
            return response[0];
          }
          return response.length;
        }

        if (response && typeof response.count === 'number')
        {
          return response.count;
        }

        if (response && typeof response.total === 'number')
        {
          return response.total;
        }

        return Number(response) || 0;
      }),
      startWith(0),
      catchError(() => of(0)),
      shareReplay(1)
    );
  }
}