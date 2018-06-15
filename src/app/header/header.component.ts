import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../authentification.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  connected = false;

  constructor(private authentificationService: AuthentificationService, private router: Router) { }

  ngOnInit() {
  this.authentificationService.loginEvent.subscribe(() => this.connected = true);
  }

  logout() {
    this.connected = false;
    this.authentificationService.logout();
    this.router.navigate(['/login']);
  }

}
