import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

import { SingleUserResponse, User } from '../interfaes/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _http: HttpClient = inject(HttpClient);
  private _baseUrl: string = 'https://reqres.in/api/users';

  getUserById(id: number): Observable<User> {
    return this._http.get<SingleUserResponse>(`${this._baseUrl}/${id}`)
      .pipe(
        map(response => response.data),
        tap(console.log)
      );
  }

}
