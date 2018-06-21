import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './authenfication/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private _baseUrl = 'http://localhost:8086/webservice/user';

  createUser(user: User) {
    return this.http.post(this._baseUrl, user);
  }

  isExistUser(username: string): Observable<User> {
    return this.http.get<User>(this._baseUrl + '?username=' + username);
  }
}
