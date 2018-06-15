import {Injectable, OnInit} from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {User} from './user.model';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor, OnInit {

  constructor() { }

  ngOnInit() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    const users: User = JSON.parse(localStorage.getItem('users')) || [];
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {
      console.log(users)
      // authenticate
      if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
        // find if any user matches login credentials
        let filteredUsers = false;
        if ( users.username === request.body.username && users.password === request.body.password){
          filteredUsers = true;
        }

        if (filteredUsers) {
          // if login details are valid return 200 OK with user details and fake jwt token
          const user = users;
          const body = {
            username: user.username,
            token: 'fake-jwt-token'
          };

          return of(new HttpResponse({ status: 200, body: body }));
        } else {
          // else return 400 bad request
          return throwError('Username or password is incorrect');
        }
      }

      // pass through any requests not handled above
      return next.handle(request);

    }))
    // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
