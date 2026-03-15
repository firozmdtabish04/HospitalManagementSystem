import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users!: Observable<User[]>;
  searchText: string = '';

  constructor(private _service: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this._service.getAllUsers();
  }

  filterUser(user: User): boolean {
    if (!this.searchText) return true;

    const search = this.searchText.toLowerCase();

    return (
      user.username?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.mobile?.toLowerCase().includes(search)
    );
  }

  getUserImage(user: User): string {
    return user.gender?.toLowerCase() === 'female'
      ? 'assets/img/femaleuser.png'
      : 'assets/img/maleuser.png';
  }

  getUserThemeClass(gender?: string): string {
    if (!gender) return 'theme-neutral';
    return gender.toLowerCase() === 'female' ? 'theme-female' : 'theme-male';
  }

  trackByUser(index: number, user: User): string {
    return user.email || index.toString();
  }
}