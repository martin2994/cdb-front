import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthentificationService} from './authentification.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authentificationService: AuthentificationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.authentificationService.setUrl(state.url)
    this.router.navigate(['/login']);
    return false;
  }
}
