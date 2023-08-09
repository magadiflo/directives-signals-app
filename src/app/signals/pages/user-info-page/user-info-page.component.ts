import { Component, OnInit, computed, inject, signal } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { User } from '../../interfaes/user-request.interface';


@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styles: [
  ]
})
export class UserInfoPageComponent implements OnInit {

  private _userService = inject(UsersService);

  public userId = signal(1);
  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal(true);
  public fullName = computed<string>(() => {
    if (!this.currentUser()) return 'Usuario no encontrado';
    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`;
  });

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id: number): void {
    if (id <= 0) return;

    this.userId.set(id);
    this.currentUser.set(undefined);

    this._userService.getUserById(id)
      .subscribe({
        next: user => this._updateInfo(user, true),
        error: err => this._updateInfo(undefined, false)
      });
  }

  private _updateInfo(user: User | undefined, found: boolean) {
    this.currentUser.set(user);
    this.userWasFound.set(found);
  }

}
