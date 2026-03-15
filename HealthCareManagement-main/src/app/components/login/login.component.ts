import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  msg: string = '';
  loading: boolean = false;
  showPassword: boolean = false;
  rememberMe: boolean = false;

  constructor(
    private _service: LoginService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail)
    {
      this.email = rememberedEmail;
      this.rememberMe = true;
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  smartLogin(): void {
    this.msg = '';

    if (!this.email || !this.password)
    {
      this.msg = 'Please enter email and password.';
      return;
    }

    this.loading = true;

    const user = new User();
    user.email = this.email;
    user.password = this.password;

    this._service.loginUserFromRemote(user).subscribe(
      (data: any) => {
        console.log('User login success', data);

        sessionStorage.clear();

        const userName =
          data?.username ||
          data?.name ||
          data?.fullName ||
          data?.userName ||
          this.getNameFromEmail(this.email);

        sessionStorage.setItem('loggedUser', this.email);
        sessionStorage.setItem('USER', 'user');
        sessionStorage.setItem('ROLE', 'user');
        sessionStorage.setItem('username', userName);
        sessionStorage.setItem('name', userName);
        sessionStorage.setItem('gender', data?.gender || 'male');

        if (this.rememberMe)
        {
          localStorage.setItem('rememberedEmail', this.email);
        }
        else
        {
          localStorage.removeItem('rememberedEmail');
        }

        this.loading = false;
        this._router.navigate(['/userdashboard']);
      },
      () => {
        this.tryDoctorLogin();
      }
    );
  }

  tryDoctorLogin(): void {
    const doctor = new Doctor();
    doctor.email = this.email;
    doctor.password = this.password;

    this._service.loginDoctorFromRemote(doctor).subscribe(
      (data: any) => {
        console.log('Doctor login success', data);

        sessionStorage.clear();

        const doctorName =
          data?.doctorname ||
          data?.name ||
          data?.fullName ||
          data?.doctorName ||
          this.getNameFromEmail(this.email);

        sessionStorage.setItem('loggedUser', this.email);
        sessionStorage.setItem('USER', 'doctor');
        sessionStorage.setItem('ROLE', 'doctor');
        sessionStorage.setItem('doctorname', doctorName);
        sessionStorage.setItem('name', doctorName);
        sessionStorage.setItem('gender', data?.gender || 'male');

        if (this.rememberMe)
        {
          localStorage.setItem('rememberedEmail', this.email);
        }
        else
        {
          localStorage.removeItem('rememberedEmail');
        }

        this.loading = false;
        this._router.navigate(['/doctordashboard']);
      },
      () => {
        this.tryAdminLogin();
      }
    );
  }

  tryAdminLogin(): void {
    const isAdmin = this._service.adminLoginFromRemote(this.email, this.password);

    if (isAdmin)
    {
      console.log('Admin login success');

      sessionStorage.clear();
      sessionStorage.setItem('loggedUser', this.email);
      sessionStorage.setItem('USER', 'admin');
      sessionStorage.setItem('ROLE', 'admin');
      sessionStorage.setItem('name', 'Admin');
      sessionStorage.setItem('username', 'Admin');
      sessionStorage.setItem('gender', 'male');

      if (this.rememberMe)
      {
        localStorage.setItem('rememberedEmail', this.email);
      }
      else
      {
        localStorage.removeItem('rememberedEmail');
      }

      this.loading = false;
      this._router.navigate(['/admindashboard']);
    }
    else
    {
      this.loading = false;
      this.msg = 'Invalid credentials. Please enter correct email and password.';
    }
  }

  private getNameFromEmail(email: string): string {
    if (!email)
    {
      return 'User';
    }

    const namePart = email.split('@')[0];

    return namePart
      .replace(/[._-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}