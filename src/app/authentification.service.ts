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
    return this.http.post<any>('http://localhost:8086/webservice/auth', { username: username, password: password })
      .pipe(map(tokenRequest => {
        if (tokenRequest) {
          this.loginEvent.emit();
          localStorage.setItem('token', JSON.stringify(tokenRequest.token));
        }

        return tokenRequest;
      }));
  }

  logout() {
    localStorage.removeItem('token');
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
