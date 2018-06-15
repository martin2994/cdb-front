import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private url: string;
  @Output()
  public loginEvent: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>('/api/authenticate', { username: username, password: password })
      .pipe(map(user => {
        if (user && user.token) {
          this.loginEvent.emit();
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getUrl(): string {
    if (this.url) {
      return this.url;
    } else {
      return '/companies';
    }
  }

  setUrl(url: string) {
    this.url = url;
  }
}
