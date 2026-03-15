import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
<<<<<<< HEAD
interface DashboardStat {
  title: string;
  value$?: Observable<number>;
  icon: string;
  route: string;
  theme:
    | 'blue'
    | 'orange'
    | 'red'
    | 'green'
    | 'purple'
    | 'teal'
    | 'dark';
  subtitle: string;
}
=======
import * as $ from 'jquery';
>>>>>>> tabish_hms

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
<<<<<<< HEAD
export class UserdashboardComponent implements OnInit {
  name = '';
  gender = '';
=======
export class UserprofileComponent implements OnInit {
  profileDetails: Observable<User[]> | undefined;
  user: User = new User();
  msg = ' ';
>>>>>>> tabish_hms
  currRole = '';
  isCollapsed = false;

<<<<<<< HEAD
  totalPatients$!: Observable<number>;
  totalUsers$!: Observable<number>;
  totalDoctors$!: Observable<number>;
  totalSlots$!: Observable<number>;

  stats: DashboardStat[] = [];

  quickLinks = [
    {
      label: 'Edit Profile',
      icon: 'fa fa-edit',
      route: '/edituserprofile'
    },
    {
      label: 'Doctor List',
      icon: 'fa fa-user-md',
      route: '/doctorlist'
    },
    {
      label: 'Check Slots',
      icon: 'fa fa-clock-o',
      route: '/checkslots'
    },
    {
      label: 'New Appointment',
      icon: 'fa fa-calendar',
      route: '/bookappointment'
    },
    {
      label: 'Approval Status',
      icon: 'fa fa-check',
      route: '/approvalstatus'
    },
    {
      label: 'Prescription',
      icon: 'fa fa-sticky-note-o',
      route: '/prescriptionlist'
    }
  ];

  constructor(private userService: UserService) {}
=======
  constructor(
    private _service: UserService,
    private activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }
>>>>>>> tabish_hms

  ngOnInit(): void {
    this.name = sessionStorage.getItem('loggedUser') || 'User';
    this.gender = sessionStorage.getItem('gender') || '';
    this.currRole = sessionStorage.getItem('ROLE') || '';

    this.totalPatients$ = this.userService
      .getTotalPatients()
      .pipe(map((res: any[]) => this.extractCount(res)));

<<<<<<< HEAD
    this.totalUsers$ = this.userService
      .getTotalUsers()
      .pipe(map((res: any[]) => this.extractCount(res)));

    this.totalDoctors$ = this.userService
      .getTotalDoctors()
      .pipe(map((res: any[]) => this.extractCount(res)));
=======
    $('#profilecard').show();
    $('#profileform').hide();
    this.getProfileDetails(this.loggedUser);
  }

  editProfile() {
    $('#profilecard').hide();
    $('#profileform').show();
  }
>>>>>>> tabish_hms

    this.totalSlots$ = this.userService
      .getTotalSlots()
      .pipe(map((res: any[]) => this.extractCount(res)));

<<<<<<< HEAD
    this.stats = [
      {
        title: 'Total Doctors',
        value$: this.totalDoctors$,
        icon: 'fa fa-user-md',
        route: '/doctorlist',
        theme: 'blue',
        subtitle: 'Available specialists in the system'
      },
      {
        title: 'Total Users',
        value$: this.totalUsers$,
        icon: 'fa fa-users',
        route: '/userlist',
        theme: 'orange',
        subtitle: 'Registered users across the platform'
      },
      {
        title: 'Total Patients',
        value$: this.totalPatients$,
        icon: 'fa fa-user',
        route: '/patientlist',
        theme: 'red',
        subtitle: 'Patients currently managed'
      },
      {
        title: 'Available Slots',
        value$: this.totalSlots$,
        icon: 'fa fa-calendar',
        route: '/checkslots',
        theme: 'green',
        subtitle: 'Bookable appointment slots'
      },
      {
        title: 'Book Appointments',
        icon: 'fa fa-calendar-check-o',
        route: '/bookappointment',
        theme: 'purple',
        subtitle: 'Schedule and manage appointments'
      },
      {
        title: 'Prescriptions',
        icon: 'fa fa-sticky-note',
        route: '/prescriptionlist',
        theme: 'teal',
        subtitle: 'Access issued prescriptions'
      },
      {
        title: 'Hospital Services',
        icon: 'fa fa-hospital-o',
        route: '/services',
        theme: 'dark',
        subtitle: 'Explore healthcare services'
      }
    ];
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  private extractCount(data: any): number {
    if (Array.isArray(data)) {
      if (data.length === 1 && typeof data[0] === 'number') {
        return data[0];
      }
      return data.length;
    }

    if (typeof data === 'number') {
      return data;
    }

    return 0;
  }
=======
  updateUserProfile() {
    this._service.UpdateUserProfile(this.user).subscribe(
      data => {
        console.log('UserProfile Updated succesfully');
        this.msg = 'Profile Updated Successfully !!!';
        $('.editbtn').hide();
        $('#message').show();
        this.temp = true;
        $('#profilecard').show();
        $('#profileform').hide();
        setTimeout(() => {
          this._router.navigate(['/userdashboard']);
        }, 6000);
      },
      error => {
        console.log('Profile Updation Failed');
        console.log(error.error);
        this.msg = 'Profile Updation Failed !!!';
      }
    );
  }
>>>>>>> tabish_hms
}