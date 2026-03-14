import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

interface DashboardCard {
  title: string;
  icon: string;
  suffix: string;
  count$: Observable<number>;
  cardClass: string;
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
  currRole = '';

  isMenuOpen = false;

  usersCount$!: Observable<number>;
  doctorsCount$!: Observable<number>;
  slotsCount$!: Observable<number>;
  patientsCount$!: Observable<number>;
  appointmentsCount$!: Observable<number>;
  prescriptionsCount$!: Observable<number>;

  menuItems: MenuItem[] = [];
  dashboardCards: DashboardCard[] = [];

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.loadSessionValues();
    this.initializeCounts();
    this.initializeMenu();
    this.initializeDashboardCards();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  trackByMenu(index: number, item: MenuItem): string {
    return item.route;
  }

  trackByCard(index: number, item: DashboardCard): string {
    return item.title;
  }

  private loadSessionValues(): void {
    this.name = this.getSessionValue('ROLE', 'Admin');
    this.gender = this.getSessionValue('gender');
    this.loggedUser = this.getSessionValue('loggedUser', 'Admin');
    this.currRole = this.getSessionValue('ROLE', 'Administrator');
  }

  private getSessionValue(key: string, fallback = ''): string {
    const value = sessionStorage.getItem(key);
    return value ? value.trim() : fallback;
  }

  private initializeMenu(): void {
    this.menuItems = [
      { label: 'Add Doctor', icon: 'fa fa-plus', route: '/addDoctor' },
      { label: 'Approve Doctors', icon: 'fa fa-check', route: '/approvedoctors' },
      { label: 'Doctor List', icon: 'fa fa-user-md', route: '/doctorlist' },
      { label: 'Users', icon: 'fa fa-user', route: '/userlist' },
      { label: 'Patients', icon: 'fa fa-user-o', route: '/patientlist' },
      { label: 'About', icon: 'fa fa-info-circle', route: '/about' },
      { label: 'Services', icon: 'fa fa-cogs', route: '/services' }
    ];
  }

  private initializeCounts(): void {
    this.usersCount$ = this.toCount(this.userService.getTotalUsers());
    this.doctorsCount$ = this.toCount(this.userService.getTotalDoctors());
    this.slotsCount$ = this.toCount(this.userService.getTotalSlots());
    this.patientsCount$ = this.toCount(this.userService.getTotalPatients());
    this.appointmentsCount$ = this.toCount(this.userService.getTotalAppointments());
    this.prescriptionsCount$ = this.toCount(this.userService.getTotalPrescriptions());
  }

  private initializeDashboardCards(): void {
    this.dashboardCards = [
      {
        title: 'Total Users',
        icon: 'fa fa-user',
        suffix: 'users',
        count$: this.usersCount$,
        cardClass: 'users-card'
      },
      {
        title: 'Total Doctors',
        icon: 'fa fa-user-md',
        suffix: 'doctors',
        count$: this.doctorsCount$,
        cardClass: 'doctors-card'
      },
      {
        title: 'Total Slots',
        icon: 'fa fa-calendar',
        suffix: 'slots available',
        count$: this.slotsCount$,
        cardClass: 'slots-card'
      },
      {
        title: 'Total Patients',
        icon: 'fa fa-user-o',
        suffix: 'patients',
        count$: this.patientsCount$,
        cardClass: 'patients-card'
      },
      {
        title: 'Prescriptions',
        icon: 'fa fa-sticky-note',
        suffix: 'medications',
        count$: this.prescriptionsCount$,
        cardClass: 'prescriptions-card'
      },
      {
        title: 'Appointments',
        icon: 'fa fa-check',
        suffix: 'appointments',
        count$: this.appointmentsCount$,
        cardClass: 'appointments-card'
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

        return Number(response) || 0;
      }),
      shareReplay(1)
    );
  }
}