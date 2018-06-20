import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './authenfication/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private _baseUrl = 'http://localhost:8080/webservice/user';

  createUser(user: User) {
    return this.http.post(this._baseUrl, user);
  }
}
