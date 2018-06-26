import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthentificationService} from '../authentification.service';
import {first} from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  errorLogin = false;


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthentificationService) { }

  ngOnInit() {
    this.createForm();
    localStorage.setItem('users', JSON.stringify({username: 'admin', password: 'admin'}));
    this.returnUrl = this.authenticationService.getUrl();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username : [ '', Validators.required],
      password : ['', Validators.required]
    });
  }

  login() {
    this.errorLogin = false;
    if (this.loginForm.invalid) {
      return;
    }
    localStorage.removeItem('token');
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(first())
      .subscribe(() => this.router.navigate([this.returnUrl]), () => this.errorLogin = true);
  }

}
