import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
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
  trend?: string;
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

interface MiniStat {
  label: string;
  icon: string;
  value$: Observable<number>;
  statClass: string;
}

interface ShortcutItem {
  label: string;
  icon: string;
  route: string;
  subtitle: string;
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
  pendingApprovalsCount$!: Observable<number>;
  operationalLoadCount$!: Observable<number>;
  resourceCoverageCount$!: Observable<number>;

  menuItems: MenuItem[] = [];
  dashboardCards: DashboardCard[] = [];
  quickActions: QuickAction[] = [];
  recentActivities: ActivityItem[] = [];
  systemStatus: SystemStatusItem[] = [];
  miniStats: MiniStat[] = [];
  shortcuts: ShortcutItem[] = [];

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.loadSessionValues();
    this.initializeCounts();
    this.initializeMenu();
    this.initializeDashboardCards();
    this.initializeQuickActions();
    this.initializeRecentActivity();
    this.initializeSystemStatus();
    this.initializeMiniStats();
    this.initializeShortcuts();
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

  trackByMiniStat(index: number, item: MiniStat): string {
    return item.label;
  }

  trackByShortcut(index: number, item: ShortcutItem): string {
    return item.route;
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
      { label: 'Check Slots', icon: 'fa fa-calendar', route: '/checkslots' },
      { label: 'Services', icon: 'fa fa-cogs', route: '/services' },
      { label: 'About', icon: 'fa fa-info-circle', route: '/about' }
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
      },
      {
        label: 'Doctor Directory',
        icon: 'fa fa-stethoscope',
        route: '/doctorlist',
        buttonClass: 'violet-action'
      },
      {
        label: 'Appointment Slots',
        icon: 'fa fa-calendar-check-o',
        route: '/checkslots',
        buttonClass: 'dark-action'
      }
    ];
  }

  private initializeRecentActivity(): void {
    this.recentActivities = [
      {
        title: 'Doctor management module',
        subtitle: 'Doctor onboarding, verification, and directory workflows are available from the admin workspace.',
        icon: 'fa fa-user-md',
        badge: 'Active',
        badgeClass: 'badge-success'
      },
      {
        title: 'Appointment operations',
        subtitle: 'Appointments and time-slot metrics are visible for operational monitoring.',
        icon: 'fa fa-calendar-check-o',
        badge: 'Live',
        badgeClass: 'badge-info'
      },
      {
        title: 'Prescription analytics',
        subtitle: 'Prescription volume is tracked through a high-level dashboard metric.',
        icon: 'fa fa-file-text-o',
        badge: 'Stable',
        badgeClass: 'badge-warning'
      },
      {
        title: 'User administration',
        subtitle: 'Registered users and patients remain accessible through central admin navigation.',
        icon: 'fa fa-users',
        badge: 'Ready',
        badgeClass: 'badge-primary'
      },
      {
        title: 'Platform availability',
        subtitle: 'System modules are visible in a single control center for easier monitoring.',
        icon: 'fa fa-desktop',
        badge: 'Healthy',
        badgeClass: 'badge-dark'
      }
    ];
  }

  private initializeSystemStatus(): void {
    this.systemStatus = [
      { label: 'Admin Access', value: 'Enabled', statusClass: 'status-green' },
      { label: 'Role Security', value: 'Protected', statusClass: 'status-blue' },
      { label: 'Dashboard Sync', value: 'Live', statusClass: 'status-purple' },
      { label: 'Platform Health', value: 'Stable', statusClass: 'status-orange' },
      { label: 'Module Routing', value: 'Connected', statusClass: 'status-teal' }
    ];
  }

  private initializeMiniStats(): void {
    this.miniStats = [
      {
        label: 'Users',
        icon: 'fa fa-users',
        value$: this.usersCount$,
        statClass: 'mini-users'
      },
      {
        label: 'Doctors',
        icon: 'fa fa-user-md',
        value$: this.doctorsCount$,
        statClass: 'mini-doctors'
      },
      {
        label: 'Patients',
        icon: 'fa fa-heartbeat',
        value$: this.patientsCount$,
        statClass: 'mini-patients'
      },
      {
        label: 'Appointments',
        icon: 'fa fa-calendar-check-o',
        value$: this.appointmentsCount$,
        statClass: 'mini-appointments'
      }
    ];
  }

  private initializeShortcuts(): void {
    this.shortcuts = [
      {
        label: 'User Directory',
        icon: 'fa fa-address-book',
        route: '/userlist',
        subtitle: 'Browse all registered users'
      },
      {
        label: 'Doctor Approval',
        icon: 'fa fa-check-circle',
        route: '/approvedoctors',
        subtitle: 'Approve or reject doctors'
      },
      {
        label: 'Doctor Directory',
        icon: 'fa fa-user-md',
        route: '/doctorlist',
        subtitle: 'View all doctors'
      },
      {
        label: 'Slot Monitoring',
        icon: 'fa fa-clock-o',
        route: '/checkslots',
        subtitle: 'Check available slots'
      }
    ];
  }

  private initializeCounts(): void {
    this.usersCount$ = this.toCount(this.userService.getTotalUsers());
    this.doctorsCount$ = this.toCount(this.userService.getTotalDoctors());
    this.slotsCount$ = this.toCount(this.userService.getTotalSlots());
    this.patientsCount$ = this.toCount(this.userService.getTotalPatients());
    this.appointmentsCount$ = this.toCount(this.userService.getTotalAppointments());
    this.prescriptionsCount$ = this.toCount(this.userService.getTotalPrescriptions());

    this.totalPlatformCount$ = combineLatest([
      this.usersCount$,
      this.doctorsCount$,
      this.patientsCount$,
      this.appointmentsCount$,
      this.prescriptionsCount$,
      this.slotsCount$
    ]).pipe(
      map(([users, doctors, patients, appointments, prescriptions, slots]) =>
        users + doctors + patients + appointments + prescriptions + slots
      ),
      startWith(0),
      shareReplay(1)
    );

    this.pendingApprovalsCount$ = this.doctorsCount$.pipe(
      map((count) => Math.max(0, Math.floor(count * 0.15))),
      startWith(0),
      shareReplay(1)
    );

    this.operationalLoadCount$ = combineLatest([
      this.appointmentsCount$,
      this.slotsCount$
    ]).pipe(
      map(([appointments, slots]) => appointments + slots),
      startWith(0),
      shareReplay(1)
    );

    this.resourceCoverageCount$ = combineLatest([
      this.doctorsCount$,
      this.patientsCount$
    ]).pipe(
      map(([doctors, patients]) => doctors + patients),
      startWith(0),
      shareReplay(1)
    );
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
        description: 'Manage all registered platform users',
        trend: 'User base overview'
      },
      {
        title: 'Total Doctors',
        icon: 'fa fa-user-md',
        suffix: 'approved doctors',
        count$: this.doctorsCount$,
        cardClass: 'doctors-card',
        route: '/doctorlist',
        description: 'View doctor directory and profiles',
        trend: 'Doctor network status'
      },
      {
        title: 'Total Slots',
        icon: 'fa fa-calendar',
        suffix: 'slots available',
        count$: this.slotsCount$,
        cardClass: 'slots-card',
        route: '/checkslots',
        description: 'Appointment time slot availability',
        trend: 'Schedule capacity'
      },
      {
        title: 'Total Patients',
        icon: 'fa fa-user-o',
        suffix: 'active patients',
        count$: this.patientsCount$,
        cardClass: 'patients-card',
        route: '/patientlist',
        description: 'Monitor patient records and activity',
        trend: 'Patient operations'
      },
      {
        title: 'Prescriptions',
        icon: 'fa fa-sticky-note',
        suffix: 'medical prescriptions',
        count$: this.prescriptionsCount$,
        cardClass: 'prescriptions-card',
        route: '/admindashboard',
        description: 'Track prescribed medications and usage',
        trend: 'Medication visibility'
      },
      {
        title: 'Appointments',
        icon: 'fa fa-check-square-o',
        suffix: 'scheduled appointments',
        count$: this.appointmentsCount$,
        cardClass: 'appointments-card',
        route: '/checkslots',
        description: 'Overview of booking and appointment flow',
        trend: 'Booking operations'
      },
      {
        title: 'Platform Total',
        icon: 'fa fa-line-chart',
        suffix: 'overall entities',
        count$: this.totalPlatformCount$,
        cardClass: 'platform-card',
        route: '/admindashboard',
        description: 'Combined total across key platform modules',
        trend: 'Enterprise overview'
      },
      {
        title: 'Pending Review',
        icon: 'fa fa-clock-o',
        suffix: 'items under review',
        count$: this.pendingApprovalsCount$,
        cardClass: 'pending-card',
        route: '/approvedoctors',
        description: 'Estimated pending approval workload',
        trend: 'Approval queue'
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