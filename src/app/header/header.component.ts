import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../authentification.service';
import { Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  connected = false;

  constructor(private authentificationService: AuthentificationService, private router: Router, private translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.connected = localStorage.getItem('token') !== null;
    this.authentificationService.loginEvent.subscribe(() => this.connected = true);
  }

  changeLanguage(lang: string) {
    console.log(lang);
    this.translate.use(lang);
  }

  logout() {
    this.connected = false;
    this.authentificationService.logout();
    this.router.navigate(['/login']);
  }

}
